import argparse
import csv
import sqlalchemy as sa
from sqlalchemy.schema import MetaData
import transaction

from cw.utils.db import get_session


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', '-c', help='config file', required=True)
    parser.add_argument('--file', help='data file', required=True)
    return parser.parse_args()


def get_csv_file(csv_path):
    reader = csv.DictReader(open(csv_path, "r"))
    return reader


def add_all(args, Model, Schema, **kwargs):
    reader = get_csv_file(args.file)
    add_all_items(args, Model, Schema, reader, **kwargs)


def add_all_items(args, Model, Schema, items, clear=False, backup_datetime=None, proc_item=None):
    schema = Schema()
    with transaction.manager:
        db = get_session(args.config)
        if backup_datetime:
            backup_table(db, Model, backup_datetime=backup_datetime)
        if clear:
            truncate_table(db, Model)
        for item in items:
            deserialized = schema.deserialize(item)
            if proc_item:
                deserialized = proc_item(deserialized)
            model = Model(**deserialized)
            db.add(model)


def truncate_table(db, Model):
    del_res = db.query(Model).delete(synchronize_session=False)
    db.execute(f"ALTER SEQUENCE IF EXISTS {Model.__table__.name}_id_seq RESTART WITH 1")
    return del_res


def backup_table(db, Model, backup_datetime=None):
    # Create backup table in backups schema
    metadata_backups = MetaData(schema="backups")
    _backup_datetime = (backup_datetime if backup_datetime else dt.datetime.now()).strftime("%Y_%m_%d__%H_%M_%S")
    Model_bak = sa.Table(f"{Model.__table__.name}_{_backup_datetime}", metadata_backups,
                         *[c.copy() for c in Model.__table__.columns])
    Model_bak.create(bind=db.get_bind())

    # Insert from select
    select_q = Model.__table__.select()
    insert_query = Model_bak.insert().from_select(select_q.columns, select_q)
    db.execute(insert_query)
