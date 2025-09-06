#!/bin/bash

echo "Starting Patient Management System..."
echo

echo "Starting Backend Server..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!

echo
echo "Waiting for backend to start..."
sleep 5

echo "Starting Frontend Server..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo
echo "Press Ctrl+C to stop both servers"

# Function to cleanup processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

# Trap Ctrl+C
trap cleanup INT

# Wait for processes
wait
