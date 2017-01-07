// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let folder = '/Users/polodev/Desktop'
const fs = require('fs')
// const path = require('path')
console.log('fs', fs)
let files = []
fs.readdir(folder, function (err, items) {
    console.log(items);
    files = items
    let video = document.getElementById('video');
    let source = 'file://'+folder+'/'+items[4];
    console.log('source', source)
    video.setAttribute('src', source);
});
console.log('files', files)