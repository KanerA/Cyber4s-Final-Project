# Bon Apetit

## Cyber4s 2021 Final Project

This is a finel project of [cyber4s](https://www.timesofisrael.com/progam-arms-discharged-fighters-with-cyberskills-wins-idf-chief-of-staff-award/) 2021 course.

## Example Gifs
![web-gif](readmeFiles/bonGif.gif)
![mobile-gif](readmeFiles/mobileGif.gif)

## usage

1. **Sign in or register** to our system with both your register machine (PC) and your cooks phones.
2. **Edit your menu:** Add dishes and drinks and add name, price, description and permanent options
3. **Order** through menu tab
4. **Control your orders** in orders and history tabs


# Running locally:
- Create .env files with the following information:
- **Server**:
- - DATABASE="final-db"
- - PASSWORD=[your password]
- - MONGO_URI=[your mongoDB URI]
- - ACCESS_TOKEN_SECRET
- - REFRESH_TOKEN_SECRET
- **Cook**: create a file called `env.js` in `cook` dir
- - IP:[check your computer IP by typing `ipconfig` in a terminal of your choise]
- - PORT: 8080
- Start the server through terminal
 `cd server
 npm start`
 - Start the register web app through terminal
 `cd client/register
 npm start`
- Start the cook mobile app through terminal
 `cd client/cook
 expo start`
 - Download [Expo Go](https://expo.io/client) on your mobile device and scan the QR code that will apper in http://localhost:19002/
 - **You're good to go!** 

## Technologies that were in use in this project:

<p align="left"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="js" width="40" height="40" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="50" height="50"/> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="node" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sequelize/sequelize-original.svg" alt="sequelize" width="50" height="50" />
   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongoDB" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" alt="MySQL" width="50" height="50" />
  <img src="https://cdn.freebiesupply.com/logos/large/2x/jest-logo-png-transparent.png" alt="jest" width="50" height="50" />
  <img src="https://github.com/devicons/devicon/blob/master/icons/sass/sass-original.svg" alt="sass" width="50" height="50" />
   <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" alt="redux" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="50" height="50" />
 
  <br/>  
</p>
<!-- https://drawsql.app/yuvalnakav/diagrams/restaurantdb# - sql format -->
