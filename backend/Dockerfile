# Build stage
FROM node:20.19.2-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:20.19.2-alpine

WORKDIR /app

# Install production dependencies only
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built application
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"] 