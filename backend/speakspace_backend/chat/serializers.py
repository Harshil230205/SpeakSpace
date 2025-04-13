from rest_framework import serializers
from .models import Room, Message
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'room', 'user', 'content', 'created_at']
        read_only_fields = ['created_at']

class RoomSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Room
        fields = ['id', 'name', 'created_by', 'created_at', 'messages']
        read_only_fields = ['created_at']
