from django.urls import path

from .api.views import TokenObtainPairViewWithCookies, TokenRefreshAndReceiveUserView

urlpatterns = [
    # Your URLs...
    path('token/', TokenObtainPairViewWithCookies.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshAndReceiveUserView.as_view(), name='token_refresh'),
]
