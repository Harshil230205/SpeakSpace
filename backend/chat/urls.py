from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'rooms', views.RoomViewSet)
router.register(r'messages', views.MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
