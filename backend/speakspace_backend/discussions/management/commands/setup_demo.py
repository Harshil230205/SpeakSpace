from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from discussions.models import Discussion, DiscussionParticipant
from feedback.models import FeedbackCategory, FeedbackCriteria
from django.utils import timezone
import datetime

User = get_user_model()

class Command(BaseCommand):
    help = 'Sets up demo data for SpeakSpace'
    
    def handle(self, *args, **kwargs):
        self.stdout.write('Creating demo data...')
        
        # Create admin user if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                'admin', 'admin@example.com', 'adminpassword123',
                first_name='Admin', last_name='User'
            )
            self.stdout.write('Admin user created')
        
        # Create mentor user
        if not User.objects.filter(username='mentor').exists():
            mentor = User.objects.create_user(
                'mentor', 'mentor@example.com', 'mentorpassword123',
                first_name='Mentor', last_name='User',
                is_mentor=True, is_participant=False
            )
            self.stdout.write('Mentor user created')
        else:
            mentor = User.objects.get(username='mentor')
        
        # Create participant users
        participants = []
        for i in range(1, 6):
            username = f'user{i}'
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username, f'{username}@example.com', 'userpassword123',
                    first_name=f'User', last_name=f'{i}',
                    is_participant=True
                )
                participants.append(user)
                self.stdout.write(f'Participant {username} created')
            else:
                participants.append(User.objects.get(username=username))
        
        # Create feedback categories and criteria
        if not FeedbackCategory.objects.filter(name='Communication').exists():
            comm_category = FeedbackCategory.objects.create(
                name='Communication',
                description='Evaluation of verbal and non-verbal communication skills'
            )
            
            FeedbackCriteria.objects.create(
                category=comm_category,
                name='Clarity',
                description='Ability to express ideas clearly and concisely'
            )
            
            FeedbackCriteria.objects.create(
                category=comm_category,
                name='Body Language',
                description='Effective use of gestures, posture, and eye contact'
            )
            
            self.stdout.write('Communication category and criteria created')
        
        if not FeedbackCategory.objects.filter(name='Content').exists():
            content_category = FeedbackCategory.objects.create(
                name='Content',
                description='Quality and relevance of content presented'
            )
            
            FeedbackCriteria.objects.create(
                category=content_category,
                name='Relevance',
                description='Relevance of points to the topic at hand'
            )
            
            FeedbackCriteria.objects.create(
                category=content_category,
                name='Structure',
                description='Logical organization and flow of ideas'
            )
            
            self.stdout.write('Content category and criteria created')
            
        if not FeedbackCategory.objects.filter(name='Critical Thinking').exists():
            thinking_category = FeedbackCategory.objects.create(
                name='Critical Thinking',
                description='Evaluation of analytical and problem solving abilities'
            )
            
            FeedbackCriteria.objects.create(
                category=thinking_category,
                name='Analysis',
                description='Ability to analyze problems and situations'
            )
            
            FeedbackCriteria.objects.create(
                category=thinking_category,
                name='Reasoning',
                description='Quality of logical arguments and conclusions'
            )
            
            self.stdout.write('Critical Thinking category and criteria created')
        
        # Create sample discussions
        now = timezone.now()
        
        if not Discussion.objects.filter(title='Mock Interview: Software Engineering').exists():
            # Future discussion
            future_discussion = Discussion.objects.create(
                title='Mock Interview: Software Engineering',
                description='Practice tech interview questions with peers and get feedback from industry mentors.',
                discussion_type='interview',
                created_by=mentor,
                start_time=now + datetime.timedelta(days=2),
                end_time=now + datetime.timedelta(days=2, hours=1),
                max_participants=5,
                is_active=True
            )
            
            # Auto-join the mentor as moderator
            DiscussionParticipant.objects.create(
                discussion=future_discussion,
                user=mentor,
                role='moderator'
            )
            
            # Add a couple participants
            for i in range(2):
                if i < len(participants):
                    DiscussionParticipant.objects.create(
                        discussion=future_discussion,
                        user=participants[i],
                        role='participant'
                    )
            
            self.stdout.write('Future discussion created')
        
        if not Discussion.objects.filter(title='Group Discussion: Leadership Styles').exists():
            # Current discussion
            current_discussion = Discussion.objects.create(
                title='Group Discussion: Leadership Styles',
                description='Discuss different leadership approaches and their effectiveness in various scenarios.',
                discussion_type='group_discussion',
                created_by=mentor,
                start_time=now - datetime.timedelta(minutes=30),
                end_time=now + datetime.timedelta(minutes=30),
                max_participants=8,
                is_active=True
            )
            
            # Auto-join the mentor as evaluator
            DiscussionParticipant.objects.create(
                discussion=current_discussion,
                user=mentor,
                role='evaluator'
            )
            
            # Add several participants
            for i in range(4):
                if i < len(participants):
                    DiscussionParticipant.objects.create(
                        discussion=current_discussion,
                        user=participants[i],
                        role='participant'
                    )
            
            self.stdout.write('Current discussion created')
        
        if not Discussion.objects.filter(title='Debate: Artificial Intelligence Ethics').exists():
            # Past discussion
            past_discussion = Discussion.objects.create(
                title='Debate: Artificial Intelligence Ethics',
                description='Explore ethical considerations in AI development and deployment.',
                discussion_type='debate',
                created_by=mentor,
                start_time=now - datetime.timedelta(days=7),
                end_time=now - datetime.timedelta(days=7, hours=-1),
                max_participants=6,
                is_active=False
            )
            
            # Auto-join the mentor as moderator
            DiscussionParticipant.objects.create(
                discussion=past_discussion,
                user=mentor,
                role='moderator'
            )
            
            # Add all participants
            for participant in participants:
                DiscussionParticipant.objects.create(
                    discussion=past_discussion,
                    user=participant,
                    role='participant'
                )
            
            self.stdout.write('Past discussion created')
            
        self.stdout.write(self.style.SUCCESS('Successfully created demo data'))