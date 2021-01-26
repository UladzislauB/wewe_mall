from rest_framework.exceptions import APIException


class WeWeMallException(APIException):
    """Base class for all WeWe Mall project exceptions"""
    status_code = 0
    default_detail = 'Unknown exception'
    default_code = 'wewe_mall_base_exception'
