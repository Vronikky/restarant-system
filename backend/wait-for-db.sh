#!/bin/sh
until pg_isready -h db -U restaurant -d restaurant_db; do
  echo "Waiting for database..."
  sleep 2
done
echo "Database is ready!"