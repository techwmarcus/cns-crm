# Use the official Node 22 LTS alpine image for a small footprint
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# npm 11.15.0 introduces specific security changes. 
# Explicitly force this exact npm version globally inside the container.
RUN npm install -g npm@11.18.0

# Copy package management files
COPY package*.json ./

# Install your dependencies
RUN npm ci

# Copy the rest of your application code
COPY . .

# Run your application
CMD ["npm", "start"]
