# Generated by Django 3.0.6 on 2020-06-02 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0079_merge_20200601_2056"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="currently_fetching_org_config_names",
            field=models.BooleanField(default=False),
        ),
    ]
