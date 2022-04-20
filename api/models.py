from django.db import models


class FormModel(models.Model):
    address = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    period = models.CharField(max_length=20, default='now')
    name = models.CharField(max_length=100, null=True)

    def __str__(self):
        if self.name is not None:
            return self.name
        return self.email

    class Meta:
        db_table = 'form'
