from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from authentication.models import User


class TokenObtainPairAndUserSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(TokenObtainPairAndUserSerializer, self).validate(attrs)
        data['email'] = self.user.email
        data['is_salesman'] = self.user.is_salesman

        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'is_salesman', 'password']

        extra_fields = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
        }

    def create(self, validated_data):
        """Create password out of raw data got from api request"""
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'This email already registered'})
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

