
# PROJECT urls.py (backend/urls.py)
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # Remove this line: path('api/user/register/', include('api.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='user-token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('api.urls')),  # Keep only this one
    # Remove these duplicate includes:
    # path('ai/', include('api.urls')),
    # path('report-issue/', ReportIssueView.as_view(), name='report-issue'),
]