from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,  # original form fieldsets, expanded
        (  # new fieldset added on to the bottom
            # group heading of your choice; set to None for a blank space instead of a header
            "Custom Field",
            {
                "fields": (
                    "is_recruiter",
                    "avatar",
                    "telephone",
                    "github",
                    "work_category",
                    "city",
                    "skills",
                    "salary_expectation",
                    "work_experience_range",
                    "work_experience_text",
                    "work_expectation",
                    "resume",
                ),
            },
        ),
    )


admin.site.register(User, CustomUserAdmin)