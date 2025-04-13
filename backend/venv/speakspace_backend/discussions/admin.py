from django.contrib import admin
from .models import Discussion, Feedback

@admin.register(Discussion)
class DiscussionAdmin(admin.ModelAdmin):
    list_display = ('title', 'moderator', 'created_at', 'start_time', 'end_time', 'status')
    list_filter = ('status',)
    search_fields = ('title', 'description')

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('discussion', 'participant', 'evaluator', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('comments',)