from rest_framework import serializers

from shops.models import (
    Shop, Product, ProductImage, ProductSize,
    Subcategory, Color
)


class ShopSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')
    owner_id = serializers.ReadOnlyField(source='owner.id')
    color_hex = serializers.ReadOnlyField(source='background_color.hex_code')

    class Meta:
        model = Shop
        fields = ['id', 'name', 'background_color', 'color_hex', 'owner', 'owner_id']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']


class ProductSizeSerializer(serializers.ModelSerializer):
    size_name = serializers.ReadOnlyField(source='size.name')

    class Meta:
        model = ProductSize
        fields = ['quantity', 'size', 'size_name']


class ProductSerializer(serializers.ModelSerializer):
    shop = serializers.ReadOnlyField(source='shop.name')
    shop_id = serializers.ReadOnlyField(source='shop.id')
    images = ProductImageSerializer(many=True)
    productsize_set = ProductSizeSerializer(many=True)
    color_name = serializers.ReadOnlyField(source='color.name')
    color_hex = serializers.ReadOnlyField(source='color.hex_code')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'shop', 'shop_id', 'sex', 'subcategory', 'color', 'color_name',
                  'color_hex', 'price', 'expiration_date', 'productsize_set', 'images']
        extra_kwargs = {'color': {'required': True}, 'subcategory': {'required': True}}

    def create(self, validated_data):
        images = validated_data.pop('images')
        productsize_set = validated_data.pop('productsize_set')
        product = Product.objects.create(**validated_data)
        for image in images:
            ProductImage.objects.create(product=product, **image)
        for productsize in productsize_set:
            ProductSize.objects.create(product=product, **productsize)

        return product


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['id', 'name']


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name', 'hex_code']
