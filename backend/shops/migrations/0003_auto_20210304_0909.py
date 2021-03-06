# Generated by Django 3.1.7 on 2021-03-04 09:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shops', '0002_auto_20210116_1016'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='sizes',
            field=models.ManyToManyField(through='shops.ProductSize', to='shops.Size'),
        ),
        migrations.AlterField(
            model_name='productimage',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='shops.product'),
        ),
    ]
