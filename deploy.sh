#!/bin/bash

# Exit on error
set -e

echo "Building and deploying AI Outreach application..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Please create one based on .env.example"
  exit 1
fi

# Build and start containers
echo "Building Docker containers..."
docker-compose build

echo "Starting services..."
docker-compose up -d

echo "Waiting for services to start..."
sleep 5

echo "Creating database tables if they don't exist..."
docker-compose exec backend python -c "from app.database import Base, engine; from app.models import prospect, engagement; Base.metadata.create_all(bind=engine)"

echo "Deployment complete! Services are running at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- API Documentation: http://localhost:8000/docs"

echo "You can view logs with: docker-compose logs -f"
