"""store URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_auth.urls import urlpatterns as rest_auth_urls
from rest_auth.views import PasswordResetConfirmView

# rest_auth_urls[0] = path(
#     r'^password/reset/$',
#     PasswordResetView.as_view(
#         email_template_name='users/templates/password_reset_email.html'),
#     name='rest_password_reset')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/rest-auth/', include(rest_auth_urls)),
    path('api/rest-auth/password/reset/confirm/<str:uidb64>/<str:token>',
         PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('api/rest-auth/registration/',
         include('rest_auth.registration.urls')),
    path('api/', include('store_pages.urls')),
    path('api/', include('users.urls')),
    path('api/', include('orders.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# def trigger_error(request):
#     division_by_zero = 1 / 0
#
#
# urlpatterns = urlpatterns + [
#     path('sentry-debug/', trigger_error),
# ]
