import datetime as dt
from decimal import Decimal
from cornice.renderer import CorniceRenderer


# from cw.utils.date import isoformat


class CorniceRendererEx(CorniceRenderer):
    def __init__(self, *args, **kwargs):
        """Adds custom adapters."""
        super(CorniceRendererEx, self).__init__(*args, **kwargs)
        self.add_adapter(dt.datetime, lambda obj, request: obj.isoformat())
        self.add_adapter(dt.date, lambda obj, request: obj.isoformat())
        self.add_adapter(dt.time, lambda obj, request: obj.strftime("%H:%M"))
        # self.add_adapter(dt.datetime, lambda obj, request : isoformat(obj))
        # self.add_adapter(dt.date, lambda obj, request : isoformat(obj))
        # self.add_adapter(dt.time, lambda obj, request : isoformat(obj))
        self.add_adapter(Decimal, lambda obj, request: float(obj))
