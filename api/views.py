from api.models import FormModel
from api.serializers import FormModelSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings


class FormApiView(APIView):

    def get(self, request):
        forms = FormModel.objects.all()
        serializer = FormModelSerializer(forms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FormModelSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            message = '''
            Thanks for your submit.
            Your entry details are here.
                Url: {}
                Email: {}
                IP address: {}
                Name: {}
            '''.format(serializer.data.get('url'), serializer.data.get('email'),
                       serializer.data.get('ip'), serializer.data.get('name'))
            send_mail(subject='New submit', message=message,
                      from_email=settings.EMAIL_FROM, recipient_list=[serializer.data.get('email')])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

