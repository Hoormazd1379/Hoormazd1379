/**
Express Router for handling home routes.

- HP
*/
const express = require('express'); // Express framework
const router = express.Router(); // Create a new router object
module.exports = router; // Export the router object


const serverStartTime = new Date(); // Capture the start time
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const fs = require('fs');
const path = require('path');

//testing

// Function to generate a random 6-digit number
function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Variable to hold the current random number
let allianceFrequency = generateRandomNumber();

// Array of whitelisted family names
const whitelistedFamilies = ['BlueberryOutlawsMC'];

// Update the random number every 30 minutes (30 * 60 * 1000 milliseconds)
setInterval(() => {
    allianceFrequency = generateRandomNumber();
    console.log(`Alliance frequency updated to: ${allianceFrequency}`);
}, 30 * 60 * 1000);

// Define the /alliancefreq route
router.get('/alliancefreq', (req, res) => {
    const familyName = req.query.familyName; // Get family name from query parameter
    
    if (whitelistedFamilies.includes(familyName)) {
        res.send(allianceFrequency.toString()); // Return the number if whitelisted
    } else {
        res.send('noauth'); // Return "noauth" if not whitelisted
    }
});

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

/**
GET request handler for the root route ("/"), "index", and "/index.html".
Renders the "index" view.
@param {Object} req - The request object.
@param {Object} res - The response object.
*/
router.get(["/cv"], (req, res) => {
    res.format({
        'text/html': function () {
            res.render("cv", {
                'serverstarted': `${serverStartTime.toLocaleString()}, ${timeZone}`,
            }); // Render the "index" view
        }
    });
});

const photoDirectory = path.join(__dirname, '../public', 'photos');
router.get('/photos', (req, res) => {
    fs.readdir(photoDirectory, (err, files) => {
        if (err) {
            console.error('Error reading photo directory:', err);
            return res.status(500).json({ error: 'Unable to load photos' });
        }
        // Filter files to only include image types (e.g., .jpg, .png)
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
    });
});