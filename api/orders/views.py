from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.mixins import (ListModelMixin,
                                   UpdateModelMixin,
                                   CreateModelMixin,
                                   DestroyModelMixin)
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.decorators import action
from utils.find_order_query import get_order_list_queryset
# from rest_framework.response import Response
# from rest_framework import status

from .models import Order, Item
from .serializers import (OrderRetrieveSerializer,
                          OrderUpdateSerializer,
                          OrderListSerializer,
                          OrderListStaffSerializer,
                          OrderCurrentSerializer,
                          ItemSerializer,
                          ItemCreateSerializer,
                          ItemUpdateSerializer)
from .permissions import (IsCreatorOrAdmin,
                          IsOrderStaffActionsAllowed,
                          IsItemStaffActionsAllowed)


class OrderViewSet(UpdateModelMixin,
                   ListModelMixin,
                   DestroyModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated,
                          IsCreatorOrAdmin,
                          IsOrderStaffActionsAllowed]
    pagination_class = LimitOffsetPagination

    def get_list_serializer_class(self):
        if self.request.user.is_staff:
            return OrderListStaffSerializer
        else:
            return OrderListSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return self.get_list_serializer_class()
        elif self.action == 'retrieve':
            return OrderRetrieveSerializer
        else:
            return OrderUpdateSerializer

    def get_queryset(self):
        if self.action == 'list':
            return get_order_list_queryset(self.request)
        else:
            if self.request.user.is_staff:
                return Order.objects.all()
            else:
                return Order.objects.filter(owner=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance,
                                         context={'request': request})
        return Response(serializer.data)

    @action(methods=['get'], detail=False, url_path='current')
    def get_current_order(self, request):
        current_order = Order.objects.get_or_create(owner=request.user,
                                                    status='current')[0]
        serializer = OrderCurrentSerializer(current_order,
                                            many=False,
                                            context={'request': request})
        return Response(serializer.data)


class ItemViewSet(UpdateModelMixin,
                  CreateModelMixin,
                  DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = Item.objects.all()
    permission_classes = [IsAuthenticated,
                          IsCreatorOrAdmin,
                          IsItemStaffActionsAllowed]

    def get_serializer_class(self):
        if self.action == 'create':
            return ItemCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return ItemUpdateSerializer
        else:
            return ItemSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(ItemSerializer(instance,
                                       context={'request': request}).data,
                        status=status.HTTP_201_CREATED, headers=headers)

    # def create(self, request, *args, **kwargs):
    #     order = Order.objects.get_or_create(owner=request.user,
    #                                         status='current')
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     item = Item.objects.create(**serializer.validated_data,
    #                                order=order[0])
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(ItemCreateSerializer(item).data,
    #                     status=status.HTTP_201_CREATED, headers=headers)

    # def get_serializer(self):
    #     if self.request.method == 'POST':
    #         return ItemPOSTSerializer
    #     else:
    #         return ItemSerializer
