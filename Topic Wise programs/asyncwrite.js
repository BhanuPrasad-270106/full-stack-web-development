const fs = require('fs');
const text = 'Hello,swami';
fs.writeFile('sample.txt',text,err =>{
    if(err) throw err;
    console.log("File has been changed");
})