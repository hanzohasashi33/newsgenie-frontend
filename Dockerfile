FROM node:14-alpine

# Set up the working directory
WORKDIR ./

# Copy the application files
COPY package*.json ./
RUN npm install
COPY . .

# Specify the start command
CMD ["npm", "start"]

