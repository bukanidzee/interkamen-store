from rest_framework import serializers
# from django.contrib.sites.models import Site
# from django.db.models import Sum

from .models import Order, Item
from store_pages.models import Product
from users.models import CustomUser
from utils.prizes import get_order_total_prize


class ItemsProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'image', 'prize']

    def get_image(self, obj):
        request = self.context.get('request')
        image = obj.image
        if image:
            return request.build_absolute_uri(image.url)
        else:
            return ''


class ItemSerializer(serializers.ModelSerializer):
    # product = ItemsProductSerializer()
    product = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ['id', 'product', 'quantity', 'prize']

    def get_product(self, obj):
        product = Product.objects.get(id=obj.product.id)
        return ItemsProductSerializer(product, context=self.context).data


class ItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['product', 'quantity']

    def create(self, validated_data):
        owner = self.context['request'].user
        order = Order.objects.get_or_create(owner=owner,
                                            status='current')
        validated_data['order'] = order[0]
        return super().create(validated_data)


class ItemUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['quantity']


class OrderListSerializer(serializers.ModelSerializer):
    total_prize = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'created', 'finished', 'total_prize']

    def get_total_prize(self, obj):
        # return obj.items.aggregate(Sum('prize'))['prize__sum']
        return get_order_total_prize(obj)


class OrderOwnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'third_name']


class OrderListStaffSerializer(serializers.ModelSerializer):
    total_prize = serializers.SerializerMethodField()
    owner = OrderOwnerSerializer()

    class Meta:
        model = Order
        fields = ['id', 'created', 'finished', 'total_prize', 'owner']

    def get_total_prize(self, obj):
        return get_order_total_prize(obj)


class OrderDetailMixin(metaclass=serializers.SerializerMetaclass):
    total_prize = serializers.SerializerMethodField()
    # items = ItemSerializer(many=True, read_only=True)
    items = serializers.SerializerMethodField()

    def get_total_prize(self, obj):
        return get_order_total_prize(obj)

    def get_items(self, obj):
        items = Item.objects.filter(order=obj.id)
        return ItemSerializer(items,
                              many=True,
                              read_only=True,
                              context=self.context).data


class OrderCurrentSerializer(OrderDetailMixin,
                             serializers.ModelSerializer,):

    class Meta:
        model = Order
        fields = ['id', 'items', 'total_prize']


class OrderRetrieveSerializer(OrderDetailMixin,
                              serializers.ModelSerializer,):

    class Meta:
        model = Order
        fields = ['created', 'finished', 'status', 'items', 'total_prize']


class OrderUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['status']
