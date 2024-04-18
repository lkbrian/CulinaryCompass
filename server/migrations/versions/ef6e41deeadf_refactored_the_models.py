"""refactored the models

Revision ID: ef6e41deeadf
Revises: 88b545b76f0b
Create Date: 2024-04-16 00:53:36.812544

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef6e41deeadf'
down_revision = '88b545b76f0b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ratings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rating', sa.Integer(), nullable=True))
        batch_op.drop_column('Rating')

    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favorite', sa.Boolean(), nullable=True))
        batch_op.drop_column('favourite')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('_password_hash',
               existing_type=sa.INTEGER(),
               type_=sa.String(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('_password_hash',
               existing_type=sa.String(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('favourite', sa.BOOLEAN(), nullable=True))
        batch_op.drop_column('favorite')

    with op.batch_alter_table('ratings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('Rating', sa.INTEGER(), nullable=True))
        batch_op.drop_column('rating')

    # ### end Alembic commands ###
