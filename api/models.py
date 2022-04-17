from django.db import models


class FormModel(models.Model):
    url = models.URLField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    ip = models.GenericIPAddressField()
    name = models.CharField(max_length=100, null=True)

    def __str__(self):
        if self.name is not None:
            return self.name
        return self.email

    class Meta:
        db_table = 'form'
