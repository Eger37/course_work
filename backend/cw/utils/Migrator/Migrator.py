from collections import defaultdict

class Migrator(object):
	def __init__(self, id_, id_to, sources=[]):
		self.sources = sources

		self.id = id_
		self.tmp_id = self.id * -1

		self.id_to = id_to
		self.tmp_id_to = self.id_to * -1

	def _update(self, v_from, v_to):
		for source in self.sources:
			source.update(v_from, v_to)

	def upgrade_tmp(self):
		self._update(self.id, self.tmp_id)

	def upgrade(self):
		self._update(self.tmp_id, self.id_to)

	def downgrade_tmp(self):
		self._update(self.id_to, self.tmp_id_to)

	def downgrade(self):
		self._update(self.tmp_id_to, self.id)


class BulkMigrator(object):
	def __init__(self, migrator_cls=Migrator, sources=[], **kwargs):
		self.kw = kwargs
		self.sources = sources
		self.migrator_cls = migrator_cls
		self.migrations = []
		self.checker = defaultdict(set)

	def add_migration(self, v_from, v_to):
		self.checker[v_to].add(v_from)
		if len(self.checker[v_to]) > 1:
			raise Exception(f"You cant migrate two values to one. {self.checker[v_to]} => {v_to}")
		self.migrations.append(
			self.migrator_cls(v_from, v_to, sources=self.sources, **self.kw)
		)
		return self

	def upgrade(self):
		for m in self.migrations:
			m.upgrade_tmp()
		for m in self.migrations:
			m.upgrade()

	def downgrade(self):
		for m in self.migrations:
			m.downgrade_tmp()
		for m in self.migrations:
			m.downgrade()
