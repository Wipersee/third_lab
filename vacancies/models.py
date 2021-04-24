from django.db import models
from info.models import Skills


class Vacancy(models.Model):
    verbose_name_plural = "Vacancies"
    title = models.CharField(max_length=126, unique=True)
    text = models.TextField()
    required_skills = models.ManyToManyField(Skills)
    views = models.PositiveIntegerField(default=0)
    publish_date = models.DateField(auto_now_add=True)
    recruiter = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="published_by",
        null=True,
    )
    respond = models.ManyToManyField("accounts.User", related_name="responded_by")
    salary = models.PositiveIntegerField()

    def __str__(self):
        return self.title
