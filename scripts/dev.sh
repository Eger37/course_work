#! /bin/bash

ini_file="development.ini"

function docker_compose() {
	docker-compose -f docker-compose.dev.yml $@
}

source scripts/base.sh