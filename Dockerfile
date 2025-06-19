# Build stage for Netlify deployment
FROM node:20.19.2-alpine

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Expose port for local testing
EXPOSE 4173

# Start the preview server
CMD ["yarn", "preview", "--host", "0.0.0.0"] 