from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt, metadata

recipe_ingredient = db.Table(
    "recipe_ingredient",
    metadata,
    db.Column("recipe_id", db.Integer, db.ForeignKey("recipes.id"), primary_key=True),
    db.Column(
        "ingredient_id", db.Integer, db.ForeignKey("ingredients.id"), primary_key=True
    ),
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    serialize_only = ("id", "username","email","bio", "img_url")
    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)  # Changed to String
    bio = db.Column(db.String)
    img_url = db.Column(db.String)

    # Relationships
    recipes = db.relationship("Recipe", back_populates="user")
    ratings = db.relationship(
        "Rating", back_populates="user", cascade="all,delete-orphan"
    )
    # Association proxy btn users and recipe via ratings
    favorite_recipes = association_proxy(
        "ratings", "recipe", creator=lambda recipe_obj: Rating(recipe=recipe_obj)
    )
    # serializers

    def __repr__(self):
        return f"ID {self.id},Username {self.username}"

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password inaccessible")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))




class Recipe(db.Model, SerializerMixin):
    __tablename__ = "recipes"
    serialize_rules = ("-ratings.recipe",)
    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    instructions = db.Column(db.String, nullable=False)
    cook_time = db.Column(db.Integer)
    favorite = db.Column(db.Boolean, default=False)
    collection = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    img_url = db.Column(db.String)

    # Relationships
    user = db.relationship("User", back_populates="recipes")
    ingredients = db.relationship(
        "Ingredient", secondary=recipe_ingredient, back_populates="recipes"
    )
    ratings = db.relationship(
        "Rating", back_populates="recipe", cascade="all,delete-orphan"
    )
    # Association proxy btn recipes and users via ratings
    users = association_proxy(
        "ratings", "user", creator=lambda user_obj: Rating(user=user_obj)
    )
    # serializers

    def __repr__(self):
        pass


class Ingredient(db.Model, SerializerMixin):
    __tablename__ = "ingredients"
    serialize_only = ("id", "name")

    # Table columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.String, nullable=False)
    # Relationships
    recipes = db.relationship(
        "Recipe", secondary=recipe_ingredient, back_populates="ingredients"
    )

    def __repr__(self):
        pass


class Rating(db.Model, SerializerMixin):
    __tablename__ = "ratings"
    serialize_rules = ("-user.ratings", "-recipe.ratings")
    # Table Columns
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String)
    # Changed the column name to rating_value
    rating_value = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    # Relationships
    user = db.relationship("User", back_populates="ratings")
    recipe = db.relationship("Recipe", back_populates="ratings")

    # serializers

    def __repr__(self):
        pass
