from django.urls import path, include
from api.views import FormApiView

urlpatterns = [
    path('form', FormApiView.as_view())
]
