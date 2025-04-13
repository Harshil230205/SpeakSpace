from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """Custom user model"""
    email = models.EmailField(_('email address'), unique=True)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    # Additional fields for user roles
    is_mentor = models.BooleanField(default=False)
    is_participant = models.BooleanField(default=True)
    
    # Fields for tracking progress
    discussions_joined = models.PositiveIntegerField(default=0)
    feedback_received = models.PositiveIntegerField(default=0)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email

# discussions/models.py
from django.db import models
from django.conf import settings

class Discussion(models.Model):
    """Model for group discussions"""
    DISCUSSION_TYPES = (
        ('interview', 'Interview Practice'),
        ('group_discussion', 'Group Discussion'),
        ('debate', 'Debate'),
        ('presentation', 'Presentation'),
    )
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    discussion_type = models.CharField(max_length=20, choices=DISCUSSION_TYPES)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_discussions')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    max_participants = models.PositiveIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class DiscussionParticipant(models.Model):
    """Model for discussion participants"""
    ROLES = (
        ('participant', 'Participant'),
        ('moderator', 'Moderator'),
        ('evaluator', 'Evaluator'),
    )
    
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='discussion_participations')
    role = models.CharField(max_length=20, choices=ROLES, default='participant')
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('discussion', 'user')
    
    def __str__(self):
        return f"{self.user.username} in {self.discussion.title}"
