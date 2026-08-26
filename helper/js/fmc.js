function loadFMC() {
}

const output = document.getElementById("bg-text");

const letters = [
    '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 
    '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 
    '-', '-', '-', '-', '-', '-'
]
let valid = true;

const d = document.querySelectorAll('#letters-div input');
d.forEach((input) => {
    input.addEventListener('input', (event) => {
        valid = true;

        const val = event.target.value.toUpperCase().replace(/[^A-Z]/g, '');
        event.target.value = val;

        const indx = event.target.name;

        if (letters.includes(val)) {
            valid = false;
            output.innerHTML = 'duplicates :P';
        } else if (val === '') {
            letters[indx] = '-';
            writeToScreen();
        } else {
            letters[indx] = val;
            writeToScreen();
        }
    });
});

const inputbox = document.getElementById("read");
inputbox.addEventListener('input', (event) => {
    writeToScreen();
});

const dotImg = '<img src="../../graphics/fmc_text_dot.png">';
const dashImg = '<img src="../../graphics/fmc_text_dash.png">';
const slashImg = '<img src="../../graphics/fmc_text_slash.png">';

function writeToScreen() {
    if (valid) {
        const inputtxt = inputbox.value;
        let txt = '';
        for (let i = 0; i < inputtxt.length; i++) {
            const char = inputtxt[i].toUpperCase();
            if (!letters.includes(char)) {
                txt = txt + '&nbsp' + char + ' ';
            } else {
                const index = letters.indexOf(char);

                // first char
                if ([0, 1, 2, 3, 4, 5, 6, 7, 8].includes(index)) {
                    txt += dotImg;
                } else if ([9, 10, 11, 12, 13, 14, 15, 16, 17].includes(index)) {
                    txt += dashImg;
                } else {
                    txt += slashImg;
                }

                // second char
                if ([0, 1, 2, 9, 10, 11, 18, 19, 20].includes(index)) {
                    txt += dotImg;
                } else if ([3, 4, 5, 12, 13, 14, 21, 22, 23].includes(index)) {
                    txt += dashImg;
                } else {
                    txt += slashImg;
                }
                
                // third char
                if ([0, 3, 6, 9, 12, 15, 18, 21, 24].includes(index)) {
                    txt += dotImg;
                } else if ([1, 4, 7, 10, 13, 16, 19, 22, 25].includes(index)) {
                    txt += dashImg;
                } else {
                    txt += slashImg;
                }
            }
        }
        output.innerHTML = txt;
    }
}