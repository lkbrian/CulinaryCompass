from models import User, Recipe, Ingredient, Rating,recipe_ingredient
from config import app, db
from faker import Faker
from data import recipes_info
from random import choice,randint

fake =Faker()

with app.app_context():
    print("Deleting tables")
    db.session.query(recipe_ingredient).delete()
    db.session.commit()
    User.query.delete()
    Ingredient.query.delete()
    Recipe.query.delete()
    Rating.query.delete()

    print("creating users")
    all_users =[]
    for _ in range(10):
        user= User(username=fake.first_name(), email=fake.email(),bio=fake.paragraph(), img_url=fake.image_url())
        user.password_hash=fake.password()
        all_users.append(user)


    # Create sample recipes
    print("creating recipes")
    all_recipes=[]
    all_ingredients = []

    ingredients_set = []
    for ing in recipes_info:
        if ing not in ingredients_set:
            ingredients_set.append(ing['ingredients'])

    for recipe_info in recipes_info:
        instructions_text = "\n".join(recipe_info['instructions'])
        random_user = choice(all_users)
        recipe = Recipe(title=recipe_info['name'], description=recipe_info['description'],
                        instructions=instructions_text, cook_time=recipe_info['cook_time'], user=random_user)
        all_recipes.append(recipe)
        
    print("creating ingredients")
    for ingredient_name in ingredients_set:
        ingredient = next((ing for ing in all_ingredients if ing.name == ingredient_name), None)
        if not ingredient:
            ingredient = Ingredient(name=ingredient_name, quantity='None')
            all_ingredients.append(ingredient)
        recipe.ingredients.append(ingredient)


    # for recipe in all_recipes:
    #     for ingredient in all_ingredients:
    #         if ingredient not in recipe_info['ingredients']:
    #             # print("# Associate the ingredient with the current recipe")
    #             recipe.ingredients.append(ingredient)
    #             # print("# Associate the recipe with the current ingredient")
    #             # ingredient.recipes.append(recipe)

    # Create sample ratings
    all_ratings=[]
    for _ in range(8):
        random_user=choice(all_users)
        random_recipe=choice(all_recipes)
        value=randint(0,5)
        rating = Rating(message=fake.paragraph(),rating_value=value,user=random_user,recipe=random_recipe)

    # Add objects to the session and commit
    db.session.add_all(all_recipes)
    db.session.add_all(all_users)
    db.session.add_all(all_ingredients)
    db.session.add_all(all_ratings)
    db.session.commit()
# print(recipes_info)
    # # Assign ingredients to recipes
    # recipe1.ingredients.append(ingredient1)
    # recipe1.ingredients.append(ingredient2)
    # recipe2.ingredients.append(ingredient1)