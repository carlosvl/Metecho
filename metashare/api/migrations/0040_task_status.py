# Generated by Django 2.2.8 on 2019-12-05 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0039_merge_20191113_2006"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="status",
            field=models.CharField(
                choices=[
                    ("Unstarted", "Unstarted"),
                    ("In progress", "In progress"),
                    ("Completed", "Completed"),
                ],
                default="Unstarted",
                max_length=16,
            ),
        ),
    ]
