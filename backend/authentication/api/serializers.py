from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer


class TokenObtainPairAndUserSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(TokenObtainPairAndUserSerializer, self).validate(attrs)
        data['email'] = self.user.email
        data['is_salesman'] = self.user.is_salesman

        return data
