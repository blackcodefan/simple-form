# Generated by Django 3.2.13 on 2022-04-17 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FormModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(max_length=100)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('ip', models.GenericIPAddressField()),
                ('name', models.CharField(max_length=100, null=True)),
            ],
            options={
                'db_table': 'form',
            },
        ),
    ]
