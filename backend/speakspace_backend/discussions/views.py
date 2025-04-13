from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Discussion, Feedback
from .serializers import DiscussionSerializer, FeedbackSerializer

class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DiscussionSerializer

    def get_queryset(self):
        queryset = Discussion.objects.all()
        status_param = self.request.query_params.get('status', None)
        
        if status_param:
            queryset = queryset.filter(status=status_param)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(moderator=self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        discussion = self.get_object()
        
        if discussion.status != 'pending':
            return Response(
                {"detail": "This discussion is not accepting new participants."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if request.user in discussion.participants.all():
            return Response(
                {"detail": "You are already a participant in this discussion."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        discussion.participants.add(request.user)
        return Response(
            {"detail": "Successfully joined the discussion."},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        discussion = self.get_object()
        
        if discussion.status != 'pending':
            return Response(
                {"detail": "Cannot leave an active or completed discussion."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if request.user not in discussion.participants.all():
            return Response(
                {"detail": "You are not a participant in this discussion."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        discussion.participants.remove(request.user)
        return Response(
            {"detail": "Successfully left the discussion."},
            status=status.HTTP_200_OK
        )

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FeedbackSerializer

    def get_queryset(self):
        return Feedback.objects.filter(evaluator=self.request.user)

    def perform_create(self, serializer):
        serializer.save(evaluator=self.request.user)
