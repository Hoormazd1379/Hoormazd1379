/**
Loads routers onto the Node.js server.
Scans the directory and loads router modules dynamically based on the directory structure.
Exports the loaded routers for use in the server.

- HP
*/
const fs = require('fs'); // File system module

const dirEntries = fs.readdirSync(__dirname); // Read the directory entries in the current directory
const base = __dirname + '/'; // Base path for the routers
const routers = {}; // Object to store the loaded routers

try {
    dirEntries.forEach(function (dirEntry) {
        const stats = fs.statSync(base + dirEntry); // Get the file stats of the directory entry
        // Try to load router of the directory
        try {
            if (stats.isDirectory()) {
                const router = require(base + dirEntry + '/router'); // Load router from the subdirectory
                routers[dirEntry] = router; // Add router to our list of routers
            } else {
                const router = require(base + dirEntry); // Load router from the file directly
                routers[dirEntry.replace(/.js$/, "")] = router; // Add router to our list of routers
            }
        } catch (err) {
            console.log('Could not get router for ' + dirEntry);
            console.log(err.toString() + err.stack);
        }
    });
} catch (err) {
    console.log('Error while loading routers');
    console.log(err.stack);
} finally {
    module.exports = routers; // Export the loaded routers
}