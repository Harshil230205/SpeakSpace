from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_mentor', 'is_participant')
    list_filter = ('is_mentor', 'is_participant')
    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {'fields': ('bio', 'profile_picture')}),
        ('Roles', {'fields': ('is_mentor', 'is_participant')}),
        ('Stats', {'fields': ('discussions_joined', 'feedback_received')}),
    )

admin.site.register(User, CustomUserAdmin)