#! /bin/bash

ini_file="production.ini"

function docker_compose() {
	docker-compose -f docker-compose.prod.yml $@
}

source scripts/base.sh