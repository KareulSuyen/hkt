from django.urls import path
from .views import (
    CreateUserViews, 
    AIAPIView, 
    ReportIssueView,
    VerifyEmailView,
    ResendVerificationView
)

urlpatterns = [
    path('user/register/', CreateUserViews.as_view(), name='user-register'),
    path('user/verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('user/resend-verification/', ResendVerificationView.as_view(), name='resend-verification'),
    path('ai/', AIAPIView.as_view(), name='ai-endpoint'),
    path('report-issue/', ReportIssueView.as_view(), name='report-issue'),
]