from dataclasses import dataclass

from pyramid.config import Configurator
from .CorniceRendererEx import CorniceRendererEx
from .XmlRendererFactory import XmlRendererFactory
from .NegotiatingRendererFactory import NegotiatingRendererFactory


@dataclass
class RenderConf:
    name: str
    content_type: str
    render: type


NegotiatorName = 'negotiate'

__render_configs = [
    RenderConf(name='json', content_type='application/json', render=CorniceRendererEx),
    RenderConf(name='xml', content_type='text/xml', render=XmlRendererFactory)
]

__map_name2listtype = {}


def get_producers_by_render(renderer):
    if renderer in __map_name2listtype:
        return __map_name2listtype[renderer]


def includeme(config):
    _negotiator_map = {}

    # add renders
    for render_config in __render_configs:
        render = render_config.render()
        config.add_renderer(render_config.name, render)
        _negotiator_map[render_config.content_type] = render
        __map_name2listtype[render_config.name] = [render_config.content_type]

    __map_name2listtype[NegotiatorName] = list(_negotiator_map.keys())
    # add default render
    config.add_renderer(None, _negotiator_map['application/json'])

    # add negotiate render
    negotiator = NegotiatingRendererFactory(_negotiator_map)
    config.add_renderer(NegotiatorName, negotiator)
