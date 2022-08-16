from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.mixins import (ListModelMixin,
                                   UpdateModelMixin,
                                   RetrieveModelMixin)

from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserListSerializer
from .permissions import IsYourselfOrAdmin
from utils.search.user_search import search_users


class CustomUserViewSet(UpdateModelMixin,
                        ListModelMixin,
                        RetrieveModelMixin,
                        viewsets.GenericViewSet):
    # serializer_class = CustomUserSerializer
    # queryset = CustomUser.objects.all()
    # permission_classes = [IsAuthenticated, IsYourselfOrAdmin, ]

    def get_serializer_class(self):
        if self.action == 'list':
            return CustomUserListSerializer
        else:
            return CustomUserSerializer

    def get_queryset(self):
        if self.action == 'list':
            query = self.request.GET.get('query', '')
            if query:
                return search_users(query)
            else:
                return CustomUser.objects.all()
        else:
            return CustomUser.objects.all()

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAdminUser, ]
        else:
            permission_classes = [IsAuthenticated, IsYourselfOrAdmin, ]
        return [permission() for permission in permission_classes]
