import transaction
import argparse

from pyramid.paster import (
    get_appsettings,
    setup_logging,
)

from cw.database import (
    create_engine_by_url,
    get_session_factory,
    get_tm_session,
)


def get_session(config_path):
    config_uri = config_path
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    database_url = settings.get("sqlalchemy.url")
    engine = create_engine_by_url(database_url)
    session_factory = get_session_factory(engine)
    return get_tm_session(session_factory, transaction.manager)


def get_session_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', '-c', help='config file', required=True)
    return parser.parse_args()
