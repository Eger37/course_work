import csv
from io import StringIO


class CSVWriter(object):
	def __init__(self, fieldnames=[]):
		self._file = StringIO()
		self.fieldnames = fieldnames
		self.writer = csv.DictWriter(self._file,
			fieldnames=fieldnames,
			extrasaction='ignore',
			delimiter=';',
			quotechar=',',
			quoting=csv.QUOTE_MINIMAL,
		)

	def writerow(self, row):
		self.writer.writerow(row)

	def writerows(self, rows):
		self.writer.writerows(rows)

	def get_file(self):
		return self._file
