from rest_framework import serializers

from shops.models import (
    Shop, Product, ProductImage, ProductSize
)


class ShopSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    owner_id = serializers.ReadOnlyField(source='owner.id')
    color_hex = serializers.ReadOnlyField(source='background_color.hex_code')

    class Meta:
        model = Shop
        fields = ['id', 'name', 'background_color', 'color_hex', 'owner', 'owner_id']


class ProductSerializer(serializers.ModelSerializer):
    shop = serializers.ReadOnlyField(source='shop.name')
    shop_id = serializers.ReadOnlyField(source='shop.id')
    color_name = serializers.ReadOnlyField(source='color.name')
    color_hex = serializers.ReadOnlyField(source='color.hex_code')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'shop', 'shop_id', 'sex', 'subcategory', 'color', 'color_name',
                  'color_hex', 'price', 'expiration_date', 'sizes']
