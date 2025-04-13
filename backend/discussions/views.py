from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Discussion, DiscussionParticipant
from .serializers import (
    DiscussionSerializer, 
    DiscussionDetailSerializer,
    CreateDiscussionSerializer,
    DiscussionParticipantSerializer
)

class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Discussion.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateDiscussionSerializer
        elif self.action in ['retrieve', 'participants']:
            return DiscussionDetailSerializer
        return DiscussionSerializer

    def get_queryset(self):
        queryset = Discussion.objects.all()
        if self.action == 'list':
            discussion_type = self.request.query_params.get('type', None)
            if discussion_type:
                queryset = queryset.filter(discussion_type=discussion_type)
        return queryset

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        discussion = self.get_object()
        
        # Check if user is already a participant
        if DiscussionParticipant.objects.filter(discussion=discussion, user=request.user).exists():
            return Response({'detail': 'Already a participant'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if discussion is full
        if discussion.participants.count() >= discussion.max_participants:
            return Response({'detail': 'Discussion is full'}, status=status.HTTP_400_BAD_REQUEST)
        
        participant = DiscussionParticipant.objects.create(
            discussion=discussion,
            user=request.user,
            role='participant'
        )
        
        serializer = DiscussionParticipantSerializer(participant)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        discussion = self.get_object()
        try:
            participant = DiscussionParticipant.objects.get(
                discussion=discussion,
                user=request.user
            )
            participant.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except DiscussionParticipant.DoesNotExist:
            return Response(
                {'detail': 'Not a participant'},
                status=status.HTTP_400_BAD_REQUEST
            )
