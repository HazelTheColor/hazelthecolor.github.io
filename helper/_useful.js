// -- (Int, Int, String) -> (String)
function baseConvert(fromBase, toBase, input) {
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
        return "error";
    }

    if (l === 0) {
        return "(. _.)";
    }

    let n = 0n;
    // converting from start to base10
    for (let i = 0; i < l; i++) {

        if (!allowedSymbols.includes(input[i])) {
            return "(._ .)";
        }

        val = BigInt(symbols.indexOf(input[i]));
        n = n * BigInt(fromBase) + val;
    }

    let out = "";

    //base1 check
    if (toBase === 1) {
        out = '/'.repeat(Number(n));
        return out;
    }

    if (n === 0n) {
        out = "0";
    } else {
        const toBaseBI = BigInt(toBase);
        let temp = n;
        let digits = [];

        while (temp > 0n) {
            digits.push(symbols[Number(temp % toBaseBI)]);
            temp = temp / toBaseBI;
        }
        out = digits.reverse().join('');
    }
    return out;
}

// -- (Int, Int) -> (Int)
function digitalRoot(input, base) {
    if (input == 0) {
        return 0;
    } else {
        const input_10 = parseInt(baseConvert(base, 10, input.toString()));
        return 1 + ((input_10 - 1) % (base - 1));
    }
}

// -- (Int) -> (List[Int])
function factorize(input) {
    if (input == 0) { return [0]; }
    const factors = [];

    while (input % 2 == 0) {
        factors.push(2);
        input /= 2;
    }

    for (let i = 0; i * i < input; i += 2) {
        while (input % i == 0) {
            factors.push(i);
            input /= i;
        }
    }

    if (input > 2) { factors.push(input); }
    return factors;
}