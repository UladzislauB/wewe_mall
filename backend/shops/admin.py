from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Color, Size, Category, Subcategory,
    Product, ProductImage, Shop, ProductSize
)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'sex', 'subcategory', 'is_present')
    list_filter = ('sex', 'subcategory__category__name',)
    search_fields = ('name__startswith',)

    def is_present(self, obj):
        for elem in obj.productsize_set.all():
            if elem.quantity > 0:
                return True
        return False

    is_present.boolean = True


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_filter = ('category__name',)


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner')


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    search_fields = ('name__startswith',)
    list_display = ('name', 'hex_code', 'color_representation')

    def color_representation(self, obj):
        return format_html(
            '<div style="width: 150px; height: 15px; background-color: {}; border-radius: 7px;"/>',
            obj.hex_code
        )


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product',)
    search_fields = ('product__name__startswith',)


@admin.register(ProductSize)
class ProductSizeAdmin(admin.ModelAdmin):
    pass