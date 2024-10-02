#!/bin/bash

# Define the directories for the frontend and backend
FRONTEND_DIR="D:\Projects\medicine\frontend"  # Adjust this to the path of your React project
BACKEND_DIR="D:\Projects\medicine\backend"    # Adjust this to the path of your Node.js project

# Function to run the frontend
run_frontend() {
  echo "Starting the frontend..."
  cd $FRONTEND_DIR
  npm install  # Ensure dependencies are installed
  npm run dev    # Run the React development server
}

# Function to run the backend
run_backend() {
  echo "Starting the backend..."
  cd $BACKEND_DIR
  npm install  # Ensure dependencies are installed
  node index.js    # Run the Node.js server
}

# Trap SIGINT (Ctrl+C) and stop both processes
trap 'echo "Stopping processes..."; kill 0' SIGINT

# Run both frontend and backend in parallel
run_frontend &
run_backend &

# Wait for both processes to finish
wait
