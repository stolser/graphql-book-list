# graphql-book-list

## Installation and config

### nodemon

The 'nodemon' command reloads automatically the app when changes are detected.

Install nodemon globally:
```
sudo npm install nodemon -g
```

Run the 'app.js' file with nodemon (and load env variables from '.env' if needed):
```
nodemon app.js
nodemon -r dotenv/config app.js
```

### Other dependencies

```
npm install express graphql express-graphql
```
