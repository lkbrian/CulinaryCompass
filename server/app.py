#!/usr/bin/env python3
from flask import request, session,jsonify,make_response
from flask_restful import Resource
from config import app, db, api
from models import Ingredient, User, Recipe


@app.before_request
def check_if_logged_in():
    access = [
        "signup",
        "login",
        "check_session",
        "recipes",
        "logout",
        "favourites",
        "favourite_by_id",
        "users",
        "collections",
        "collectionById",
        "logout",
    ]

    if (request.endpoint) not in access and (not session.get("user_id")):
        return {"error": "401 Unauthorized"}, 401


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
        
        user_id = session.get('user_id')
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
    def delete(self):
        session['user_id']=None
        return {},204

class Recipes(Resource):
    def get(self):
        recipe = [recipe.to_dict() for recipe in Recipe.query.all()]
        response = make_response(
            jsonify(recipe),200)
        return response
    
    def post(self):
        title = request.get_json()['title']
        cook_time = request.get_json()['cook_time']
        description = request.get_json()['description']
        instructions = request.get_json()['instructions']
        image = request.get_json()['img_url']
        user = User.query.filter(User.id == session['user_id']).first()
        if user:
            recipe = Recipe(title=title, description=description, instructions=instructions,
                            cook_time=cook_time, img_url=image,user=user)
            db.session.add(recipe)
            
            ingredients = request.get_json()['ingredients']

            for ingredient in ingredients.split('\n'):
                ingredient_name = ingredient.strip()  
                if ingredient_name:
                    ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
                    if not ingredient:
                        ingredient = Ingredient(name=ingredient_name, quantity='None')
                        db.session.add(ingredient)
                    recipe.ingredients.append(ingredient)

            db.session.commit()            
            return make_response(recipe.to_dict(),201)


class Favourite(Resource):
    def get(self):
        favourite_recipe = Recipe.query.filter(Recipe.favorite == True).all()  # noqa: E712
        recipe_data  = [recipe.to_dict() for recipe in favourite_recipe]
        response = make_response(jsonify(recipe_data),200)
        return response 
    pass
class FavouriteByID(Resource):
    def get(self,id):
        favourite_recipes = Recipe.query.filter(Recipe.favorite == True).all()  # noqa: E712
        if not favourite_recipes:
                return {'Error': f'Recipe {id} not found'}, 404
        favourite_data = [recipe.to_dict() for recipe in favourite_recipes]
        response = make_response(jsonify(favourite_data), 200)
        return response


class Collection(Resource):
    def get(self):
        collection_recipe = Recipe.query.filter(Recipe.collection == True).all()  # noqa: E712
        recipe_data = [recipe.to_dict() for recipe in collection_recipe]
        response = make_response(jsonify(recipe_data),200)
        return response

class CollectionByID(Resource):
    def get(self,id):
        collection_recipes = Recipe.query.filter(Recipe.collection == False).all()  # noqa: E712
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

        return {'message':'Recipe deleted'},204


class UpdateUser(Resource):
    def patch(self, id):
        try:
            user = User.query.filter(User.id == id).first()
            if not user:
                print('user not found',)
                return {'error': f'user {id} is not found'}, 404

            data = request.json
            for key, value in data.items():
                setattr(user, key, value)
            db.session.commit()
            return {'message': 'User profile updated successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
        
    def delete(self, id):
        try:
            user = User.query.filter(User.id == id).first()
            if not user:
                return {'error': f'user {id} is not found'}, 404

            # Delete the user from the database
            db.session.delete(user)
            db.session.commit()

            return {'message': 'User deleted successfully'}, 204
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500


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
api.add_resource(UpdateUser, '/users/<int:id>', endpoint='UpdateUser')

#
if __name__ == '__main__':
    app.run(port=5555,debug=True)
