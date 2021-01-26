from django.db import models

from authentication.models import User


class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=8)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="images/")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Subcategories'

    def __str__(self):
        return self.name


class Shop(models.Model):
    name = models.CharField(max_length=150)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    background_color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Size(models.Model):
    name = models.CharField(max_length=6)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Product(models.Model):
    class Sex(models.TextChoices):
        MEN = 'M', 'Men'
        WOMEN = 'W', 'Women'

    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    sex = models.CharField(max_length=6, choices=Sex.choices)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)
    sizes = models.ManyToManyField(Size, through='ProductSize')
    price = models.IntegerField()
    expiration_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    image = models.ImageField(upload_to='images/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f'Image for {self.product.name}'


class ProductSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    quantity = models.BigIntegerField()

    class Meta:
        unique_together = ('product', 'size')

    def __str__(self):
        return f'Size {self.size.name} for {self.product.name}'
