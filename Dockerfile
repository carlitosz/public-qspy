# ==================================================================================
# Local development image
# ==================================================================================
ARG AWS_ACCOUNT_ID
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/qspy-node:20-base AS dev
WORKDIR /app

COPY Makefile /app/Makefile

# Start command is defined in docker compose

# ==================================================================================
# Deps image
# ==================================================================================
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/qspy-node:20-base as deps
WORKDIR /app

# Install next deps
RUN mkdir -p /app/next
COPY ./next/package.json /app/next/package.json
COPY ./next/package-lock.json /app/next/package-lock.json
COPY Makefile /app/Makefile

ARG APPLICATION_ENV
RUN ENVIRONMENT=${APPLICATION_ENV} make next-deps

# ==================================================================================
# Builder image
# ==================================================================================
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/qspy-node:20-base as build
WORKDIR /app

# Copy contents of /next -> /app/next
COPY ./next /app/next

# Build
RUN make build

# ==================================================================================
# Production image
# ==================================================================================
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/qspy-node:20-base as deploy
WORKDIR /app
ENV NODE_ENV=production

# Clean install npm
RUN npm ci

# Configure things
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Copy from builder image to production image
# Forget /next directory in production
COPY --from=builder --chown=nextjs:nodejs /app/next/.next ./.next
COPY --from=builder /app/next/node_modules ./node_modules
COPY --from=builder /app/next/package.json ./package.json
COPY --from=builder /app/next/public ./public

CMD npm start
