# Generated by Django 3.0.4 on 2020-03-31 21:58

from django.db import migrations, models


def forwards(apps, schema_editor):
    ScratchOrg = apps.get_model("api", "ScratchOrg")
    ScratchOrg.objects.update(is_created=True)


def backwards(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0064_user_agreed_to_tos_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="scratchorg",
            name="is_created",
            field=models.BooleanField(default=False),
        ),
        migrations.RunPython(forwards, backwards),
    ]