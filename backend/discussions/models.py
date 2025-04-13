from django.db import models
from django.conf import settings

class Discussion(models.Model):
    DISCUSSION_TYPES = (
        ('public', 'Public'),
        ('private', 'Private'),
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    discussion_type = models.CharField(max_length=10, choices=DISCUSSION_TYPES, default='public')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    max_participants = models.IntegerField(default=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class DiscussionParticipant(models.Model):
    ROLE_CHOICES = (
        ('host', 'Host'),
        ('participant', 'Participant'),
    )
    
    discussion = models.ForeignKey(Discussion, related_name='participants', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='participant')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('discussion', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.discussion.title}"
