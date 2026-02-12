#!/bin/bash

# Quick Deployment Script for UX Platform
# Schnelles Deployment-Script für UX Platform

set -e

echo "🚀 UX Platform Deployment Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker ist nicht installiert!${NC}"
    echo "Bitte installieren Sie Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose ist nicht installiert!${NC}"
    echo "Bitte installieren Sie Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✓ Docker ist installiert${NC}"
echo -e "${GREEN}✓ Docker Compose ist installiert${NC}"
echo ""

# Function to display menu
show_menu() {
    echo "Wählen Sie eine Option:"
    echo "1) Deployment starten (alle Services)"
    echo "2) Nur Backend starten"
    echo "3) Nur Frontend starten"
    echo "4) Alle Services stoppen"
    echo "5) Logs anzeigen"
    echo "6) Status prüfen"
    echo "7) Cleanup (Container und Volumes entfernen)"
    echo "8) Beenden"
    echo ""
}

# Function to start all services
start_all() {
    echo -e "${YELLOW}📦 Starte alle Services...${NC}"
    docker-compose up -d
    echo ""
    echo -e "${GREEN}✓ Deployment erfolgreich!${NC}"
    echo ""
    echo "Services verfügbar unter:"
    echo "  Frontend: http://localhost:4200"
    echo "  Backend:  http://localhost:3000"
    echo "  MongoDB:  localhost:27017"
    echo "  Redis:    localhost:6379"
    echo ""
}

# Function to start backend only
start_backend() {
    echo -e "${YELLOW}📦 Starte Backend Services...${NC}"
    docker-compose up -d mongodb redis backend
    echo ""
    echo -e "${GREEN}✓ Backend gestartet!${NC}"
    echo ""
    echo "Backend verfügbar unter: http://localhost:3000"
    echo ""
}

# Function to start frontend only
start_frontend() {
    echo -e "${YELLOW}📦 Starte Frontend...${NC}"
    docker-compose up -d frontend
    echo ""
    echo -e "${GREEN}✓ Frontend gestartet!${NC}"
    echo ""
    echo "Frontend verfügbar unter: http://localhost:4200"
    echo ""
}

# Function to stop all services
stop_all() {
    echo -e "${YELLOW}🛑 Stoppe alle Services...${NC}"
    docker-compose stop
    echo ""
    echo -e "${GREEN}✓ Alle Services gestoppt${NC}"
    echo ""
}

# Function to show logs
show_logs() {
    echo "Welche Logs möchten Sie sehen?"
    echo "1) Alle"
    echo "2) Backend"
    echo "3) Frontend"
    echo "4) MongoDB"
    echo "5) Redis"
    read -p "Auswahl: " log_choice
    
    case $log_choice in
        1) docker-compose logs -f ;;
        2) docker-compose logs -f backend ;;
        3) docker-compose logs -f frontend ;;
        4) docker-compose logs -f mongodb ;;
        5) docker-compose logs -f redis ;;
        *) echo -e "${RED}Ungültige Auswahl${NC}" ;;
    esac
}

# Function to check status
check_status() {
    echo -e "${YELLOW}📊 Service Status:${NC}"
    echo ""
    docker-compose ps
    echo ""
    
    # Health checks
    echo -e "${YELLOW}🏥 Health Checks:${NC}"
    echo ""
    
    # Check Backend
    if curl -s http://localhost:3000/health > /dev/null 2>&1; then
        echo -e "Backend:  ${GREEN}✓ Healthy${NC}"
    else
        echo -e "Backend:  ${RED}✗ Not responding${NC}"
    fi
    
    # Check Frontend
    if curl -s http://localhost:4200 > /dev/null 2>&1; then
        echo -e "Frontend: ${GREEN}✓ Healthy${NC}"
    else
        echo -e "Frontend: ${RED}✗ Not responding${NC}"
    fi
    
    # Check MongoDB
    if docker exec ux-platform-mongodb mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
        echo -e "MongoDB:  ${GREEN}✓ Healthy${NC}"
    else
        echo -e "MongoDB:  ${RED}✗ Not responding${NC}"
    fi
    
    # Check Redis
    if docker exec ux-platform-redis redis-cli ping > /dev/null 2>&1; then
        echo -e "Redis:    ${GREEN}✓ Healthy${NC}"
    else
        echo -e "Redis:    ${RED}✗ Not responding${NC}"
    fi
    
    echo ""
}

# Function to cleanup
cleanup() {
    echo -e "${RED}⚠️  WARNUNG: Dies wird alle Container, Volumes und Daten löschen!${NC}"
    read -p "Sind Sie sicher? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        echo -e "${YELLOW}🧹 Cleanup wird durchgeführt...${NC}"
        docker-compose down -v
        echo ""
        echo -e "${GREEN}✓ Cleanup abgeschlossen${NC}"
    else
        echo "Cleanup abgebrochen"
    fi
    echo ""
}

# Main loop
while true; do
    show_menu
    read -p "Ihre Auswahl: " choice
    echo ""
    
    case $choice in
        1) start_all ;;
        2) start_backend ;;
        3) start_frontend ;;
        4) stop_all ;;
        5) show_logs ;;
        6) check_status ;;
        7) cleanup ;;
        8) 
            echo "Auf Wiedersehen!"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Ungültige Auswahl. Bitte versuchen Sie es erneut.${NC}"
            echo ""
            ;;
    esac
done
