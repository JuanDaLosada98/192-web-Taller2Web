const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set handlebars routes
app.get('/', function (req, response) {
    response.sendFile(__dirname+'/public/index.html')
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('El servidor esta escuchando en el puerto: '+PORT));