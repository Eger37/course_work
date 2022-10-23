from sqlalchemy import engine_from_config, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy

from .models.user import *


configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def create_engine_by_url(url):
    return create_engine(url)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Get a ``sqlalchemy.orm.Session`` instance backed by a transaction.

    This function will hook the session to the transaction manager which
    will take care of committing any changes.

    - When using pyramid_tm it will automatically be committed or aborted
      depending on whether an exception is raised.

    - When using scripts you should wrap the session in a manager yourself.
      For example::

          import transaction

          engine = get_engine(settings)
          session_factory = get_session_factory(engine)
          with transaction.manager:
              dbsession = get_tm_session(session_factory, transaction.manager)

    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def get_urls(settings):
    prefix = 'sqlalchemy.'
    sqlalchemy_options = dict(
        (key[len(prefix):], settings[key])
        for key in settings
        if key.startswith(prefix)
    )

    url_prefix = "url_"
    sqlalchemy_urls = dict(
        (key[len(url_prefix):], sqlalchemy_options[key])
        for key in sqlalchemy_options
        if key.startswith(url_prefix)
    )

    for key in sqlalchemy_urls:
        del settings[f"{prefix}{url_prefix}{key}"]

    return sqlalchemy_urls


def includeme(config):
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'
    # use pyramid_tm to hook the transaction lifecycle to the request
    config.include('pyramid_tm')

    def add_dbsession(name, url):
        settings_new = {**settings, "sqlalchemy.url": url}
        engine = get_engine(settings_new)
        session_factory = get_session_factory(engine)
        config.registry[f'{name}_factory'] = session_factory

        config.add_request_method(lambda r: get_tm_session(session_factory, r.tm), name, reify=True)

    sqlalchemy_urls = get_urls(settings)
    add_dbsession('db', sqlalchemy_urls['data'])

    # if 'dbsession_data' in sqlalchemy_urls:
    #     add_dbsession('dbsession_data', sqlalchemy_urls['data'])

    # if 'freepbx' in sqlalchemy_urls:
    #     add_dbsession('dbsession_freepbx', sqlalchemy_urls['freepbx'])

    # if 'fusionpbx' in sqlalchemy_urls:
    #     add_dbsession('dbsession_fusionpbx', sqlalchemy_urls['fusionpbx'])
