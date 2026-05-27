#!/bin/bash
set -e

psql "$DATABASE_URL" -f /app/database/init.sql
