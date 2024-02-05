from django.contrib.auth.forms import UserCreationForm

from . import models


class RegiterForm(UserCreationForm):
    class Meta:
        model = models.UserAccount
        fields = ['first_name','last_name','username','email','telephone','password1','password2']