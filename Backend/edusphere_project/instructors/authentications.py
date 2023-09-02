# instructors/authentication.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class InstructorJWTAuthentication(JWTAuthentication):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_user(self, validated_token):
        try:
            user_id = validated_token["user_id"]
            user = User.objects.get(id=user_id)

            if not user.is_active or not user.is_instructor:
                raise AuthenticationFailed("Instructor not found")

            return user
        except User.DoesNotExist:
            raise AuthenticationFailed("Instructor not found")


