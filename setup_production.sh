#!/bin/bash

# Exit on error
set -e

echo "Setting up AI Outreach for production..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  echo "OPENAI_API_KEY=" > .env
  echo "EMAIL_SERVICE_API_KEY=" >> .env
  echo "ENVIRONMENT=production" >> .env
  echo "DATABASE_URL=postgresql://postgres:postgres@db:5432/ai_outreach" >> .env
  
  echo ".env file created. Please edit it to add your API keys."
else
  echo ".env file already exists."
fi

# Ensure directories have proper permissions
echo "Setting directory permissions..."
chmod -R 755 backend
chmod -R 755 frontend

# Create data directory for persistent storage if needed
if [ ! -d "./data" ]; then
  echo "Creating data directory..."
  mkdir -p ./data/postgres
fi

echo "Setup complete! Now run ./deploy.sh to deploy the application."
