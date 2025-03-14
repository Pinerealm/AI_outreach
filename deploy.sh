#!/bin/bash

# Exit on error
set -e

echo "Building and deploying AI Outreach application..."

# Determine environment
if [ -z "$NODE_ENV" ]; then
  export NODE_ENV=development
fi

echo "Deploying for environment: $NODE_ENV"

# Sync environment variables
./sync-env.sh

# Build and start containers
echo "Building Docker containers..."
docker-compose build

echo "Starting services..."
docker-compose up -d

echo "Deployment complete!"
