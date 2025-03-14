#!/bin/bash

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env file. Please edit it with your credentials."
else
  echo ".env file already exists."
fi

# Sync environment variables
./sync-env.sh

# Install dependencies
echo "Installing backend dependencies..."
cd backend && pip install -r requirements.txt
cd ..

echo "Installing frontend dependencies..."
cd frontend && pnpm install
cd ..

echo
echo "Development setup complete!"
echo