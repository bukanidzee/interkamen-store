# Установка базового имаджа
FROM python:3.7

RUN apt-get update && apt-get install bash && apt-get install dos2unix && apt-get install tree

# Установка переменных среды
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Установка корневой папки

#RUN mkdir -p /app
WORKDIR /app/

RUN bin/sh -c 'tree'

#COPY Pipfile* ./

COPY requirements.txt ./

# Установка зависимостей
#RUN pip install pipenv && pipenv install --system && rm -Rf /root/.cache/pip/

RUN python -m venv venv && . venv/bin/activate && pip install -r requirements.txt
RUN bin/sh -c 'cd venv; ls -l; cd ..'

# Скопировать проект
COPY heroku/wsgi-entrypoint.sh /entry/wsgi-entrypoint.sh
COPY heroku/gunicorn/ /etc/systemd/system/
#RUN cp -a /api/. /app
COPY . app/

RUN mkdir app/django_static
VOLUME app/django_static

RUN chmod +x /entry/wsgi-entrypoint.sh
RUN chmod +x /app/manage.py

#CMD ["/entry/wsgi-entrypoint.sh"]

CMD bin/sh -c 'ls -l; cd ..; ls -l' && gunicorn store.wsgi --log-file - --bind 127.0.0.1:8087
