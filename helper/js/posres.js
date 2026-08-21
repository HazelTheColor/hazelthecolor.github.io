function loadPosRes() {
    const style = document.getElementById("style");
    style.textContent = `
      body {
        background-color: #151515;
        font-family: Helvetica;
        margin: 0;
        padding: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        height: 100dvh;
      }
      
      .text {
	      color: #cccccc;
	  }

      input {
        background-color: #2e295a;
      }
      
      input:hover {
        background-color: #35476a;
      }

      #base1, #base2, #inputstring, #convert, #copy {
        color: #cccccc;
        font-size: 24px;
        text-align: center;

        margin: 0px;
        border: 2px solid #cccccc;
        outline: none;
        box-sizing: border-box;

        position: absolute;
      }

      #base1 {
        width: 80px;
        height: 40px;
        top: 0px;
        left: 20px;
      }

      #base2 {
        width: 80px;
        height: 40px;
        top: 0px;
        right: 20px;
      }

      #inputstring {
        width: 400px;
        height: 40px;
        top: 80px;
      }

      #output {
        font-size: 24px;
        text-align: center;

        position: absolute;
        margin: 0px;
        width: auto;
        height: 40px;
        top: 450px;
      }

      #convert {
        font-size: 20px;
        background-color: #723a69;

        width: 150px;
        height: 40px;
        top: 140px;
        left: 125px;
      }

      #convert:hover {
        background-color: #ae489d;
      }

      #copy {
        background-color: #723a69;
        background-image: url("../graphics/saveicon.png");

        width: 40px;
        height: 40px;
        bottom: 0px;
        right: 0px;
      }

      #copy:hover {
        background-color: #ae489d;
        background-image: url("../graphics/saveicon_hover.png");
      }
    `
    document.body.innerHTML = `
      <div style="width: 400px; height: 300px; position: relative">
        <input id="base1" maxlength="4" placeholder="94">
        <input id="base2" maxlength="4" placeholder="10">
        <input id="inputstring">
        <button id="convert" onclick="baseConvert()">(✿◠‿◠)</button>
        <button id="copy" onclick="copyText()"></button>
      </div>
      <p id="output" class="text">:3</p>
    `
}

function baseConvert() {
    const fromBase = parseInt(document.getElementById("base1").value);
    const toBase = parseInt(document.getElementById("base2").value);
    const input = document.getElementById("inputstring").value;
    const l = input.length;

    const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
                     "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", 
                     "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", 
                     "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", 
                     "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
                     "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", 
                     "y", "z", "!", "@", "#", "$", "%", "^", "&", "*", 
                     "(", ")", "_", "-", "+", "=", "|", "\\", "{", "}", 
                     ':', ";", '"', "'", "<", ">", ",", ".", "?", "/", 
                     "~", "[", "]", "`"]
    
    const allowedSymbols = symbols.slice(0, fromBase);

    if (isNaN(fromBase) || isNaN(toBase) || fromBase < 2 || fromBase > 94 || toBase < 1 || toBase > 94) {
        window.location.href = "https://hazelthecolor.github.io/...?";
    }

    if (l === 0) {
        document.getElementById("output").textContent = "(._ .)";
        return;
    }

    let n = 0;
    // converting from start to base10
    for (let i = 0; i < l; i++) {

        if (!allowedSymbols.includes(input[i])) {
            document.getElementById("output").textContent = "(. _.)";
            return;
        }

        val = symbols.indexOf(input[i]);
        n += val * fromBase ** (l - 1 - i);
    }

    let out = "";

    //base1 check
    if (toBase === 1) {
        out = '/'.repeat(n);
        document.getElementById("output").textContent = out;
        return;
    }

    const logn = (x, y) => Math.log(x) / Math.log(y);
    const m = Math.floor(logn(n, toBase) + 1);
    // converting from base10 to end
    for (let i = m-1; i >= 0; i--) {
        let char = Math.trunc(n / (toBase ** i))
        n -= (char * toBase ** i);
        out += symbols[char];
    }

    document.getElementById("output").textContent = out;
}

function copyText() {
    var text = document.getElementById("output").textContent;
    navigator.clipboard.writeText(text);
}