# Generated by Django 3.1.5 on 2021-01-26 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_salesman',
            field=models.BooleanField(default=False, help_text='Designates whether this user can sell products.', verbose_name='salesman'),
        ),
    ]