# Pull Docker Hub base image
FROM node:14.19.3
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install express sequelize bcryptjs && npm install
# Copy app to container
COPY . .
EXPOSE 5000
# Run the "dev" script in package.json
CMD ["npm", "run", "dev"]
