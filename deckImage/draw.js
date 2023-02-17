const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");


// use deck_details to get deck details
// then use the details to create the image
const deck = {
    "D-BT01/001BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_001BH.png",
        "qty": 3,
    },
    "D-BT01/002BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_002BH.png",
        "qty": 3,
    },
    "D-BT01/003BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_003BH.png",
        "qty": 1,
    },
    "D-BT01/016BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_016BH.png",
        "qty": 3,
    },
    "D-BT01/017BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_017BH.png",
        "qty": 1,
    },
    "D-BT01/018BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_018BH.png",
        "qty": 4,
    },
    "D-BT01/019BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_019BH.png",
        "qty": 4,
    },
    "D-BT01/021BH": {
        "image": "https://cardlist.s3.ap-southeast-1.amazonaws.com/D_BT01_021BH.png",
        "qty": 4,
    }

}


const deckName = "Decknya Liza"
const deckCode = "ABCDEF"
const deckNation = "Dragon Empire"


const width = 1200;
const height = 627;
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

// recursive function to load all the images then save to buffer
const loadImages = (sources, x, y) => {
    if (sources.length === 0) {
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("./deckImage/deck.png", buffer)
    } else {
        qty = sources[0].qty
        img = sources[0].image
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
            loadImages(sources.slice(1), x, y);
        });
    }

};

const draw = () => {
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
        const sources = Object.values(deck)
        loadImages(sources, 100, 125);
    });  
}


draw()