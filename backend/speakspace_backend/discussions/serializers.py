from rest_framework import serializers
from .models import Discussion, Feedback
from users.serializers import UserSerializer

class DiscussionSerializer(serializers.ModelSerializer):
    moderator = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Discussion
        fields = ('id', 'title', 'description', 'moderator', 'participants',
                  'start_time', 'end_time', 'status', 'created_at', 'updated_at')

class FeedbackSerializer(serializers.ModelSerializer):
    evaluator = UserSerializer(read_only=True)
    participant = UserSerializer(read_only=True)
    
    class Meta:
        model = Feedback
        fields = ('id', 'discussion', 'evaluator', 'participant', 'rating',
                  'comments', 'created_at')