const { json } = require("body-parser");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const upload = require("./uploadFile");


const width = 1200;
const height = 627;
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

function dataURItoUint8Array(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Uint8Array(array);
}

// recursive function to load all the images then save to buffer
const loadImages = (title, sources, x, y) => {
    if (sources.length === 0) {
        var dataUrl = canvas.toDataURL("image/png");
        var arrayData = dataURItoUint8Array(dataUrl);
        var image_result = upload(`${title}.png`, arrayData)
        return image_result
    } else {
        const qty = sources[0].qty
        const img = sources[0].image
        loadImage(img).then((card) => {
            console.log(card)

            const w = 154
            const h = 231
            const gap = 15
            context.drawImage(card, x, y, w, h);

            // add square of card qty to the right bottom of the card
            context.fillStyle = "#000000";
            context.fillRect(x + w - 35, y + h - 35, 30, 30)

            
            // add text of card qty to the right bottom of the card
            context.font = "bold 20px Arial";
            context.fillStyle = "#FFFFFF";
            context.fillText(qty, x + w - 25, y + h - 15)


            x += w + gap;
            if (x > 1000) {
                x = 100;
                y += h + gap;
            }
            loadImages(title, sources.slice(1), x, y);
        });
    }

};

const generateImage = (deckCode, deckName, deckCards, deckNation) => {

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, width, height);
    
    // DECK NAME AND CODE
    context.font = "bold 30px Arial";
    context.fillStyle = "#000000";
    context.fillText(`${deckName} - ${deckCode}`, 300, 50)

    // DECK NATION
    context.font = "bold 20px Arial";
    context.fillStyle = "#000000";
    context.fillText(`Nation: ${deckNation}`, 300, 80)

    // Horizontal Line
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(width-100, 100);
    context.stroke();


    // VGB LOGO
    loadImage("./deckImage/VGB-01.png").then((vgblogo) => {
        context.drawImage(vgblogo, 100, 10, 150, 77);

        // CARD IMAGES
        const sources = Object.values(deckCards);
        const title = `${deckName}-${deckCode}`.replace(/\s/g, '');
        const res = loadImages(title, sources, 100, 125);

        return res
    });  
}


module.exports = generateImage