#! /bin/bash

export PROJECT_NAME=$(basename "$PWD")

function show_commands() {
	echo "Available commands: '$1'"
	printf '\r\n'
	printf '    '
	printf '%s\n    ' "${commands[@]}"
	printf '\r\n'
}

function db() {
	function init() {
		function exec_init() {
			execute backend python -m osfc.scripts.data_to_db_$1 --config ${ini_file} --file osfc/data/$1.$2
		}

		function everything() {
			xlsx customers
			csv superuser			
			
		}

		function csv() {
			commands=(holidays superuser customers)
			if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
				exec_init $1 csv
			else
				show_commands "csv" "$commands"
			fi
		}

		function xlsx() {
			commands=(customers articles)
			if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
				exec_init $1 xlsx
			else
				show_commands "xlsx" "$commands"
			fi
		}
		
		commands=(csv xlsx everything)
		if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
			$@;
		else
			show_commands "db init" "$commands"
		fi
	}

	function alembic() {
		execute backend alembic -c ${ini_file} $@
	}

	function downgrade() {
		alembic -x data=true downgrade -1
	}

	function upgrade() {
		alembic -x data=true upgrade +1
	}

	function upgrade_head() {
		alembic -x data=true upgrade head
	}

	function upgrade_head_nodata() {
		alembic upgrade head
	}

	function commit() {
		comment=$(printf "%s_" "${@}")
		alembic revision --autogenerate -m "$comment"
	}

	function dump() {
		execute database pg_dump -U database > ~/dumps/$(date +'%Y-%m-%d--%H-%M-%S').dump
	}

	commands=(alembic downgrade upgrade upgrade_head upgrade_head_nodata commit dump init)
	if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
		$@;
	else
		show_commands db "$commands"
	fi
}

function execute() {
	docker_compose exec $@;
}
function ash() {
	execute $@ ash
}
function up_build() {
	docker_compose up --build -d $@
}

function build() {
	docker_compose build backend
	docker_compose build $@
}
function stop() {
	docker_compose down
}
function start() {
	build
	docker_compose up -d
	logs
}

function debug_start() {
	docker_compose --profile debug up -d
}

function restart() {
	stop
	start
}

function restart_frontend() {
	docker_compose down nginx
	docker_compose build frontend
	docker_compose up --build -d nginx
}

function prod_build() {
	docker_compose build --no-cache backend
	docker_compose build --no-cache
}
function prod_stop() {
	docker_compose down --volumes --remove-orphans
}
function prod_start() {
	docker_compose up -d
}
function prod_restart() {
	prod_stop
	prod_build
	prod_start
	docker image prune --force
}

function translate() {
	execute backend python -m osfc.scripts.update_translations --config ${ini_file} --file ../translation/dictionary.csv
	yarn --cwd ./frontend/ translation
}

function mails() {
	execute maildev wget -q -O- localhost:80/email | jq "map({time:.time,html:.html})"
}

function logs() {
	docker_compose logs --follow $@
}

function test() {
	echo "TEST: '$@'";
}


commands=(docker_compose db execute ash up_build build start stop restart restart_frontend prod_build prod_start prod_stop prod_restart debug_start logs mails translate test)

if [[ $# -gt 0 ]] && [[ "${commands[@]}" =~ "$1" ]]; then
	$@;
else
	show_commands 'development' "$commands"
fi
