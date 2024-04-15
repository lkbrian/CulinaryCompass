from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt,metadata

recipe_ingredient = db.Table('recipe_ingredient',metadata,
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipes.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredients.id'), primary_key=True)
)

class User(db.Model,SerializerMixin):
    __tablename__ = "users"
    #Table columns
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String,unique=True,nullable=False)
    email = db.Column(db.String,unique=True,nullable=False)
    _password_hash = db.Column(db.Integer,nullable=False)
    bio = db.Column(db.String)
    img_url=db.Column(db.String)

    #Relatioships
    recipes = db.relationship('User',back_populates="recipes")
    ratings=db.relationship('Rating',back_populates='user',cascade='all,delete-orphan')
    #association proxy btn users and recipe via ratings
    recipes=association_proxy('ratings','recipe',creator=lambda recipe_obj: Rating(recipe=recipe_obj))
    #serializers
    serialize_rules =('-ratings.user','-recipes.user')

    def __repr__(self):
        return f"ID {self.id},Username {self.username}"

    @hybrid_property
    def password_hash(self):
            raise AttributeError("password inaccesible")
    
    @password_hash.setter
    def password_hash(self,password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash=password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
    


class Recipe(db.Model,SerializerMixin):
    __tablename__ = "recipes"

    #Table columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String,nullable=False)
    description = db.Column(db.String)
    instructions = db.Column(db.String, nullable=False)
    cook_time = db.Column(db.Integer)
    favourite =db.Column(db.Boolean,default=False)
    collection=db.Column(db.Boolean,default=False)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    #Relationships
    user = db.relationship('Recipe',back_populates='user')
    ingredients = db.relationship('Ingredients',secondary=recipe_ingredient,back_populates='recipes')
    ratings=db.relationship('Rating',back_populates='recipe',cascade='all,delete-orphan')
    #association proxy btn recipes and users via ratings
    users = association_proxy('ratings','user',creator=lambda user_obj: Rating(user=user_obj))
    #serializers
    serialize_rules =('-ratings.recipe',)

    def __repr__(self):
        pass


class Ingredient(db.Model,SerializerMixin):
    __tablename__ = "ingredients"
    
    #Table columns
    id = db.Column(db.Integer,primary_key=True)
    name= db.Column(db.String,nullable=False)
    quantity = db.Column(db.String,nullable=False)
    #Relationships
    recipes = db.relationship('recipes',secondary=recipe_ingredient,back_populates='ingredients')

    def __repr__(self):
        pass

class Rating(db.Model,SerializerMixin):
    __tablename__ = "ratings"

    #Table Columns
    id = db.Column(db.Integer,primary_key=True)
    message = db.Column(db.String)
    Rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer,db.ForeignKey('recipes.id'))
    #Relationships
    user = db.relationship("User",back_populates='ratings')
    recipe = db.relationship("Recipe",back_populates='ratings')

    #serializers
    serialize_rules =('-user.ratings','-recipe.ratings')

    def __repr__(self):
        pass
