from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from info.models import WorkCategory, Cities, Skills

from vacancies.models import Vacancy
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator


class Company(models.Model):
    company = models.CharField(max_length=256, unique=True)
    description = models.TextField()
    link = models.URLField(max_length=256, blank=True)
    city = models.ForeignKey(Cities, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.company


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_recruiter = models.BooleanField(default=False)
    company = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )
    company_describe = models.TextField
    avatar = models.ImageField(upload_to="users/avatars/%Y/%m/%d/", blank=True)
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
    )
    telephone = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    github = models.URLField(max_length=256, blank=True)
    work_category = models.ForeignKey(
        WorkCategory, on_delete=models.SET_NULL, null=True, blank=True
    )  # IF WORKCATEGORY WILL BE DELETED THEN HERE WOULD BE NULL
    city = models.ForeignKey(
        Cities, on_delete=models.SET_NULL, null=True, blank=True
    )  # SAME THING HERE AS WITH WORKCATEGORY
    skills = models.ManyToManyField(Skills, blank=True)
    salary_expectation = models.PositiveIntegerField(default=0)
    work_experience_range = models.PositiveIntegerField(
        default=0, validators=[MaxValueValidator(40), MinValueValidator(0)]
    )
    work_experience_text = models.TextField(blank=True)
    work_expectation = models.TextField(blank=True)
    resume = models.FileField(upload_to="users/resumes/%Y/%m/%d/", blank=True)

    def user_id(self):
        return self.id.__str__()

    def __str__(self):
        return self.username
