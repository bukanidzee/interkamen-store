# Установка базового имаджа
FROM python:3.7

RUN apt-get update && apt-get install bash && apt-get install dos2unix

# Установка переменных среды
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Установка корневой папки

RUN mkdir -p /app
RUN ls -l && cd .. && ls -l

COPY ./api/Pipfile /app
COPY ./api/Pipfile.lock /app

# Установка зависимостей
RUN pip install pipenv && pipenv install --system && rm -Rf /root/.cache/pip/

# Скопировать проект
COPY wsgi-entrypoint.sh /entry/wsgi-entrypoint.sh
COPY ./api /app

EXPOSE $PORT

RUN chmod +x /entry/wsgi-entrypoint.sh

ENTRYPOINT ["/entry/wsgi-entrypoint.sh"]
