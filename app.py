"""Flask app for Cupcakes"""
from flask import Flask, request, render_template, flash, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, get_database_uri, get_echo_TorF, Cupcake
from IPython import embed

from forms import addCupcakeForm, updateCupcakeForm

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = get_database_uri()
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = get_echo_TorF()

app.config["SECRET_KEY"] = "so-key such-secret"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

debug = DebugToolbarExtension(app)

connect_db(app)


# id flavor size rating image


@app.route('/')
def index_page():
    """Renders html template that populates homepage with existing cupcakes"""

    cupcakes = Cupcake.query.all()
    form = addCupcakeForm()
    formid = 'id=new-cupcake-form'
    return render_template('homepage.html', cupcakes = cupcakes, form = form, formid = formid)


@app.route('/cupcakes/<int:id>')
def view_cupcake(id):
    """Renders page for individual cupcake"""

    cupcake = Cupcake.query.get_or_404(id)
    form = updateCupcakeForm()
    formid = 'id=update-cupcake-form'
    return render_template('view-cupcake.html', cupcake = cupcake, form = form, formid = formid)

@app.route('/api/cupcakes')
def get_cupcakes():
    """Return JSON with all cupcakes"""
    
    all_cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in all_cupcakes]

    return jsonify(cupcakes = serialized)

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    """Add a new cupcake to the database."""

    rating = request.json["rating"]
    size = request.json["size"]
    flavor = request.json["flavor"]
    image = request.json["image"]
    if image == "":
        image = None
    
    new_cupcake = Cupcake(rating = rating, size = size, flavor = flavor, image = image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()
    return (jsonify(cupcake = serialized), 201)

    # id rating size flavor image

@app.route('/api/cupcakes/<int:id>')
def get_cupcake(id):
    """Return JSON with data about one cupcake"""

    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake = cupcake.serialize())

# Neeed to see something

@app.route('/api/cupcakes/<int:id>', methods=["PATCH"])
def patch_cupcake(id):
    """Return JSON of newly updated cupcake"""

    cupcake = Cupcake.query.get_or_404(id)

    # Probably a way to better iterate over each piece of data
    # Anyways, only update if the data isn't blank
    if (request.json["rating"] != ""):
        cupcake.rating = request.json["rating"]
    if (request.json["size"] != ""):
        cupcake.size = request.json["size"]
    if (request.json["flavor"] != ""):
        cupcake.flavor = request.json["flavor"]
    if (request.json["image"] != ""):
        cupcake.image = request.json["image"]

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake = cupcake.serialize())

    
@app.route('/api/cupcakes/<int:id>', methods=["DELETE"])
def delete_cupcake(id):
    """Remove cupcake from database"""

    cupcake = Cupcake.query.get_or_404(id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="Deleted")
    
    