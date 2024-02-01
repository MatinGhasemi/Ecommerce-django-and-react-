from rest_framework import serializers

from . import models



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id','name','price','overview','imageURL','product_exists','create_at']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserAccount
        fields = ['id','username','first_name','last_name','email','telephone']


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserAddress
        fields = ['city','post_address','address']


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = models.OrderItem
        fields = ['id','order','quantity','date_added','product','get_total']


class OrderSerializer(serializers.ModelSerializer):
    orderitem_set = OrderItemSerializer(many=True)

    class Meta:
        model = models.Order
        fields = ['id','user','date_ordered','complete','orderitem_set']


class ProductPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id','name','price','imageURL']


class OrderItemPayments(serializers.ModelSerializer):
    product = ProductPaymentSerializer()

    class Meta:
        model = models.OrderItem
        fields = ['quantity','get_total','product']


class OrderPaymentSerializer(serializers.ModelSerializer):
    orderitem_set = OrderItemPayments(many=True)

    class Meta:
        model = models.Order
        fields = ['id','orderitem_set']


class PaymentsSerializer(serializers.ModelSerializer):
    cart = OrderPaymentSerializer()

    class Meta:
        model = models.Payment
        fields = ['id','user','cart','payed','buyed_time']