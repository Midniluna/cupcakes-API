"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy
import sys

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)
    with app.app_context():
        db.create_all()

def get_database_uri():
    if "python3 -m unittest" in sys.argv:
        return 'postgresql:///flask_cupcakes_test'
    return 'postgresql:///flask_cupcakes'

def get_echo_TorF():
    if "python3 -m unittest" in sys.argv:
        return False
    return True


class Cupcake(db.Model):
    """Cupcake"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=True, default="https://tinyurl.com/demo-cupcake")

    def serialize(self):
        return {
            "id" : self.id,
            "flavor" : self.flavor,
            "size" : self.size,
            "rating" : self.rating,
            "image" : self.image
    }

