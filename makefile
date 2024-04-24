frontend:
	cd client && npm install

backend:
	cd server && pip install -r requirements.txt && pip install --upgrade pip

react:
	cd client && npm run dev

flask:
	cd server && python app.py



database:
	cd server && flask db init && flask db migrate -m "initial migration" && flask db upgrade && python seed.py

dev:
	cd client && npm install
	cd server && pip install -r requirements.txt && pip install --upgrade pip


app:
	honcho start -f Procfile.dev