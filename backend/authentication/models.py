from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import UserManager


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    is_salesman = models.BooleanField(default=False, help_text='Designates whether this user can sell products.',
                                      verbose_name='salesman')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
