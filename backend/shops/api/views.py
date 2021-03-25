import json
from json import JSONDecodeError

from rest_framework import permissions, viewsets, parsers, status
from rest_framework.decorators import action
from rest_framework.response import Response

from shops.exceptions import (
    UserAlreadyCreatedShopException, ShopNameAlreadyTakenException,
    ProductAlreadyCreatedException
)
from shops.models import Shop, Product
from .permissions import (
    IsSalesmanPermission, IsOwnerPermission, IsShopOwnerPermission
)
from .serializers import (
    ShopSerializer, ProductSerializer, ColorSerializer,
    SubcategorySerializer, ProductSizeSerializer, ProductImageSerializer
)


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsSalesmanPermission, IsOwnerPermission]

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        products = Product.objects.prefetch_related('images', 'productsize_set').filter(shop_id=pk)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if Shop.objects.filter(owner=self.request.user).exists():
            raise UserAlreadyCreatedShopException()
        name = serializer.validated_data['name']
        if Shop.objects.filter(name=name).exists():
            raise ShopNameAlreadyTakenException()
        serializer.save(owner=self.request.user)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.prefetch_related('images', 'productsize_set')
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsSalesmanPermission, IsShopOwnerPermission]
    parser_classes = [parsers.MultiPartParser]

    def create(self, request, *args, **kwargs):
        data = {key: val for key, val in request.data.items()}

        # Preparing data for sending to serializer and passing validation
        try:
            data['images'] = [{'image': elem} for elem in request.FILES.getlist('images')]
        except KeyError:
            data['images'] = []

        try:
            data['productsize_set'] = json.loads(data['productsize_set'])
        except (JSONDecodeError, KeyError):
            data['productsize_set'] = []

        # Standard flow of create method
        serializer_class = ProductSerializer(data=data)
        serializer_class.is_valid(raise_exception=True)
        self.perform_create(serializer_class)

        # Preparing data to be displayed in response
        images_serializer = ProductImageSerializer(serializer_class.instance.images.all(), many=True)
        productsize_serializer = ProductSizeSerializer(
            serializer_class.instance.productsize_set.all(), many=True
        )
        subcategory_serializer = SubcategorySerializer(
            instance=serializer_class.validated_data['subcategory']
        )
        color_serializer = ColorSerializer(
            instance=serializer_class.validated_data['color']
        )

        # Final data for response
        data = {
            **serializer_class.validated_data,
            'subcategory': subcategory_serializer.data,
            'color': color_serializer.data,
            'images': images_serializer.data,
            'productsize_set': productsize_serializer.data,
        }

        return Response(data, status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        shop = self.request.user.shop
        name = serializer.validated_data['name']
        sex = serializer.validated_data['sex']
        subcategory = serializer.validated_data['subcategory']
        color = serializer.validated_data['color']
        if Product.objects.filter(shop=shop, name=name, sex=sex,
                                  subcategory=subcategory, color=color).exists():
            raise ProductAlreadyCreatedException()
        serializer.save(shop=shop)
