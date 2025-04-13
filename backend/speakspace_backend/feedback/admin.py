from django.contrib import admin
from .models import FeedbackCategory, FeedbackCriteria, Feedback, FeedbackDetail

class FeedbackCriteriaInline(admin.TabularInline):
    model = FeedbackCriteria
    extra = 1

@admin.register(FeedbackCategory)
class FeedbackCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [FeedbackCriteriaInline]

@admin.register(FeedbackCriteria)
class FeedbackCriteriaAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)

class FeedbackDetailInline(admin.TabularInline):
    model = FeedbackDetail
    extra = 1

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('evaluator', 'recipient', 'discussion', 'created_at')
    list_filter = ('created_at',)
    inlines = [FeedbackDetailInline]

@admin.register(FeedbackDetail)
class FeedbackDetailAdmin(admin.ModelAdmin):
    list_display = ('feedback', 'criteria', 'rating')
    list_filter = ('rating',)