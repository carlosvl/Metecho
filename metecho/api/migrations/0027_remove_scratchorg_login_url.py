# Generated by Django 2.2.5 on 2019-10-15 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("api", "0026_use_stringfield_everywhere")]

    operations = [migrations.RemoveField(model_name="scratchorg", name="login_url")]
