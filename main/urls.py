from django.urls import path
from rest_framework import routers

from .views import index, sox_detail, our_sox, sox_list

urlpatterns = [
    path('', index, name='home'),
    path('our_sox', our_sox, name='our_sox'),
    path('shop', sox_list, name='sox_list'),
    path('<slug:category_slug>', index, name='sox_list_by_category'),
    path('shop/<int:id>', sox_detail, name='sox_detail'),
]
