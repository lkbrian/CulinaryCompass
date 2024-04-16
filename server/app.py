#!/usr/bin/env python3
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Recipe


class Home(Resource):
    def get(self):
        return 'Hello, World!!'
    
class Login(Resource):#Brian
    pass
class Logout(Resource):#Allen
    pass
class Check_session(Resource):#Collins
    pass
class Create_recipes(Resource):#Brian
    pass
class Recipes(Resource):#Allen
    pass
class Favourite(Resource):#Collins
    pass
class Collection(Resource):#Brian
    pass
class RecipeByID(Resource):#Allen
    pass

api.add_resource(Home, "/")
api.add_resource(Login,"/login",endpoint="login")
api.add_resource(Logout,"/logout",endpoint="logout")
api.add_resource(Check_session,'/check_session',endpoint='check_session')
api.add_resource(Create_recipes,'/create_recipes',endpoint = 'create_recipes')
api.add_resource(Recipes,'/recipes',endpoint ='recipes')
api.add_resource(Favourite,'/favourite',endpoint = 'favourite')
api.add_resource(Collection,'/collection', endpoint='collection')
api.add_resource(RecipeByID,'/recipeByID',endpoint = 'recipeByID')

if __name__ == '__main__':
    app.run(port=5555,debug=True)
