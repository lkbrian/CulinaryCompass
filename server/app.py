#!/usr/bin/env python3
from flask import request, session,redirect,jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Recipe
from werkzeug.security import generate_password_hash


class Home(Resource):
    def get(self):
        return 'Hello World!'


class SignUp(Resource):
    def post(self):
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')

        if not (username and email and password):
            return jsonify({'error': 'Missing required fields'}), 400

        hashed_password = generate_password_hash(password)

        new_user = User(username=username, email=email,
                        password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return redirect("/")    
class Login(Resource):#Brian
    def post(self):
                
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()

        if user.authenticate(password):

            session['user_id'] = user.id
            return user.to_dict(), 201

        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):#Allen
    def logout(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {},204
        return {"Error":"Unauthorized"},401

class Check_session(Resource):#Collins
    def get(self):
        
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 401    
class Create_recipes(Resource):#Brian
    def post(self):
        title = request.get_json()['title']
        cook_time = request.get_json()['cook_time']
        description = request.get_json()['description']
        instructions = request.get_json()['instructions']
        user = User.query.filter(User.id == 4).first() #session['user_id']
        # if  user:
        recipe = Recipe(title=title, description=description, instructions=instructions,
            cook_time=cook_time, user=user)
        db.session.add(recipe)
        db.session.commit()
        # return {'error': '401 Unauthorized'}, 422
class Recipes(Resource):#Allen
    pass
class Favourite(Resource):#Collins
    pass
class FavouriteByID(Resource):#Collins
    pass
class Collection(Resource):#Collins
    pass
class CollectionByID(Resource):#Brian
    pass
class RecipeByID(Resource):#Allen
    pass

api.add_resource(Home, "/")
api.add_resource(SignUp, "/signup", endpoint="signup")
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
