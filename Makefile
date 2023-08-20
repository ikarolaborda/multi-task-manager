.DEFAULT_GOAL := help

help:
	@echo "Please choose what you want to do: \n" \
	" make dup: Start the Docker containers \n" \
	" make ddw: Stop the Docker containers \n" \
	" make drs: Restart the Docker containers \n" \
	" make mysql: Run the interactive shell in the MySQL container. \n" \

build:
	cp .env.example .env;
	export COMPOSE_FILE=docker-compose.yml; docker-compose -f docker-compose.yml --env-file .env up -d --build

dup:
	export COMPOSE_FILE=docker-compose.yml; docker-compose up -d

ddw:
	export COMPOSE_FILE=docker-compose.yml; docker-compose down --volumes

drs:
	export COMPOSE_FILE=docker-compose.yml; docker-compose down --volumes && docker-compose up -d

mysql:
	docker exec -it mysql bash

backend:
	docker exec -it backend sh