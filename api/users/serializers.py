from rest_framework import serializers
from .models import CustomUser
from django.conf import settings
from rest_auth.serializers import PasswordResetSerializer
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.models import TokenModel
# from allauth.account.adapter import get_adapter
# from allauth.account.utils import setup_user_email


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def get_email_options(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'email_template_name': 'account/email/reset_password.txt',
            'request': request,
        }
        return opts


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['username',
                  'first_name',
                  'last_name',
                  'third_name',
                  'email']


class CustomUserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id',
                  'username',
                  'first_name',
                  'last_name',
                  'third_name']


class TokenSerializer(serializers.ModelSerializer):
    is_staff = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    third_name = serializers.SerializerMethodField()

    class Meta:
        model = TokenModel
        fields = ['key',
                  'is_staff',
                  'user_id',
                  'first_name',
                  'last_name',
                  'third_name']

    def get_is_staff(self, obj):
        return obj.user.is_staff

    def get_user_id(self, obj):
        return obj.user.id

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_third_name(self, obj):
        return obj.user.third_name


class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    third_name = serializers.CharField(write_only=True,
                                       required=False,
                                       allow_blank=True)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'third_name': self.validated_data.get('third_name', '')
        }

    # def save(self, request):
    #     adapter = get_adapter()
    #     user = adapter.new_user(request)
    #     self.cleaned_data = self.get_cleaned_data()
    #     adapter.save_user(request, user, self)
    #     self.custom_signup(request, user)
    #     setup_user_email(request, user, [])
    #     return user

# class Meta:
#     model = CustomUser
#     fields = ['username',
#               'first_name',
#               'last_name',
#               'third_name',
#               'password1',
#               'password2',
#               'email']

# class CustomUserCreateByUserSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'password', 'email']
#
#
# class CustomUserCreateByStaffSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'password', 'email', 'is_staff']
