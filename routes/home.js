/**
Express Router for handling home routes.

- HP
*/
const express = require('express'); // Express framework
const router = express.Router(); // Create a new router object
module.exports = router; // Export the router object


const serverStartTime = new Date(); // Capture the start time
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
GET request handler for the root route ("/"), "index", and "/index.html".
Renders the "index" view.
@param {Object} req - The request object.
@param {Object} res - The response object.
*/
router.get(["/", "index", "/index.html"], (req, res) => {
    res.format({
        'text/html': function () {
            res.render("index", {
                'serverstarted': `${serverStartTime.toLocaleString()}, ${timeZone}`,
            }); // Render the "index" view
        }
    });
});

/**
GET request handler for the root route ("/"), "index", and "/index.html".
Renders the "index" view.
@param {Object} req - The request object.
@param {Object} res - The response object.
*/
router.get(["/qr"], (req, res) => {
    res.format({
        'text/html': function () {
            res.render("qr", {
                'serverstarted': `${serverStartTime.toLocaleString()}, ${timeZone}`,
            }); // Render the "index" view
        }
    });
});