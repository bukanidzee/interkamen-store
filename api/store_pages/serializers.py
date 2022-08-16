from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['title', 'prize', 'description', 'image', 'status']


class ProductPatchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['title', 'prize', 'description', 'image', 'status']


class ProductListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['id', 'title', 'prize', 'image']
