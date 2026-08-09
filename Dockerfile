# ============================================================
# InvestIQ AI — Full-Stack Dockerfile (Frontend + Backend)
# For GCP Cloud Run / AWS App Runner / Any container platform
# ============================================================

# ── Stage 1: Build Frontend ─────────────────────────────────
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ── Stage 2: Production Backend ─────────────────────────────
FROM node:20-alpine

LABEL maintainer="InvestIQ AI Team"
LABEL description="InvestIQ AI — Full-Stack Production Image"

# Non-root user for security
RUN addgroup -g 1001 nodejs && adduser -S investiq -u 1001

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend-dist

# Create necessary directories
RUN mkdir -p logs uploads/reports uploads/avatars && \
    chown -R investiq:nodejs logs uploads

# Switch to non-root user
USER investiq

# Cloud Run uses PORT env var (default 8080)
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/api/health || exit 1

CMD ["node", "server.js"]
