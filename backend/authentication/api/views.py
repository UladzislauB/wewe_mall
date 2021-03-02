from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.settings import api_settings

from authentication.api.serializers import TokenObtainPairAndUserSerializer


class TokenViewBaseWithCookies(TokenViewBase):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        data = serializer.validated_data.copy()
        data.pop('access')
        if 'refresh' in data:
            data.pop('refresh')

        response = Response(data, status=status.HTTP_200_OK)
        access_expiration = datetime.utcnow() + api_settings.user_settings['ACCESS_TOKEN_LIFETIME']
        response.set_cookie('accessToken', serializer.validated_data['access'], expires=access_expiration,
                            httponly=False)
        if 'refresh' in serializer.validated_data:
            refresh_expiration = datetime.utcnow() + api_settings.user_settings['REFRESH_TOKEN_LIFETIME']
            response.set_cookie('refreshToken', serializer.validated_data['refresh'], expires=refresh_expiration,
                                httponly=True)
        return response


class TokenObtainPairViewWithCookies(TokenViewBaseWithCookies):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair set in cookies to prove the authentication of those credentials.
    """
    serializer_class = TokenObtainPairAndUserSerializer


class TokenRefreshAndReceiveUserView(TokenViewBaseWithCookies):
    """
    Takes refresh token and return user data. Also sets new
    refresh token to the cookies.
    """
    serializer_class = TokenRefreshSerializer
