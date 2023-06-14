#! /bin/bash

export PROJECT_NAME=$(basename "$PWD")

function show_commands() {
	echo "Available commands: '$1'"
	printf '\r\n'
	printf '    '
	printf '%s\n    ' "${commands[@]}"
	printf '\r\n'
}

function docker_compose() {
	docker-compose -f docker-compose.dev.yml $@
}

function execute() {
	docker_compose exec $@;
}


function db() {
	function init() {

		function superuser() {
			execute backend python -m cw.scripts.data_to_db_superuser --config development.ini --file cw/data/superuser.csv
		}

		commands=(superuser)
		if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
			$@;
		else
			show_commands "db init" "$commands"
		fi
	}

	function alembic() {
		execute backend alembic -c development.ini $@
	}

	function downgrade() {
		alembic -x data=true downgrade -1
	}

	function upgrade() {
		# alembic upgrade head
		alembic -x data=true upgrade head
	}

	function commit() {
		comment=$(printf "%s_" "${@}")
		alembic revision --autogenerate -m "$comment"
	}

	commands=(alembic downgrade upgrade upgrade_with_data commit init)
	if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
		$@;
	else
		show_commands db "$commands"
	fi
}


function logs() {
	docker_compose logs --follow $@
}

function stop() {
	docker_compose down
}

function start() {
	docker_compose build backend
	docker_compose up --build -d
	logs
}

function restart() {
	stop
	start
}

function backend() {
	execute backend ash
}

function nginx() {
	execute nginx ash
}

function database() {
	execute database ash
}


commands=(deploy start stop restart logs test db backend execute rstart)


if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
	$@;
else
	show_commands 'development' "$commands"
fi
