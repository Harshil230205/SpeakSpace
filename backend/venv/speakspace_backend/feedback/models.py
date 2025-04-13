from django.db import models
from django.conf import settings
from discussions.models import Discussion

class FeedbackCategory(models.Model):
    """Model for feedback categories"""
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Feedback Categories"

class FeedbackCriteria(models.Model):
    """Model for specific feedback criteria"""
    category = models.ForeignKey(FeedbackCategory, on_delete=models.CASCADE, related_name='criteria')
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.category.name} - {self.name}"
    
    class Meta:
        verbose_name_plural = "Feedback Criteria"

class Feedback(models.Model):
    """Model for feedback given to participants"""
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='detailed_feedback')
    evaluator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='detailed_feedback_given')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='detailed_feedback_received')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Feedback from {self.evaluator.username} to {self.recipient.username}"

class FeedbackDetail(models.Model):
    """Model for specific feedback details"""
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name='details')
    criteria = models.ForeignKey(FeedbackCriteria, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(choices=[(i, i) for i in range(1, 6)])  # 1-5 rating
    comment = models.TextField()
    
    def __str__(self):
        return f"{self.criteria.name}: {self.rating}"