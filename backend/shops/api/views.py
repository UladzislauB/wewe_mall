from rest_framework import permissions, viewsets, parsers, status
from rest_framework.response import Response
from rest_framework.decorators import action
import json

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
    SubcategorySerializer
)

from .schemas import ProductSizeSchema


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsSalesmanPermission, IsOwnerPermission]

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        shop = self.get_object()
        products = shop.product_set.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if Shop.objects.filter(owner=self.request.user).first():
            raise UserAlreadyCreatedShopException()
        name = serializer.validated_data['name']
        if Shop.objects.filter(name=name).first():
            raise ShopNameAlreadyTakenException()
        serializer.save(owner=self.request.user)

    def perform_destroy(self, instance):
        self.request.user.shop = None
        super(ShopViewSet, self).perform_destroy(instance)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsSalesmanPermission, IsShopOwnerPermission]
    parser_classes = [parsers.MultiPartParser]

    def create(self, request, *args, **kwargs):
        if 'images' not in request.FILES:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        data = {key: val for key, val in request.data.items()}
        # Prepared data for sending to serializer and passing validation
        data['images'] = [{'image': elem} for elem in request.FILES.getlist('images')]
        data['productsize_set'] = json.loads(data['productsize_set'])

        # Standard flow of create method
        serializer_class = ProductSerializer(data=data)
        serializer_class.is_valid(raise_exception=True)
        self.perform_create(serializer_class)

        # Preparing data to be displayed in response
        images = [product_image.image.url for product_image in serializer_class.instance.images.all()]
        productsize_schema = ProductSizeSchema()
        productsize_set = [productsize_schema.dumps(product_size) for product_size in
                           serializer_class.instance.productsize_set.all()]
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
            'images': images,
            'productsize_set': productsize_set,
        }

        return Response(data, status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        shop = self.request.user.shop
        name = serializer.validated_data['name']
        sex = serializer.validated_data['sex']
        subcategory = serializer.validated_data['subcategory']
        color = serializer.validated_data['color']
        if Product.objects.filter(shop=shop, name=name, sex=sex,
                                  subcategory=subcategory, color=color).first():
            raise ProductAlreadyCreatedException()
        serializer.save(shop=shop)
