from django.urls import path

from . import views


urlpatterns = [
    path('api/ecommerce/products/',views.HomePage.as_view()),
    path('api/ecommerce/product/<int:id>/',views.ProductDetail.as_view()),
    path('api/ecommerce/searchproduct/',views.SearchProduct.as_view()),
    path('api/ecommerce/product/categoty/<str:category>/',views.Category.as_view()),
    path('api/ecommerce/accounts/',views.Accounts.as_view()),
    path('api/ecommerce/register/',views.Register.as_view()),
    path('api/ecommerce/login/',views.Login.as_view()),
    path('api/ecommerce/add/useraddress/',views.AddUserAddress.as_view()),
    path('api/ecommerce/edit/useraddress/',views.EditUserAddress.as_view()),
    path('api/ecommerce/cart/',views.Cart.as_view()),
    path('api/ecommece/addcomment/<int:id>/',views.Comment.as_view()),
    path('api/ecommerce/product/related/categoty/<int:id>/',views.RelatedCategory.as_view()),


    path('',views.HomePageView.as_view()),
    path('product/<int:id>/',views.ProductDetailView.as_view()),
    path('category/<str:category>/',views.CategoryView.as_view()),
    path('accounts/',views.AccountsView.as_view()),
    path('accounts/register/',views.RegisterView.as_view()),
    path('add/useraddress/',views.AddUserAddressView.as_view()),
    path('edit/useraddress/',views.EditUserAddressView.as_view()),
    path('accounts/cart/',views.CartView.as_view()),
]
