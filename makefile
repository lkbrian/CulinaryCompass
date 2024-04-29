installations:
	cd server && pip install -r requirements.txt && pip install --upgrade pip
	cd client && npm install && npm run build

react:
	cd client && npm run dev
	

flask:
	cd server && python app.py


database:
	cd server && flask db init && flask db migrate -m "initial migration" && flask db upgrade && python seed.py


app:
	gunicorn --chdir server app:app