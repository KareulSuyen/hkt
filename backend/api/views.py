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


class AIAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'message': 'GET request to AI endpoint is working!'})

    def post(self, request):
        print("=== DEBUG: AI API Request Started ===")
        print(f"Content-Type: {request.content_type}")
        print(f"Raw data: {request.body}")
        print(f"Parsed data: {request.data}")
        
        try:
            data = request.data
            print(f"Successfully parsed data: {data}")
        except Exception as e:
            print(f"Error parsing data: {e}")
            return Response({'error': 'Invalid JSON', 'details': str(e)}, status=400)

        user_prompt = data.get('prompt')
        print(f"Extracted prompt: '{user_prompt}'")

        if not user_prompt:
            return Response({'error': 'Prompt is required.'}, status=400)

        # Enhanced settings debugging
        print(f"=== SETTINGS DEBUG ===")
        print(f"AI_API_KEY exists: {bool(getattr(settings, 'AI_API_KEY', None))}")
        print(f"AI_API_KEY length: {len(getattr(settings, 'AI_API_KEY', '')) if getattr(settings, 'AI_API_KEY', None) else 0}")
        print(f"AI_MODEL: '{getattr(settings, 'AI_MODEL', 'NOT_SET')}'")
        print(f"AI_API_BASE_URL: '{getattr(settings, 'AI_API_BASE_URL', 'NOT_SET')}'")

        # Check if settings are missing
        if not getattr(settings, 'AI_API_KEY', None):
            return Response({'error': 'AI_API_KEY not configured in settings'}, status=500)
        
        if not getattr(settings, 'AI_MODEL', None):
            return Response({'error': 'AI_MODEL not configured in settings'}, status=500)

        headers = {
            "Authorization": f"Bearer {settings.AI_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://localhost:3000",  # Updated referer
            "X-Title": "Hackathon AI Assistant"
        }

        payload = {
            "model": settings.AI_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": "You are an AI expert helping solve overpopulation problems in the Philippines, you can still provide off topic answers but remind them to focus on the specific problem(overpopulation), also... use tagalog/filipino taglish all the time"
                    "always call them SPCnian(spcc students), my name is Carl(dev)."
                    "You can call you self Boneng AI"
                },
                {
                    "role": "user",
                    "content": user_prompt
                }
            ],
            "max_tokens": 150  # Add token limit to prevent long responses
        }

        api_url = f"{settings.AI_API_BASE_URL}/chat/completions"
        print(f"=== REQUEST TO OPENROUTER ===")
        print(f"URL: {api_url}")
        print(f"Model: {settings.AI_MODEL}")
        print(f"Headers: {dict((k, v[:20] + '...' if k == 'Authorization' else v) for k, v in headers.items())}")
        print(f"Payload: {json.dumps(payload, indent=2)}")

        try:
            response = requests.post(
                api_url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            print(f"=== OPENROUTER RESPONSE ===")
            print(f"Status code: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            print(f"Response text (first 500 chars): {response.text[:500]}...")
            
        except requests.RequestException as e:
            print(f"Request exception: {e}")
            return Response({'error': 'Failed to reach OpenRouter API.', 'details': str(e)}, status=500)

        if response.status_code == 200:
            try:
                response_data = response.json()
                print(f"=== SUCCESS ===")
                print(f"Full response: {json.dumps(response_data, indent=2)}")
                
                # Check if response has expected structure
                if 'choices' not in response_data:
                    return Response({'error': 'Unexpected response format - no choices'}, status=500)
                
                if not response_data['choices']:
                    return Response({'error': 'Empty choices array in response'}, status=500)
                
                if 'message' not in response_data['choices'][0]:
                    return Response({'error': 'No message in first choice'}, status=500)
                
                ai_response = response_data["choices"][0]["message"]["content"]
                print(f"AI Response: {ai_response}")
                
                return Response({
                    "response": ai_response,
                    "model_used": response_data.get("model", "unknown"),
                    "usage": response_data.get("usage", {})
                })
                
            except Exception as e:
                print(f"Error parsing AI response: {e}")
                print(f"Raw response text: {response.text}")
                return Response({'error': 'Invalid AI response format', 'details': str(e)}, status=500)
        else:
            print(f"=== ERROR RESPONSE ===")
            print(f"Status: {response.status_code}")
            print(f"Error details: {response.text}")
            
            # Try to parse error response
            try:
                error_data = response.json()
                print(f"Parsed error: {json.dumps(error_data, indent=2)}")
            except:
                print("Could not parse error response as JSON")
            
            return Response({
                "error": "AI request failed.",
                "status_code": response.status_code,
                "details": response.text
            }, status=400)  # Return 400 instead of the original status code