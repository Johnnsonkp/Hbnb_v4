#!/bin/bash

PORT=5000

# Step 1: Kill process on port 5173 if it exists
PID=$(lsof -ti tcp:$PORT)

if [ -n "$PID" ]; then
  echo "Killing process on port $PORT (PID: $PID)..."
  kill -9 $PID
  echo "Process killed."
else
  echo "No process is running on port $PORT."
fi

# Start MySQL using Homebrew
echo "Starting MySQL..."
brew services start mysql

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Optional: Install requirements (uncomment if needed)
# echo "Installing requirements..."
# pip install -r requirements.txt

# Run the Flask application
echo "Running Flask application..."
python run.py
