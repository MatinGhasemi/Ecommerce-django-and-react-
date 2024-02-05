from django import forms
from django.contrib.auth.forms import UserCreationForm

from . import models


class RegiterForm(UserCreationForm):
    class Meta:
        model = models.UserAccount
        fields = ['first_name','last_name','username','email','telephone','password1','password2']

    
class CommentForm(forms.ModelForm):
    class Meta:
        model = models.Comment
        fields = ['product','name','email','comment']