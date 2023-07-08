"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SelectField
from wtforms.validators import InputRequired, Optional,  URL, NumberRange

sizes = [("mini", "Miniature"), ("small", "Small"), ("medium", "Medium"), ("large", "Large")]

class addCupcakeForm(FlaskForm):
    """Form for adding Cupcakes"""

    flavor = StringField("What flavor is it?", validators = [InputRequired()], render_kw={"placeholder" : "Enter flavor"})
    size = SelectField("What is the size?", validators = [InputRequired()], choices=sizes, render_kw={"placeholder" : "Enter cupcake size"})
    rating = DecimalField("How would you rate the cupcake?", validators = [InputRequired(), NumberRange(0,10)], render_kw={"placeholder" : "Rate from 0-10"})
    image = StringField("Image URL for cupcale", validators = [Optional(), URL()], render_kw={"placeholder" : "Enter an image URL (Optional)"})