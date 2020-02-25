var fs = require('fs')

if (!fs.existsSync('./temp-images')) fs.mkdirSync('./temp-images')
if (!fs.existsSync('./info')) fs.mkdirSync('./info')
if (!fs.existsSync('./info/images')) fs.mkdirSync('./info/images')

var images = fs.readdirSync('./temp-images')
var len = images.length

images.forEach((imageName, i) => {

    let title = imageName.split('.').slice(0, -1).join('-')

    // 1. Move image to page folder
    fs.rename(
        `./temp-images/${imageName}`,
        `./info/images/${imageName}`,
        (err) => { if (err) console.log(err) }
    )

    // 2. Generate page
    let html = getHtml(`./images/${imageName}`, title)
    fs.writeFileSync(`./info/${title}.html`, html)
    console.log(`${i+1}/${len}`)
})

// 3. Update index page
let listTag = '<ol>'
fs.readdirSync('./info')
    .forEach((fName, i) => {
        if(fName.indexOf('.html') !== -1) {
            listTag += `
                <li>
                    <a target="_blank" href="./${fName}">${fName}</a>
                </li>
            `
        }
})
listTag += '</ol>'
fs.writeFileSync(`./info/index.html`, getIndexHtml(listTag))
console.log('Finish!')

function getIndexHtml(listTag) {

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Info</title>
        </head>
        <body>
            <center style="text-align: left;">
            <h3>Available resources</h3>
            ${listTag}
            </center>
        </body>
        </html>
    `
}

function getHtml(imagePath, title) {

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <center>
                <img src="${imagePath}" alt="${title}" title="${title}"></img>
            </center>
        </body>
        </html>
    `
}