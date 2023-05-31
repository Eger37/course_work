"""renamed_ResultGrade_to_ResultOption._

Revision ID: 0dc35747c15f
Revises: 7bae4ec5cf55
Create Date: 2023-05-31 20:51:01.553166

"""

# revision identifiers, used by Alembic.
revision = '0dc35747c15f'
down_revision = '7bae4ec5cf55'

from alembic import op, context
import sqlalchemy as sa



def upgrade():
    schema_upgrades()
    if context.get_x_argument(as_dictionary=True).get('data', None):
        data_upgrades()

def downgrade():
    if context.get_x_argument(as_dictionary=True).get('data', None):
        data_downgrades()
    schema_downgrades()

def schema_upgrades():
    op.rename_table('result_grade', 'result_option')

    op.drop_constraint("result_grade_question_category_id_fkey", 'result_option', type_='foreignkey')
    op.create_foreign_key("result_option_question_category_id_fkey", 'result_option', 'question_category', ['question_category_id'], ['id'])
def schema_downgrades():
    op.rename_table('result_option', 'result_grade')

    op.drop_constraint('result_option_question_category_id_fkey', 'result_grade', type_='foreignkey')
    op.create_foreign_key("result_grade_question_category_id_fkey", 'result_grade', 'question_category', ['question_category_id'], ['id'])

def data_upgrades():
    pass

def data_downgrades():
    pass
