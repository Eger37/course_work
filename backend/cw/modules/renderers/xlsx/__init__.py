from .XLSXWriter import XLSXWriter


class XLSXRenderer(object):
	def __init__(self, info):
		pass

	def __call__(self, value, system):
		header = value['header']
		rows = value['rows']

		writer = XLSXWriter(fieldnames=[h[0] for h in header])
		writer.writerow(dict(header))
		writer.writerows(rows)
		file_out = writer.get_file()

		filename = value['filename']
		resp = system['request'].response
		resp.content_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		resp.content_disposition = 'attachment;filename='+filename+'.xlsx'

		return file_out.getvalue()


def includeme(config):
	config.add_renderer('xlsx', XLSXRenderer)
