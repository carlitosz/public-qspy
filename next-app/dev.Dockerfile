FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .

# Allow install without lockfile, so example works even without Node.js installed locally
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm ci; \
  fi

# Copy from local to container
COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

# Note: Don't expose ports here, Compose will handle that for us.

# Start Next.js in development mode.
CMD if [ -f package-lock.json ]; then npm run dev; fi
