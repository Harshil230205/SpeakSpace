from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/chat/', include('chat.urls')),
    path('api/discussions/', include('discussions.urls')),
    path('api/auth/', include('rest_framework.urls')),
    path('api/token-auth/', auth_views.obtain_auth_token),
]