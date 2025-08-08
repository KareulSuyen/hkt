# chat/urls.py or api/urls.py depending on app name
from django.urls import path
from .views import CreateUserViews, AIAPIView

urlpatterns = [
    path('user/register/', CreateUserViews.as_view(), name='user-register'),
    path('ai/', AIAPIView.as_view(), name='ai-endpoint'),
    
]
