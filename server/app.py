#!/usr/bin/env python3
from flask import request, session,redirect,jsonify,make_response
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
        username = request.get_json().get('username')
        email = request.get_json().get('email')
        password = request.get_json().get('password')

        if username and email and password and not User.query.filter_by(username=username).first():
            new_user = User(
                username = username,
                email = email
            )
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(),201
        
class Check_session(Resource):
    def get(self):
        
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 401    
    
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return {'error': 'Username and password are required'}, 400
        user = User.query.filter_by(username=username).first()
        if not user or not user.authenticate(password):
            return {'error': 'Invalid username or password'}, 401
        session['user_id'] = user.id
        return {'success': 'Logged in successfully', 'user': user.to_dict()}, 200
    
class Logout(Resource):
    def logout(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {},204
        return {"Error":"Unauthorized"},401




class Recipes(Resource):
    def get(self):
        recipe = [recipe.to_dict() for recipe in Recipe.query.all()]
        response = make_response(
            jsonify(recipe)
             ,200)
        return response
    
    def post(self):
        title = request.get_json()['title']
        cook_time = request.get_json()['cook_time']
        description = request.get_json()['description']
        instructions = request.get_json()['instructions']
        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            recipe = Recipe(title=title, description=description, instructions=instructions,
                            cook_time=cook_time, user=user)
            db.session.add(recipe)
            db.session.commit()
        return {'error': '401 Unauthorized'}, 422

class Favourite(Resource):
    def get(self):
        favourite_recipe = Recipe.query.filter(Recipe.favorite == True).all()
        recipe_data  = [recipe.to_dict() for recipe in favourite_recipe]
        response = make_response(jsonify(recipe_data),200)
        return response 
    pass
class FavouriteByID(Resource):
    def get(self,id):
        favourite_recipes = Recipe.query.filter(Recipe.favorite == True).all()
        if not favourite_recipes:
                return {'Error': f'Recipe {id} not found'}, 404
        favourite_data = [recipe.to_dict() for recipe in favourite_recipes]
        response = make_response(jsonify(favourite_data), 200)
        return response


    
class Collection(Resource):
    def get(self):
        collection_recipe = Recipe.query.filter(Recipe.collection == True).all()
        recipe_data = [recipe.to_dict() for recipe in collection_recipe]
        response = make_response(jsonify(recipe_data),200)
        return response
       
class CollectionByID(Resource):
    def get(self,id):
        collection_recipes = Recipe.query.filter(Recipe.collection == False).all()
        if not collection_recipes:
            return {'message': f'No recipe {id} found for this collection'}, 404

        recipes_data = [recipe.to_dict() for recipe in collection_recipes]
        response = make_response(jsonify(recipes_data),200)
        return response

class RecipeByID(Resource):
    def get(self,id):
        recipe = Recipe.query.filter(Recipe.id == id).first()
        if not recipe:
            response = make_response(jsonify({'Error':'Recipe {id} is not found'},404))
            return response
        response = make_response(jsonify(recipe.to_dict()),200)
        return response
    
    def patch(self, id):
        try:
            recipe = Recipe.query.filter(Recipe.id == id).first()
            if not recipe:
                return {'error': f'Recipe {id} is not found'}, 404

            favorite = request.json.get('favorite')
            if favorite is not None:
                setattr(recipe, 'favorite', favorite)

            collection = request.json.get('collection')
            if collection is not None:
                setattr(recipe, 'collection', collection)

            db.session.commit()

            return {'message': 'Recipe status updated successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

    def delete(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return {"Error": f'Recipe {id} not found'}, 404
        db.session.delete(recipe)
        db.session.commit()
        return {'message': 'Recipe deleted'}, 204


api.add_resource(Home, "/")
api.add_resource(Check_session,'/check_session',endpoint='check_session')
api.add_resource(SignUp, "/signup", endpoint="signup")
api.add_resource(Login,"/login",endpoint="login")
api.add_resource(Logout,"/logout",endpoint="logout")
api.add_resource(Recipes,'/recipes',endpoint ='recipes')
api.add_resource(Favourite, '/favourites', endpoint='favourite')
api.add_resource(FavouriteByID, '/favourites/<int:id>', endpoint='favourite_by_id')
api.add_resource(Collection, '/collections', endpoint='collection')
api.add_resource(CollectionByID, '/collections/<int:id>',endpoint='collectionById')
api.add_resource(RecipeByID, '/recipes/<int:id>', endpoint='recipeByID')


if __name__ == '__main__':
    app.run(port=5555,debug=True)
