from models import User, Recipe, Ingredient, Rating,recipe_ingredient
from config import app, db
from faker import Faker

fake =Faker()

with app.app_context():

    db.session.query(recipe_ingredient).delete()
    db.session.commit()
    User.query.delete()
    Ingredient.query.delete()
    Recipe.query.delete()
    Rating.query.delete()
  
    # Create sample users
    user1 = User(username=fake.first_name(), email=fake.email(),
                 bio='Rice to meet you', img_url='sample_url_1')
    user1.password_hash = fake.password()  
    user2 = User(username=fake.first_name(), email=fake.email(),
                 bio='Have an egg-cellent day!', img_url='sample_url_2')
    user2.password_hash =fake.password()

    # Create sample recipes
    recipe1 = Recipe(title='Recipe 1', description='Sample recipe 1 description',
                     instructions='Sample instructions for recipe 1', cook_time=30, user=user1)
    recipe2 = Recipe(title='Recipe 2', description='Sample recipe 2 description',
                     instructions='Sample instructions for recipe 2', cook_time=45, user=user2)

    # Create sample ingredients
    ingredient1 = Ingredient(name='Ingredient 1', quantity='100g')
    ingredient2 = Ingredient(name='Ingredient 2', quantity='2 cups')

    # Assign ingredients to recipes
    recipe1.ingredients.append(ingredient1)
    recipe1.ingredients.append(ingredient2)
    recipe2.ingredients.append(ingredient1)

    # Create sample ratings
    rating1 = Rating(message='Great recipe!', rating_value=5,
                     user=user1, recipe=recipe1)
    rating2 = Rating(message='Could be better', rating_value=3,
                     user=user2, recipe=recipe1)
    rating3 = Rating(message='Delicious!', rating_value=4,
                     user=user1, recipe=recipe2)

    # Add objects to the session and commit
    db.session.add_all([user1, user2, recipe1, recipe2,
                       ingredient1, ingredient2, rating1, rating2, rating3])
    db.session.commit()
