import dicttoxml

ROOTNODE_XML_NAME = 'data'


class XmlRendererFactory:
    def __call__(self, info):
        def _renderer(value, system):
            request = system.get('request')
            request.response.content_type = 'text/xml'

            result = dicttoxml.dicttoxml(value, True, ROOTNODE_XML_NAME)

            return result

        return _renderer
