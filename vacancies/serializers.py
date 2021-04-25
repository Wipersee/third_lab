from rest_framework import serializers
from .models import Vacancy
from info.serializers import SkillsSerializer
from info.models import Skills


class VacancyListField(serializers.RelatedField):
    skills = serializers.ListField()


class VacancySerializer(serializers.ModelSerializer):
    # required_skills = VacancySkillsSerializer(read_only=True)
    recruiter = serializers.StringRelatedField()
    # respond = serializers.StringRelatedField()

    class Meta:
        model = Vacancy
        fields = (
            "title",
            "text",
            # "required_skills",
            "views",
            "publish_date",
            "recruiter",
            "respond",
            "salary",
        )


class VacancyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = (
            "title",
            "text",
            "salary",
        )
