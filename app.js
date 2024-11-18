const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const app = express();

app.use(express.json());  // Enable JSON parsing in request bodies
app.use(express.static('public'));  // Serve static files from 'public' folder

app.use(middleware.cors);  // Apply CORS middleware

// Routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);

// Middleware for handling errors
app.use(middleware.notFound);  // Handle 404 errors (route not found)
app.use(middleware.handleError);  // Handle server errors

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
