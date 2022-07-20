# Pull Docker Hub base image
FROM node:14.19.3
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install 
RUN npm install -g nodemon
RUN npm install express sequelize bcryptjs jsonwebtoken && npm install
RUN npm install -g sequelize
RUN npm install -g sequelize-cli
RUN npm install --save sequelize-cli
RUN npm install --save sequelize
# Copy app to container
COPY . .
EXPOSE 5000
# Run the "dev" script in package.json
CMD ["npm", "run", "dev"]
