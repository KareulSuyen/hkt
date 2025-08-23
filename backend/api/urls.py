from django.urls import path
from .views import CreateUserViews, AIAPIView, ReportIssueView

urlpatterns = [
    path('user/register/', CreateUserViews.as_view(), name='user-register'),
    path('ai/', AIAPIView.as_view(), name='ai-endpoint'),
    path('report-issue/', ReportIssueView.as_view(), name='report-issue'),
]