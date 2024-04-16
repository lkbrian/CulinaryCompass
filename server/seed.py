from models import User, Recipe, Ingredient, Rating, recipe_ingredient
from config import app, db
from faker import Faker
from data import recipes_info
from random import choice, randint
from sqlalchemy.exc import IntegrityError

fake = Faker()

with app.app_context():
    print("Deleting tables")
    db.session.query(recipe_ingredient).delete()
    db.session.commit()
    User.query.delete()
    Ingredient.query.delete()
    Recipe.query.delete()
    Rating.query.delete()

    print("creating users")
    all_users = []
    for _ in range(10):
          while True:
               try:
                    username = fake.first_name()
                    user = User(username=username, email=fake.email(),
                                bio=fake.paragraph(), img_url=fake.image_url())
                    user.password_hash = fake.password()
                    all_users.append(user)
                    break
               except IntegrityError:
                    continue

    # Create sample recipes
    print("creating ingredients")

    # Collect all unique ingredients from the recipes
    ingredient_set = set()
    for recipe_info in recipes_info:
        ingredients = recipe_info['ingredients']
        ingredient_set.update(ingredients)

    # Create Ingredient instances and add them to the database
    all_ingredients = []
    for ingredient_name in ingredient_set:
        ingredient = Ingredient(name=ingredient_name, quantity='None')
        all_ingredients.append(ingredient)

    all_recipes = []
    print("create recipe")
    print("Associating ingredients with recipes")
    for recipe_info in recipes_info:
        name = recipe_info['name']
        description = recipe_info['description']
        instructions = "\n".join(recipe_info['instructions'])
        cook_time = recipe_info['cook_time']

        # Create Recipe instance
        random_user = choice(all_users)
        recipe = Recipe(title=name, description=description, instructions=instructions,
                        cook_time=cook_time, user=random_user)
        all_recipes.append(recipe)

        # Associate ingredients with the current recipe
        for ingredient, recipe_info in zip(all_ingredients, recipes_info):
            recipe_ingredients = recipe_info['ingredients']
            if ingredient not in recipe_ingredients:
                  recipe.ingredients.append(ingredient)

    # Create sample ratings
    print("Creating rates")
    all_ratings = []
    for _ in range(8):
        random_user = choice(all_users)
        random_recipe = choice(all_recipes)
        value = randint(0, 5)
        rating = Rating(message=fake.paragraph(), rating_value=value, user=random_user,recipe=random_recipe)

    # Add objects to the session and commit
    print("Seeding database")
    db.session.add_all(all_recipes)
    db.session.add_all(all_users)
    db.session.add_all(all_ingredients)
    db.session.add_all(all_ratings)
    db.session.commit()
print("Succesful seeding")
