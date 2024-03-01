import json

from django.shortcuts import render
from django.views.generic import TemplateView
from django.db.models import Q
from django.contrib.auth import authenticate,login
from django.core.cache import cache
from django.conf import settings
from django.core.mail import send_mail

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from . import serializers,models,forms
from .tokens import varification_uuid


class HomePage(APIView):
    def get(self,request):
        if self.request.user.is_authenticated:
            user = self.request.user.username
        else:
            user = 'AnonymousUser'
        product = models.Product.objects.all().order_by('-create_at')[:12]
        serializer = serializers.ProductSerializer(product,many=True)
        return Response({'products':serializer.data,'user':user})


class ProductDetail(APIView):
    def get(self,request,id):
        if self.request.user.is_authenticated:
            user = self.request.user.username
        else:
            user = 'AnonymousUser'
        product = models.Product.objects.get(id=id)
        serializer = serializers.ProductSerializer(product)
        return Response({'product':serializer.data,'user':user})
    

class SearchProduct(APIView):
    def get(self,request):
        q = self.request.GET.get('q')
        if q == '':
            return Response([])
        product = models.Product.objects.filter(Q(name__icontains=q))
        serializer = serializers.ProductSerializer(product,many=True)
        return Response(serializer.data)


class Category(APIView):
    def get(self,request,category):
        if self.request.user.is_authenticated:
            user = self.request.user.username
        else:
            user = 'AnonymousUser'

        q = category
        product = models.Product.objects.filter(category=q)
        serializer = serializers.ProductSerializer(product,many=True)
        return Response({'products':serializer.data,'user':user})


class RelatedCategory(APIView):
    def get(self,request,id):
        product = models.Product.objects.get(id=id)
        category = models.Product.objects.filter(category=product.category).order_by('-create_at')[:8]
        serializer = serializers.ProductSerializer(category,many=True)

        return Response(serializer.data)


class Accounts(APIView):
    def get(self,request):
        user = self.request.user
        if user.is_authenticated:
            if user.verified:
                address = models.UserAddress.objects.filter(user=user).exists()
                if address : 
                    cart = models.Payment.objects.filter(user=user).order_by('-buyed_time')
                    useraddress = models.UserAddress.objects.get(user=user)

                    serializer = serializers.UserSerializer(user)
                    serializer2 = serializers.UserAddressSerializer(useraddress)
                    serializer3 = serializers.PaymentsSerializer(cart,many=True)

                    return Response({'user':serializer.data,'address':serializer2.data,'cart':serializer3.data})

                else:
                    return Response({ 'redirect':'/add/useraddress/' })
            
            else:
                return Response({ 'redirect':'/accounts/register/' })

        else:
            return Response({ 'redirect':'/accounts/register/' })


class Register(APIView):
    def post(self,request):
        data = request.data
        form = forms.RegiterForm(data)
        if form.is_valid():
            form.save()

            username=form.cleaned_data['username']
            telephone=form.cleaned_data['telephone']
            email = form.cleaned_data['email']
            password=form.cleaned_data['password1']

            user = authenticate(username=username,email=email,telephone=telephone,password=password)
            if user is not None:
                code = varification_uuid()

                subject = 'welcome to Ecommerce world'
                message = f'''Hi {username}, thank you for registering in My App.
                    your varfication is {code}'''
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [email, ]
                send_mail( subject, message, email_from, recipient_list )

                cache.set(str(username),code,120)

                login(self.request,user)
                return Response({ 'success':'user successfully added !' })
            else:
                return Response({ 'error':'somthing went wrong !' })

        return Response({'error' : form.errors})


class Varification(APIView):
    def post(self,request):
        try:
            user =self.request.user
            recive_code = self.request.data['code']
            code = cache.get(str(user.username))
            
            if code == recive_code:
                models.UserAccount.objects.filter(username=user.username).update(verified=True)
                return Response({"success":"Successfully verified"})
            
            return Response({"error":"Varification Code is Not Currect !"})

        except:
            return Response({"error":"Somthing Went Wrong !"},status=status.HTTP_403_FORBIDDEN)


class Login(APIView):
    def post(self,request):
        try:
            data = request.data
            username = data['username']
            password = data['password']

            user = models.UserAccount.objects.filter(username=username)
            email = user.first().email
            user.update(verified=False)

            user = authenticate(username=username,password=password)
            if user is not None:
                code = varification_uuid()

                subject = 'welcome to Ecommerce world'
                message = f'''Hi {username}, thank you for registering in My App.
                    your varfication is {code}'''
                email_from = settings.EMAIL_HOST_USER
                recipient_list = [email, ]
                send_mail( subject, message, email_from, recipient_list )

                cache.set(str(username),code,120)

                login(request,user)
                return Response({ 'success':'Login Successfully !' })
            else:
                return Response({ 'error': {'error':'Username or Password is incorect'} })
        except:
            return Response({ 'error': {'error':'Username or Password is incorect'} })


class AddUserAddress(APIView):
    def get(self,request):
        user = self.request.user
        if not user.is_authenticated:
            return Response({ 'redirect':'/accounts/register/' })
        if not user.verified:
            return Response({'redirect':'/accounts/register/'})
        try:
            models.UserAddress.objects.get(user=user)
            return Response({ 'redirect':'/accounts/' })
        except:
            return Response("OK")

    def post(self,request):
        user =self.request.user

        try:
            data = self.request.data
            city = data['city']
            post_address = data['post_address']
            address = data['address']
            useraddress = models.UserAddress.objects.create(user = user,
                                                            city = city,
                                                            post_address = post_address,
                                                            address = address)
            useraddress.save()
            return Response({ 'success':'user address successfuly saved' })
        
        except:
            return Response({ 'error': 'make sure enter all the values correctly' })


class EditUserAddress(APIView):
    def get(self,request):
        try:
            user = self.request.user
            if user.verified:
                useraddress = models.UserAddress.objects.get(user=user)

                first_name = user.first_name
                email = user.email
                telephone = user.telephone
                city = useraddress.city
                post_address = useraddress.post_address
                address = useraddress.address

                return Response({'first_name':first_name,'email':email,
                                 'telephone':telephone,'city':city,'post_address':post_address,'address':address})
            else:
                return Response({ 'error':'somthing wrong !' })
        
        except:
            return Response({ 'error':'somthing wrong !' })

    def put(self,request):
        try:
            data = request.data
            user = self.request.user
            models.UserAccount.objects.filter(username=user).update(
                first_name=data['first_name'],email=data['email'],telephone=data['telephone'])
            models.UserAddress.objects.filter(user=user).update(city=data['city'],post_address=data['post_address'],address=data['address'])

            return Response({ 'success':'Changed Successfully' })
        
        except:
            return Response({ 'error':'Make Sure Enter A correct Value !' })


class Cart(APIView):            
    def get(self,request):
        user = self.request.user
        
        try:
            data = json.loads(request.COOKIES['cart'])
        except:
            data = {}

        if user.is_authenticated:
            if not user.verified:
                return Response({"user":'notVerified'})
        
            order,c = models.Order.objects.get_or_create(user=user,complete=False)
            
            try:
                for i in data:
                    product = models.Product.objects.get(id=i)
                    models.OrderItem.objects.get_or_create(product=product,order=order,quantity=data[i]['q'])
                    
            except:
                pass

            serializer = serializers.OrderSerializer(order)
        
            response = Response({'orders':serializer.data,'user':'Authenticate'})
            response.delete_cookie('cart')
            return response


        else:
            orderitem_set = []
            for i in data:
                product = models.Product.objects.get(id=i)
                item = {
                            'quantity':data[i]['q'],
                            'product':{
                                'id':product.id,
                                'name':product.name,
                                'price':product.price,
                                'imageURL':product.imageURL
                            }
                        }
                orderitem_set.append(item)
                    
            return Response({'orders':{'orderitem_set':orderitem_set},'user':'AnonymousUser'})

    def post(self,request):
        try:
            data = self.request.data
            order,c = models.Order.objects.get_or_create(user=self.request.user,complete=False)
            product = models.Product.objects.get(id=data['id'])
            orderitem,created = models.OrderItem.objects.get_or_create(product=product,order=order)
            if not created:
                q = orderitem.quantity + 1
                models.OrderItem.objects.filter(product=product,order=order).update(quantity = q)

            return Response({ 'success':'Add to Cart Successfully !' })
        except:
            return Response({ 'error':'somthing went Wrong !' })

    def put(self,request):
        try:
            data = self.request.data
            if data['method']=='change':
                models.OrderItem.objects.filter(id=data['orderId']).update(quantity = data['quantity'])
                return Response({ 'success':'successfully changed !' })
            elif data['method']=='remove':
                models.OrderItem.objects.filter(id=data['orderId']).delete()
                return Response({ 'success':'successfully Deleted !' })

        except:
            return Response({ 'error':'somthing went wrong !' })

    def patch(self,request):
        user = self.request.user
        if not user.verified:
            return Response({ 'error':'somthing went Wrong !' },status=status.HTTP_403_FORBIDDEN)

        try:
            data = self.request.data
            order = models.Order.objects.get(user=user,complete=False)
            models.Payment.objects.create(user=user,cart=order,payed=True)
            models.Order.objects.filter(user=user,complete=False).update(complete=True)
            return Response({ 'success':'Successfully Payed !' })

        except:
            return Response({ 'error':'somthing went Wrong !' },status=status.HTTP_403_FORBIDDEN)


class Comment(APIView):
    def get(self,request,id):
        product = models.Product.objects.get(id=id)
        comment = models.Comment.objects.filter(product=product , verified=True).order_by('-create_time')[:4]
        serializer = serializers.CommentSerializer(comment,many=True)

        return Response(serializer.data)

    def post(self,request,id):
        form = forms.CommentForm(request.data)
        if form.is_valid():
            form.save()
            return Response({'success':'نظر شما پس از تایید ادمین نمایش داده میشود'},status=status.HTTP_200_OK)
        else:
            return Response({'error':form.errors})



class HomePageView(TemplateView):
    template_name = 'index.html'

class ProductDetailView(TemplateView):
    template_name = 'index.html'

class CategoryView(TemplateView):
    template_name = 'index.html'

class AccountsView(TemplateView):
    template_name = 'index.html'

class RegisterView(TemplateView):
    template_name = 'index.html'

class AddUserAddressView(TemplateView):
    template_name = 'index.html'

class EditUserAddressView(TemplateView):
    template_name = 'index.html'

class CartView(TemplateView):
    template_name = 'index.html'
