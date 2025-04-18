# Generated by Django 5.2 on 2025-04-13 04:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('discussions', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='discussion',
            name='evaluators',
            field=models.ManyToManyField(related_name='evaluated_discussions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='discussion',
            name='moderator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='moderated_discussions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='discussion',
            name='participants',
            field=models.ManyToManyField(related_name='participated_discussions', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='feedback',
            name='discussion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='discussions.discussion'),
        ),
        migrations.AddField(
            model_name='feedback',
            name='evaluator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='given_feedback', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='feedback',
            name='participant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_feedback', to=settings.AUTH_USER_MODEL),
        ),
    ]
