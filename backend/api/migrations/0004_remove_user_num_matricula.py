# Generated by Django 4.0.4 on 2024-02-19 16:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_turnos_usuario_turno'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='num_matricula',
        ),
    ]
