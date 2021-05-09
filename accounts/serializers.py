from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "username",
            "is_recruiter",
            "avatar",
            "telephone",
            "github",
            "salary_expectation",
            "work_experience_range",
            "work_experience_text",
            "work_expectation",
            "resume",
        )


class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "telephone",
            "github",
            "salary_expectation",
            "work_experience_range",
            "work_experience_text",
            "work_expectation",
        )