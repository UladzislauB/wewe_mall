from rest_framework import permissions, viewsets

from shops.exceptions import (
    UserAlreadyCreatedShopException, ShopNameAlreadyTakenException,
    ProductAlreadyCreatedException
)
from shops.models import Shop, Product
from .permissions import (
    IsSalesmanPermission, IsOwnerPermission, IsShopOwnerPermission
)
from .serializers import ShopSerializer, ProductSerializer


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsSalesmanPermission, IsOwnerPermission]

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
