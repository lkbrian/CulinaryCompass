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

                user = User(
                    username=username,
                    email=fake.email(),
                    bio=fake.paragraph(),
                    img_url=fake.image_url(),
                )
                user.password_hash = "password"

                all_users.append(user)
                break
            except IntegrityError:
                continue

    # Create sample recipes
    print("creating ingredients")

    # Collect all unique ingredients from the recipes
    ingredient_set = set()
    for recipe_info in recipes_info:
        ingredients = recipe_info["ingredients"]
        ingredient_set.update(ingredients)

    # Create Ingredient instances and add them to the database
    all_ingredients = []
    for ingredient_name in ingredient_set:
        ingredient = Ingredient(name=ingredient_name, quantity="None")
        all_ingredients.append(ingredient)
    
    db.session.add_all(all_ingredients)
    db.session.commit()

    all_recipes = []
    print("create recipe")
    
    for recipe_info in recipes_info:
        name = recipe_info["name"]
        description = recipe_info["description"]
        instructions = "\n".join(recipe_info["instructions"])
        cook_time = recipe_info["cook_time"]
        img_url = recipe_info["img_url"]

        # Create Recipe instance
        random_user = choice(all_users)
        recipe = Recipe(
            title=name,
            description=description,
            instructions=instructions,
            cook_time=cook_time,
            img_url=img_url,
            user=random_user,
        )
        all_recipes.append(recipe)
    db.session.add_all(all_recipes)
    db.session.commit()

    print("Associating ingredients with recipes")
    # Associate ingredients with the current recipe
    all_db_ingredients = Ingredient.query.all()

    # Create a dictionary to map ingredient names to their corresponding database objects
    ingredient_map = {ingredient.name: ingredient for ingredient in all_db_ingredients}

    # Link recipes with their respective ingredients
    for recipe_info in recipes_info:
        recipe_name = recipe_info["name"]
        recipe = Recipe.query.filter_by(title=recipe_name).first()
        if recipe:
            ingredients = recipe_info["ingredients"]
            for ingredient_name in ingredients:
                ingredient = ingredient_map.get(ingredient_name)
                if ingredient:
                    recipe.ingredients.append(ingredient)

# Commit the changes to the database

    # Create sample ratings
    print("Creating rates")
    all_ratings = []
    for _ in range(8):
        random_user = choice(all_users)
        random_recipe = choice(all_recipes)
        value = randint(1, 5)
        rating = Rating(
            message=fake.paragraph(nb_sentences=4),
            rating_value=value,
            user=random_user,
            recipe=random_recipe,
        )
        all_ratings.append(rating)

    # Add objects to the session and commit
    print("Seeding database")
    db.session.add_all(all_users)
    db.session.add_all(all_ratings)
    db.session.commit()
print("Succesful seeding")
