const os = require('os');

console.log("Arch: " + os.arch());
console.log("CPU Information: " + os.cpus());
console.log("Total Memory: " + os.totalmem());
console.log("Free Memory: " + os.freemem());
console.log("Host Name: " + os.hostname());
console.log("Platform: " + os.platform());
console.log("Network Interfaces: " + os.networkInterfaces());
console.log("User Info: " + os.userInfo());
console.log("Load Avg: " + os.loadavg());
console.log("Release: " + os.release());
