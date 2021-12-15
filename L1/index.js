const colors = require("colors/safe");
const { exit } = require('process');

const args = process.argv.slice(2, 5);
const borders = [];
for (let i = 0; i < args.length; i++) {
    borders.push(Number(args[i]));
}

for (let i = 0; i < borders.length; i++) {
    if (isNaN(borders[i])) {
        console.log("Argument is not a number");
        exit(1);
    }
}

if (borders[0] > borders[1]) {
    let temp;
    temp = borders[0];
    borders[0] = borders[1];
    borders[1] = temp;
}

let complex = false;
let simple = false;
let lights = "green";

nextPrime:
for (let i = borders[0]; i <= borders[1]; i++) {

    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
            complex = true;
        }
    }

    if (complex == false) {
        switch (lights) {
            case "green": {
                console.log(colors.green(i));
                lights = "yellow";
                break;
            }
            case "yellow": {
                console.log(colors.yellow(i));
                lights = "red";
                break;
            }
            case "red": {
                console.log(colors.red(i));
                lights = "green";
                break;
            }
            default: break;
        }
        simple = true;
    }

    complex = false;
}

if (simple == false) {
    console.log(colors.red("There aren't any simple numbers in the range"));
}