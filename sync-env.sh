#!/bin/bash

# Exit on error
set -e

NODE_ENV=""

# If NODE_ENV is provided, use it
if [ -n "$1" ]; then
  NODE_ENV=$1
fi

echo "Synchronizing environment variables..."

# Ensure .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file does not exist"
  exit 1
fi

# Copy main .env to backend
echo "Copying environment variables to backend..."
grep -v "^NEXT_PUBLIC_" .env > backend/.env

# Create frontend env file with only NEXT_PUBLIC_ variables
echo "Creating frontend environment variables..."
grep "^NEXT_PUBLIC_" .env > frontend/.env

# If environment-specific file exists, append its contents
if [ -n "$NODE_ENV" ] && [ -f ".env.$NODE_ENV" ]; then
  echo "Applying $NODE_ENV environment variables..."
  grep "^NEXT_PUBLIC_" .env.$NODE_ENV >> frontend/.env
  cat .env.$NODE_ENV >> backend/.env
fi

echo "Environment variables synchronized successfully!"
