const fs = require('fs');
try{
    fs.writeFileSync('sample1.txt','node js is a run time environment');
    console.log("File has been changed");
}
catch(err){
    console.error(err);
}