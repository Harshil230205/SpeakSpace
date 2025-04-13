from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DiscussionViewSet, FeedbackViewSet

router = DefaultRouter()
router.register(r'discussions', DiscussionViewSet)
router.register(r'feedback', FeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]