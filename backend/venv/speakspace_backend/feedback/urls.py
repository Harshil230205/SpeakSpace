from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedbackCategoryViewSet, FeedbackViewSet

router = DefaultRouter()
router.register(r'feedback-categories', FeedbackCategoryViewSet)
router.register(r'feedback', FeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]