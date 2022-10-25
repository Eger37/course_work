from .Migrator import Migrator, BulkMigrator


class MockSource():
	def __init__(self, data=[]):
		self.data = data

	def update(self, v_from, v_to):
		for i, val in enumerate(self.data):
			if self.data[i] == v_from:
				self.data[i] = v_to


def test_migrator():
	source_1 = MockSource([1, 2, 3, 3])
	source_2 = MockSource([1, 2, 3, 3])
	bl = BulkMigrator(sources=[source_1, source_2])\
		.add_migration(1, 2)\
		.add_migration(2, 1)\
		.add_migration(3, 3)
	assert source_1.data == [1, 2, 3, 3]
	assert source_2.data == [1, 2, 3, 3]
	bl.upgrade()
	assert source_1.data == [2, 1, 3, 3]
	assert source_2.data == [2, 1, 3, 3]
	bl.downgrade()
	assert source_1.data == [1, 2, 3, 3]
	assert source_2.data == [1, 2, 3, 3]
