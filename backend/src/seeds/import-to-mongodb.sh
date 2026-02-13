#!/bin/bash

# MongoDB Import Script für CSS Insurance Platform
#
# Dieses Script importiert die Testdaten direkt in MongoDB
#
# Voraussetzungen:
#   - MongoDB muss laufen
#   - mongoimport muss installiert sein
#
# Verwendung:
#   ./import-to-mongodb.sh
#   ./import-to-mongodb.sh mongodb://localhost:27017/insurance

# MongoDB Connection String (Standard oder als Parameter übergeben)
MONGO_URI=${1:-"mongodb://localhost:27017/insurance"}
DATABASE_NAME="insurance"

echo "=========================================="
echo "  MongoDB Import - CSS Insurance"
echo "=========================================="
echo ""
echo "MongoDB URI: $MONGO_URI"
echo "Database: $DATABASE_NAME"
echo ""

# Check if mongoimport is available
if ! command -v mongoimport &> /dev/null; then
    echo "❌ mongoimport not found. Please install MongoDB Database Tools."
    echo "   Download: https://www.mongodb.com/try/download/database-tools"
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Import Offers
echo "📄 Importing Offers..."
mongoimport --uri="$MONGO_URI" \
    --collection=offers \
    --file="$SCRIPT_DIR/offers.json" \
    --jsonArray \
    --drop

if [ $? -eq 0 ]; then
    echo "  ✅ Offers imported successfully"
else
    echo "  ❌ Failed to import offers"
fi
echo ""

# Import Policies
echo "📋 Importing Policies..."
mongoimport --uri="$MONGO_URI" \
    --collection=policies \
    --file="$SCRIPT_DIR/policies.json" \
    --jsonArray \
    --drop

if [ $? -eq 0 ]; then
    echo "  ✅ Policies imported successfully"
else
    echo "  ❌ Failed to import policies"
fi
echo ""

# Import Claims
echo "🔔 Importing Claims..."
mongoimport --uri="$MONGO_URI" \
    --collection=claims \
    --file="$SCRIPT_DIR/claims.json" \
    --jsonArray \
    --drop

if [ $? -eq 0 ]; then
    echo "  ✅ Claims imported successfully"
else
    echo "  ❌ Failed to import claims"
fi
echo ""

echo "=========================================="
echo "  Import Complete!"
echo "=========================================="
echo ""
echo "✅ Data has been imported to MongoDB"
echo ""

