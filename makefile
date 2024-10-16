.PHONY: check backend frontend

run: backend frontend

backend:
	gnome-terminal -- bash -c "cd ./express && npm install && node index.js; exec bash"

frontend:
	gnome-terminal -- bash -c "cd ./react && npm install && npm start; exec bash"
