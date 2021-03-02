from io import BytesIO


class SetJWTokenAuthorizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'accessToken' in request.COOKIES:
            access_token = request.COOKIES['accessToken']
            request.META['HTTP_AUTHORIZATION'] = "Bearer " + access_token
        if request.path == "/api-auth/token/refresh/" and 'refreshToken' in request.COOKIES:
            body = "refresh=" + request.COOKIES['refreshToken']
            content_type = "application/x-www-form-urlencoded"
            request._body = body.encode()
            request.META['CONTENT_LENGTH'] = str(len(body))
            request.META['CONTENT_TYPE'] = content_type
            request._stream = BytesIO(request._body)
        response = self.get_response(request)
        return response
