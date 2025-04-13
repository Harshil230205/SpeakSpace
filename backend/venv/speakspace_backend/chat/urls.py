from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.RoomList.as_view(), name='room-list'),
    path('rooms/<int:pk>/', views.RoomDetail.as_view(), name='room-detail'),
    path('rooms/<int:room_id>/messages/', views.MessageList.as_view(), name='message-list'),
]
