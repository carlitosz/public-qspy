# ==================================================================================
# Local development image
# ==================================================================================
FROM public.ecr.aws/c6h2f5t7/qspy-public:20-base AS dev
WORKDIR /app

COPY Makefile /app/Makefile

# Start command is defined in docker compose

# ==================================================================================
# Deps image
# ==================================================================================
FROM public.ecr.aws/c6h2f5t7/qspy-public:20-base AS deps
WORKDIR /app

# Install next deps
RUN mkdir -p /app/next
COPY ./next/package.json /app/next/package.json
COPY ./next/package-lock.json /app/next/package-lock.json
COPY Makefile /app/Makefile

ARG APPLICATION_ENV
RUN ENVIRONMENT=${APPLICATION_ENV} make frontend-deps

# ==================================================================================
# Build image
# ==================================================================================
FROM public.ecr.aws/c6h2f5t7/qspy-public:20-base AS build
WORKDIR /app

# Copy contents of /next -> /app/next
COPY ./next /app/next

# Build
RUN make build

# ==================================================================================
# Production image
# ==================================================================================
FROM public.ecr.aws/c6h2f5t7/qspy-public:20-base AS deploy
WORKDIR /app
ENV NODE_ENV=production

# Clean install npm
RUN npm ci

# Configure things
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Copy from build image to production image
# Forget /next directory in production
COPY --from=build --chown=nextjs:nodejs /app/next/.next ./.next
COPY --from=build /app/next/node_modules ./node_modules
COPY --from=build /app/next/package.json ./package.json
COPY --from=build /app/next/public ./public

CMD npm start
