from .CSVWriter import CSVWriter


class CSVRenderer(object):
	def __init__(self, info):
		pass

	def __call__(self, value, system):
		header = value['header']
		rows = value['rows']

		writer = CSVWriter(fieldnames=[h[0] for h in header])
		writer.writerow(dict(header))
		writer.writerows(rows)
		file_out = writer.get_file()

		filename = value['filename']
		resp = system['request'].response
		resp.content_type = 'text/csv'
		resp.content_disposition = 'attachment;filename='+filename+'.csv'

		return file_out.getvalue()


def includeme(config):
	config.add_renderer('csv', CSVRenderer)
