from django.db import models
from users.models import User

class Discussion(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    moderator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='moderated_discussions')
    participants = models.ManyToManyField(User, related_name='participated_discussions')
    evaluators = models.ManyToManyField(User, related_name='evaluated_discussions')
    created_at = models.DateTimeField(auto_now_add=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('completed', 'Completed'),
    ], default='pending')

class Feedback(models.Model):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    participant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_feedback')
    evaluator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_feedback')
    communication_score = models.IntegerField()
    confidence_score = models.IntegerField()
    logic_score = models.IntegerField()
    engagement_score = models.IntegerField()
    comments = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)