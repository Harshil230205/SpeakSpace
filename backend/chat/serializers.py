from rest_framework import serializers
from .models import Room, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'room', 'user', 'content', 'timestamp']

class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ['id', 'name', 'created_at', 'last_message']

    def get_last_message(self, obj):
        message = obj.messages.first()
        if message:
            return MessageSerializer(message).data
        return None
