from pyramid.config import Configurator

from cw.modules.cornice import deserializer_deriver


def main(global_config, **settings):
    config = Configurator(settings=settings)

    # Modules
    config.include("pyramid_redis")

    config.include(".database")
    config.include(".modules.renderers")
    config.include(".modules.security")
    config.include(".modules.cornice")

    config.add_view_deriver(deserializer_deriver, name="deserializer_deriver")

    config.scan()
    return config.make_wsgi_app()
