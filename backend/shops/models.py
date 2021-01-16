from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=8)


class Category(models.Model):
    name = models.CharField(max_length=50)


class Subcategory(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="images/")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Shop(models.Model):
    name = models.CharField(max_length=150)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    background_color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)


class Size(models.Model):
    name = models.CharField(max_length=6)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Product(models.Model):
    class Sex(models.TextChoices):
        MEN = 'M', _('Men')
        WOMEN = 'W', _('Women')

    name = models.CharField(max_length=50)
    description = models.TextField()
    sex = models.CharField(max_length=6, choices=Sex.choices)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)
    price = models.IntegerField()
    expiration_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now=True)


class ProductImage(models.Model):
    image = models.ImageField(upload_to='images/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class ProductSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    quantity = models.BigIntegerField()

    class Meta:
        unique_together = ('product', 'size')
