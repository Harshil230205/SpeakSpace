from rest_framework import serializers
from .models import Discussion, DiscussionParticipant
from users.serializers import UserSerializer

class DiscussionParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = DiscussionParticipant
        fields = ('id', 'user', 'role', 'joined_at')

class DiscussionSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    participants_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Discussion
        fields = ('id', 'title', 'description', 'discussion_type', 'created_by',
                  'start_time', 'end_time', 'max_participants', 'is_active',
                  'created_at', 'updated_at', 'participants_count')
    
    def get_participants_count(self, obj):
        return obj.participants.count()

class DiscussionDetailSerializer(DiscussionSerializer):
    participants = DiscussionParticipantSerializer(many=True, read_only=True, source='participants.all')
    
    class Meta(DiscussionSerializer.Meta):
        fields = DiscussionSerializer.Meta.fields + ('participants',)

class CreateDiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = ('title', 'description', 'discussion_type', 'start_time', 
                 'end_time', 'max_participants')
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)
