from wewe_mall.exceptions import WeWeMallException


class WeWeMallShopsException(WeWeMallException):
    pass


class UserAlreadyCreatedShopException(WeWeMallShopsException):
    status_code = 321
    default_detail = "User has already created shop"


class ShopNameAlreadyTakenException(WeWeMallShopsException):
    status_code = 322
    default_detail = "Shop with that name has been already created"


class ProductAlreadyCreatedException(WeWeMallShopsException):
    status_code = 331
    default_detail = "You've already created product with that parameters"
