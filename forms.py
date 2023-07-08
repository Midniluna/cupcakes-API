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


# I really wanted to just reuse the other form since it's basically the same thing but I had so much trouble trying to navigate around the input required stuff that I just decided to give it a rest for now and try again later.
class updateCupcakeForm(FlaskForm):
    """Form for updating Cupcakes"""

    flavor = StringField("What flavor is it?", validators = [Optional()], render_kw={"placeholder" : "Enter flavor"})
    size = SelectField("What is the size?", validators = [Optional()], choices=sizes, render_kw={"placeholder" : "Enter cupcake size"})
    rating = DecimalField("How would you rate the cupcake?", validators = [Optional(), NumberRange(0,10)], render_kw={"placeholder" : "Rate from 0-10"})
    image = StringField("Image URL for cupcale", validators = [Optional(), URL()], render_kw={"placeholder" : "Enter an image URL (Optional)"})