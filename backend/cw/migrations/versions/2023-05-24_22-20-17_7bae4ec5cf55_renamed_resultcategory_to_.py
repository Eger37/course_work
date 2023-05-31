"""renamed_ResultCategory_to_QuestionCategory._

Revision ID: 7bae4ec5cf55
Revises: 143d661aa7ee
Create Date: 2023-05-24 22:20:17.972330

"""

# revision identifiers, used by Alembic.
revision = '7bae4ec5cf55'
down_revision = '143d661aa7ee'

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
    op.rename_table('result_category', 'question_category')

    op.alter_column('answer_option', 'result_category_id', nullable=False, new_column_name='question_category_id')
    op.alter_column('result_grade', 'result_category_id', nullable=False, new_column_name='question_category_id')

    op.drop_constraint('answer_option_result_category_id_fkey', 'answer_option', type_='foreignkey')
    op.create_foreign_key("answer_option_question_category_id_fkey", 'answer_option', 'question_category', ['question_category_id'], ['id'])

    op.drop_constraint('result_grade_result_category_id_fkey', 'result_grade', type_='foreignkey')
    op.create_foreign_key("result_grade_question_category_id_fkey", 'result_grade', 'question_category', ['question_category_id'], ['id'])

def schema_downgrades():
    op.rename_table('question_category', 'result_category')
    op.alter_column('answer_option', 'question_category_id', nullable=False, new_column_name='result_category_id')
    op.alter_column('result_grade', 'question_category_id', nullable=False, new_column_name='result_category_id')

    op.drop_constraint("answer_option_question_category_id_fkey", 'answer_option', type_='foreignkey')
    op.create_foreign_key('answer_option_result_category_id_fkey', 'answer_option', 'result_category', ['result_category_id'], ['id'])

    op.drop_constraint("result_grade_question_category_id_fkey", 'result_grade', type_='foreignkey')
    op.create_foreign_key('result_grade_result_category_id_fkey', 'result_grade', 'result_category', ['result_category_id'], ['id'])



def data_upgrades():
    pass

def data_downgrades():
    pass
