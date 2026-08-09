#!/bin/bash
# ============================================================
# InvestIQ AI — AWS EC2 Deployment Script
# ============================================================
# Run this script on a fresh Ubuntu 22.04/24.04 EC2 instance.
# Usage: chmod +x deploy.sh && ./deploy.sh
# ============================================================

set -e

APP_DIR="/home/ubuntu/investiq-ai"
REPO_URL="https://github.com/WAYMAKER1802/FinSight-AI.git"  # Update with your actual repo URL
BRANCH="main"

echo "==========================================="
echo "  InvestIQ AI — EC2 Deployment Starting"
echo "==========================================="

# ─── 1. System Updates ────────────────────────────────────
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# ─── 2. Install Node.js 20.x (LTS) ───────────────────────
echo "📦 Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# ─── 3. Install Nginx ────────────────────────────────────
echo "📦 Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable nginx

# ─── 4. Install PM2 (Process Manager) ────────────────────
echo "📦 Installing PM2..."
sudo npm install -g pm2

# ─── 5. Install Git ──────────────────────────────────────
echo "📦 Installing Git..."
sudo apt install -y git

# ─── 6. Clone or Pull Repository ─────────────────────────
if [ -d "$APP_DIR" ]; then
  echo "📂 Repository exists, pulling latest..."
  cd "$APP_DIR"
  git pull origin "$BRANCH"
else
  echo "📂 Cloning repository..."
  git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# ─── 7. Install Frontend Dependencies & Build ────────────
echo "🔨 Building frontend..."
cd "$APP_DIR/frontend"
npm ci
npm run build

echo "✅ Frontend built successfully → $APP_DIR/frontend/dist"

# ─── 8. Install Backend Dependencies ─────────────────────
echo "🔨 Installing backend dependencies..."
cd "$APP_DIR/backend"
npm ci --only=production

# ─── 9. Setup .env (if not exists) ───────────────────────
if [ ! -f "$APP_DIR/backend/.env" ]; then
  echo "⚠️  Creating .env from .env.example..."
  cp "$APP_DIR/backend/.env.example" "$APP_DIR/backend/.env"
  echo ""
  echo "╔══════════════════════════════════════════════════╗"
  echo "║  IMPORTANT: Edit /home/ubuntu/investiq-ai/      ║"
  echo "║  backend/.env with your production values!      ║"
  echo "║  nano $APP_DIR/backend/.env                     ║"
  echo "╚══════════════════════════════════════════════════╝"
  echo ""
fi

# ─── 10. Setup Nginx ─────────────────────────────────────
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/investiq-ai > /dev/null <<'NGINX'
server {
    listen 80;
    server_name _;  # Replace _ with your domain (e.g., investiq.ai)

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    # API proxy — forward to Node.js backend
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
    }

    # Swagger docs proxy
    location /api-docs {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Uploads (static files served by Nginx directly)
    location /uploads/ {
        alias /home/ubuntu/investiq-ai/backend/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Frontend static files (served by Nginx directly)
    location / {
        root /home/ubuntu/investiq-ai/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;  # SPA fallback

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
NGINX

# Enable the site
sudo ln -sf /etc/nginx/sites-available/investiq-ai /etc/nginx/sites-enabled/investiq-ai
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx

echo "✅ Nginx configured and running"

# ─── 11. Setup PM2 ───────────────────────────────────────
echo "🚀 Starting application with PM2..."
cd "$APP_DIR/backend"

# Stop existing processes if any
pm2 delete investiq-backend 2>/dev/null || true

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup systemd -u ubuntu --hp /home/ubuntu | tail -1 | sudo bash

echo ""
echo "==========================================="
echo "  ✅ DEPLOYMENT COMPLETE!"
echo "==========================================="
echo ""
echo "  App URL:     http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo '<your-ec2-public-ip>')"
echo "  API Docs:    http://<your-ec2-public-ip>/api-docs"
echo "  PM2 Status:  pm2 status"
echo "  PM2 Logs:    pm2 logs investiq-backend"
echo ""
echo "  Next steps:"
echo "  1. Edit backend/.env with production values"
echo "  2. pm2 restart investiq-ai"
echo "  3. (Optional) Setup SSL with: sudo certbot --nginx"
echo "==========================================="
