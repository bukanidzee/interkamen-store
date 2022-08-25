# Установка базового имаджа
FROM python:3.7

RUN apt-get update && apt-get install bash && apt-get install dos2unix

# Установка переменных среды
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Установка корневой папки

#RUN mkdir -p /app
WORKDIR /app/

#RUN cp -a Pipfile /app && cp -a /api/Pipfile.lock /app
COPY Pipfile* ./

# Установка зависимостей
RUN pip install pipenv && pipenv install --system && rm -Rf /root/.cache/pip/

# Скопировать проект
COPY heroku/wsgi-entrypoint.sh /entry/wsgi-entrypoint.sh
#RUN cp -a /api/. /app
COPY . .

RUN mkdir django_static
VOLUME /django_static

RUN chmod +x /entry/wsgi-entrypoint.sh
RUN chmod +x /app/manage.py
RUN chmod +x /app/store/wsgi.py

#CMD ["/entry/wsgi-entrypoint.sh"]

CMD gunicorn store.wsgi --log-file - --bind 127.0.0.1:8087
