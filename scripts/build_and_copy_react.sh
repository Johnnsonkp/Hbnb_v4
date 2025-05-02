#!/bin/bash

# Navigate to the frontend folder
cd frontend || exit

# Install dependencies if not already installed
npm install

# Build the React app
npm run build

# Navigate back to the root
cd ..

# Copy the build output to the Flask static directory
# rm -rf app/static/react
# mkdir -p app/static/react

rm -rf app/base_files/static/react/
mkdir -p app/base_files/static/react/
# cp -r frontend/dist/* app/static/react/
cp -r frontend/dist/* app/base_files/static/react/

echo "React build copied to Flask static directory."
