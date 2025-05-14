#!/bin/bash

PORT=5173

# Step 1: Kill process on port 5173 if it exists
PID=$(lsof -ti tcp:$PORT)

if [ -n "$PID" ]; then
  echo "Killing process on port $PORT (PID: $PID)..."
  kill -9 $PID
  echo "Process killed."
else
  echo "No process is running on port $PORT."
fi

# Step 2: Start the React frontend app
echo "Starting React app in ./frontend..."

cd ./frontend || {
  echo "Failed to navigate to ./frontend"
  exit 1
}

npm run dev