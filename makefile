installations:
	cd client && npm install
	cd server && pip install -r requirements.txt && pip install --upgrade pip

react:
	cd client && npm run dev
	

flask:
	cd server && python app.py


database:
	cd server && flask db init && flask db migrate -m "initial migration" && flask db upgrade && python seed.py


app:
	honcho start -f Procfile.dev