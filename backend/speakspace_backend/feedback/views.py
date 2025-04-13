from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import FeedbackCategory, Feedback
from .serializers import (
    FeedbackCategorySerializer, FeedbackSerializer,
    CreateFeedbackSerializer
)

class FeedbackCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeedbackCategory.objects.all()
    serializer_class = FeedbackCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateFeedbackSerializer
        return FeedbackSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        # Filter for either feedback given by user or received by user
        return Feedback.objects.filter(evaluator=user) | Feedback.objects.filter(recipient=user)
    
    @action(detail=False, methods=['get'])
    def given(self, request):
        """View feedback given by the current user"""
        feedback = Feedback.objects.filter(evaluator=request.user)
        serializer = self.get_serializer(feedback, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def received(self, request):
        """View feedback received by the current user"""
        feedback = Feedback.objects.filter(recipient=request.user)
        serializer = self.get_serializer(feedback, many=True)
        return Response(serializer.data)