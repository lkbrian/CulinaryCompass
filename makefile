frontend:
	cd client && npm install

backend:
	cd server && pip install -r requirements.txt

react:
	cd client && npm run dev

flask:
	cd server && python app.py

migrations:
	pass

database:
	cd server && python seed.py