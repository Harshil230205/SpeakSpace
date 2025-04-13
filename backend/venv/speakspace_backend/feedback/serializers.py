from rest_framework import serializers
from .models import FeedbackCategory, FeedbackCriteria, Feedback, FeedbackDetail
from users.serializers import UserSerializer

class FeedbackCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackCriteria
        fields = ('id', 'name', 'description')

class FeedbackCategorySerializer(serializers.ModelSerializer):
    criteria = FeedbackCriteriaSerializer(many=True, read_only=True)
    
    class Meta:
        model = FeedbackCategory
        fields = ('id', 'name', 'description', 'criteria')

class FeedbackDetailSerializer(serializers.ModelSerializer):
    criteria = FeedbackCriteriaSerializer(read_only=True)
    
    class Meta:
        model = FeedbackDetail
        fields = ('id', 'criteria', 'rating', 'comment')

class FeedbackSerializer(serializers.ModelSerializer):
    evaluator = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)
    details = FeedbackDetailSerializer(many=True, read_only=True)
    
    class Meta:
        model = Feedback
        fields = ('id', 'discussion', 'evaluator', 'recipient', 'created_at', 'details')

class CreateFeedbackSerializer(serializers.ModelSerializer):
    details = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        ),
        write_only=True
    )
    
    class Meta:
        model = Feedback
        fields = ('discussion', 'recipient', 'details')
    
    def create(self, validated_data):
        details_data = validated_data.pop('details')
        validated_data['evaluator'] = self.context['request'].user
        
        feedback = Feedback.objects.create(**validated_data)
        
        for detail in details_data:
            FeedbackDetail.objects.create(
                feedback=feedback,
                criteria_id=detail['criteria_id'],
                rating=detail['rating'],
                comment=detail['comment']
            )
        
        # Update user stats
        recipient = validated_data['recipient']
        recipient.feedback_received += 1
        recipient.save()
        
        return feedback