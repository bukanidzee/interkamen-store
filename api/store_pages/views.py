from rest_framework import viewsets
from rest_framework.mixins import (ListModelMixin,
                                   UpdateModelMixin,
                                   CreateModelMixin,
                                   RetrieveModelMixin)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
# from typing import Any

from .models import Product
from .serializers import (ProductSerializer,
                          ProductListSerializer,
                          ProductPatchSerializer)
from .permissions import IsGETOrAdmin
from rest_framework.pagination import LimitOffsetPagination
# from utils.pagination import PageLimitPagination
from rest_framework.permissions import IsAuthenticated

from utils.search.product_search_and_sort import (
    sorted_and_searched_products,
    filter_choosed_products_with_status)


# class ProductImageShow(generics.GenericAPIView):
#     queryset = Product.objects.all()
#     renderer_classes = (renderers.StaticHTMLRenderer,)
#
#     def get(self, request, *args, **kwargs):
#         product = self.get_object()
#         adress = product.image.split('/')[-2:]
#         adress = adress[0] + '/' + adress[1]
#        response = Response('<img src={{media {0}}} height="500">'
#                                                             .format(adress))
#         return response


@api_view(['GET'])  # mypy: disallow-untyped-decorators=False
def api_root(request, format=None):
    return Response({
        'продукты': reverse('product-list', request=request, format=format),
        'пользователи': reverse('customuser-list',
                                request=request,
                                format=format),
        'заказы': reverse('order-list', request=request, format=format),
        'части заказов': reverse('item-list', request=request, format=format),
    })


class ProductViewSet(ListModelMixin,
                     UpdateModelMixin,
                     CreateModelMixin,
                     RetrieveModelMixin,
                     viewsets.GenericViewSet):
    # serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsGETOrAdmin, ]
    pagination_class = LimitOffsetPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        elif self.action == 'partial_update':
            return ProductPatchSerializer
        else:
            return ProductSerializer

    def get_queryset(self):
        if self.action == 'list':
            query = self.request.GET.get('query', '')
            sort = self.request.GET.get('sort', '')
            user = self.request.user
            status = self.request.GET.get('status', 'active')
            if query or sort:
                return sorted_and_searched_products(query, sort, user, status)
            else:
                return filter_choosed_products_with_status(user, status)
        else:
            return Product.objects.all()
