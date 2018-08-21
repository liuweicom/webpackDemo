/**
 * 修改UWD版本号
 */
const fs = require('fs');
const UWD_VERSION = require('./package.json').version;
const filePath = [
    // './lib/api/main.js'
    // './lib/boot/boot.js',
    // './lib/menu-bar/helpers/UWDSettings.js'
];

function defineVar(filePath, callback) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('Need to run "npm run build:lib"');
            throw err;
        }
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const result = data
                .replace(/UWD_VERSION/g, JSON.stringify(UWD_VERSION));
            fs.writeFile(filePath, result, 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                callback();
            });
        });
    });
}

const promises = [];
filePath.forEach(function (item) {
    promises.push(new Promise((resolve, reject) => {
        defineVar(item, function () {
            resolve();
        });
    }));
});

Promise.all(promises).then(function () {
    console.log('Update UWD\'s version successfully!\n');
    process.exit();
});
