#!/bin/sh

until cd /app/
do
  echo "Waiting for server..."
done

dos2unix ./manage.py

until ./manage.py makemigrations
do
  echo "Waiting for migrations to be ready..."
  sleep 2
done

until ./manage.py migrate
do
  echo "Waiting for db to be ready..."
  sleep 2
done

./manage.py collectstatic --noinput

dos2unix ./store/wsgi.py

gunicorn store.wsgi --bind 127.0.0.1:8087 --workers 4 --threads 4

# gunicorn store.wsgi --bind my-training-react-project.herokuapp.com:8000 --workers 4 --threads 4

#####################################################################################
# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# run gunicorn with debug log level
# gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# run development server
# DEBUG=True ./manage.py runserver 0.0.0.0:8000
