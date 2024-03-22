echo "Building Frontend"
cd frontend
npm install && npm run build
echo "Serving Backend"
cd ..
go run main.go
