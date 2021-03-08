from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.models import User


class TokenObtainPairAndUserSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(TokenObtainPairAndUserSerializer, self).validate(attrs)
        data['email'] = self.user.email
        data['is_salesman'] = self.user.is_salesman

        return data


class UserSerialializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'is_salesman']
