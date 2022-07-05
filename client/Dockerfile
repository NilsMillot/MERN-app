# Pull Docker Hub base image
FROM node:14.19.3
# Set working directory
WORKDIR /usr/app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app to container
COPY . .
EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]

# Run the "dev" script in package.json
CMD ["npm", "run", "dev"]
