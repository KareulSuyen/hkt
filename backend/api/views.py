from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from .serializers import UserSerializer
import requests
import json


class CreateUserViews(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Add this temporary debug version to see what's wrong:

class AIAPIView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        print("=== GROQ AUTH DEBUG ===")
        
        # Check API key
        api_key = getattr(settings, 'GROQ_API_KEY', None)
        print(f"API Key exists: {bool(api_key)}")
        print(f"API Key length: {len(api_key) if api_key else 0}")
        print(f"API Key first 10 chars: {api_key[:10] if api_key else 'None'}...")
        print(f"API Key starts with 'gsk_': {api_key.startswith('gsk_') if api_key else False}")
        
        user_prompt = request.data.get('prompt', 'test')
        
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }
        
        payload = {
            "model": settings.AI_MODEL,
            "messages": [
                {"role": "system", "content": "You are an assistant who focuses on overpopulation issues in the Philippines."
                "Your name is BonengGPT"
                "You prefer taglish(tagalog/english)"
                "Your creator is Boneng Malakas."
                "sobre-populasyon is not a term, always say Sobrang populasyon(overpopulation)"
                "Only use Gen-z terms and don't use deep tagalog"},
                {"role": "user", "content": user_prompt}
            ],
            "max_tokens": 100
        }
        
        print(f"Request URL: {settings.AI_API_BASE_URL}/chat/completions")
        print(f"Model: {settings.AI_MODEL}")
        print(f"Authorization header: Bearer {api_key[:10]}..." if api_key else "No API key")
        
        try:
            response = requests.post(
                f"{settings.AI_API_BASE_URL}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30
            )
            
            print(f"Response status: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            print(f"Response text: {response.text}")
            
            if response.status_code == 401:
                return Response({
                    "error": "Groq API Key is invalid or expired",
                    "suggestion": "Check your GROQ_API_KEY in .env file",
                    "response": response.text
                }, status=400)
            
            if response.status_code == 200:
                data = response.json()
                return Response({"response": data["choices"][0]["message"]["content"]})
            else:
                return Response({"error": f"Groq error: {response.text}"}, status=400)
                
        except Exception as e:
            print(f"Request exception: {e}")
            return Response({'error': str(e)}, status=500)