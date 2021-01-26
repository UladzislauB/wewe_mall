from rest_framework import permissions


class IsSalesmanPermission(permissions.BasePermission):
    """Custom permission to only allow validated salesman perform action"""
    message = "User isn't a salesman"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_salesman


class IsOwnerPermission(permissions.BasePermission):
    """Custom permission to only allow shop owner modify shop fields"""
    message = "Current user doesn't own the shop"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class IsShopOwnerPermission(permissions.BasePermission):
    """Custom permission to only allow shop owner add products"""
    message = "Current user doesn't own the shop"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user == obj.shop.owner
