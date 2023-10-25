process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at Promise:', reason);
});

// Require framework and middleware dependencies
const express = require('express'); // Express framework
const path = require('path'); // Path module
const logger = require('morgan'); // Morgan middleware for logging
const methodOverride = require('method-override'); // Method override middleware

const fs = require('fs-extra'); // File system module

// Initialize framework
const app = express();

app.use(logger('dev')); // Use Morgan for logging
app.use(express.urlencoded({
  extended: false
})); // Parse application/x-www-form-urlencoded
app.use(express.json({
  limit: '4MB'
})); // Parse application/json

app.use(express.static(path.join(__dirname, 'public'), {
  index: "index.html"
})); // Serve static files from the "public" directory

app.use(methodOverride('_method')); // Use method override

app.set('view engine', 'ejs'); // Set the view engine to EJS

// Controllers
const routers = require('./routes'); // Import route handlers

app.use(routers.home); // Use home route handler
// app.use('/test', routers.test);

// Default fallback handlers
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
// if (app.get('env') === 'development') {
// app.use(function(err, req, res, next) {
// res.status(err.status || 500);
// res.json({
// message: err.message,
// error: err
// });
// });
// }

// Production error handler
// No stacktraces leaked to user
// app.use(function(err, req, res, next) {
// res.status(err.status || 500);
// res.json({
// message: err.message,
// error: {}
// });
// });

module.exports = app; // Export the app object

// Start server
app.set('port', process.env.PORT || 8888); // Set the server port

const server = require('http').createServer(app); // Create an HTTP server

server.on('listening', function () {
  console.log('Express server listening on port ' + server.address().port); // Log the server listening message
});

server.listen(app.get('port')); // Start listening on the configured port