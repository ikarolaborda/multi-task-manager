const {exec} = require("child_process");

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
                reject(error);
            } else if (stderr) {
                console.warn(stderr);
                reject(new Error(stderr));
            } else {
                resolve(stdout);
            }
        });
    });
}

module.exports = {
    runCommand
};