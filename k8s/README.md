# Kubernetes Deployment Guide

## Prerequisites

- Kubernetes cluster (1.24+)
- kubectl configured
- nginx-ingress-controller installed
- cert-manager installed (for TLS)

## Deployment Steps

### 1. Create Namespace

```bash
kubectl apply -f namespace.yaml
```

### 2. Deploy Database and Cache

```bash
kubectl apply -f mongodb.yaml
kubectl apply -f redis.yaml

# Wait for them to be ready
kubectl wait --for=condition=ready pod -l app=mongodb -n ux-platform --timeout=120s
kubectl wait --for=condition=ready pod -l app=redis -n ux-platform --timeout=60s
```

### 3. Build and Push Docker Images

```bash
# Backend
docker build -t your-registry/ux-platform-backend:latest ./backend
docker push your-registry/ux-platform-backend:latest

# Frontend
docker build -t your-registry/ux-platform-frontend:latest ./frontend
docker push your-registry/ux-platform-frontend:latest

# Update backend.yaml and frontend.yaml with your registry path
```

### 4. Deploy Backend and Frontend

```bash
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml

# Wait for them to be ready
kubectl wait --for=condition=ready pod -l app=backend -n ux-platform --timeout=120s
kubectl wait --for=condition=ready pod -l app=frontend -n ux-platform --timeout=60s
```

### 5. Configure Ingress

Update `ingress.yaml` with your domain names, then:

```bash
kubectl apply -f ingress.yaml
```

### 6. Verify Deployment

```bash
# Check all pods
kubectl get pods -n ux-platform

# Check services
kubectl get svc -n ux-platform

# Check ingress
kubectl get ingress -n ux-platform

# View logs
kubectl logs -f deployment/backend -n ux-platform
kubectl logs -f deployment/frontend -n ux-platform
```

## Scaling

```bash
# Scale backend
kubectl scale deployment backend --replicas=3 -n ux-platform

# Scale frontend
kubectl scale deployment frontend --replicas=3 -n ux-platform
```

## Updates

```bash
# Update backend image
kubectl set image deployment/backend backend=your-registry/ux-platform-backend:v2 -n ux-platform

# Update frontend image
kubectl set image deployment/frontend frontend=your-registry/ux-platform-frontend:v2 -n ux-platform
```

## Cleanup

```bash
# Delete all resources
kubectl delete namespace ux-platform
```
