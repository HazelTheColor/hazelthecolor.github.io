function func(input1, input2, code) {
    let i1_10 = parseInt(baseConvert(6, 10, input1.toString()));
    let i2_10 = parseInt(baseConvert(6, 10, input2.toString()));
    let output;

    switch (code) {
        case "00": {
            const str1 = input1.toString();
            const str2 = input2.toString();
            const l1 = str1.length;
            const l2 = str2.length;
            let l = Array.from({length: (l1 + l2 - 1)}, () => 0);

            for (let i = 0; i < l1; i++) {
                for (let j = 0; j < l2; j++) {
                    let d = Math.min(parseInt(str1[i]), parseInt(str2[j]));
                    l[i+j] = Math.max(l[i+j], d);
                }
            }
            output = l.join("");
            break;
        }

        case "01": {
            let d1 = digitalRoot(input1, 6);
            let d2 = digitalRoot(input2, 6);
            let s = d1 + d2;
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "02": {
            let evens = [];
            let odds = [];
            let s = input1.toString() + input2.toString()
            for (let i = 0; i < s.length; i++) {
                if (s[i] % 2 == 0) {
                    evens.push(s[i]);
                } else {
                    odds.push(s[i]);
                }
            }
            output = (evens.concat(odds)).join("");
            break;
        }

        case "03": {
            let s = i1_10 ^ i2_10;
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "04": {
            let s = ((i1_10 ** 2) + (i2_10 ** 2)) ** 0.5;
            s = Math.floor(s);
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "05": {
            let s = i1_10 + i2_10;
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "10": {
            const chrs = new Set();
            let str = input1.toString() + input2.toString()
            for (let i = 0; i < str.length; i++) {
                chrs.add(str[i]);
            }
            output = (6 - chrs.size).toString();
            break;
        }

        case "11": {
            let high = "";
            let low = "";
            let str = input1.toString() + input2.toString()
            for (let i = 0; i < str.length; i++) {
                if (str[i] == "0" || str[i] == "1" || str[i] == "2") {
                    low += str[i];
                } else {
                    high += str[i];
                }
            }
            const h10 = baseConvert(6, 10, high);
            const l10 = baseConvert(6, 10, low);
            let s = Math.abs(h10 - l10);
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "12": {
            let s = i1_10 + i2_10;
            output = baseConvert(10, 5, s.toString());
            break;
        }

        case "13": {
            let s = i1_10 * i2_10;
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "14": {
            const l = parseInt(input1.toString().at(-1));
            let s = l * i2_10;
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "15": {
            let str = input1.toString() + input2.toString();
            let s = "";
            for (let i = 0; i < Math.floor(str.length / 2); i++) {
                s += Math.abs(parseInt(str[i]) - parseInt(str[str.length - 1 - i])).toString();
            }
            if (str.length % 2 == 1) {
                s += "0"
            }
            output = s;
            break;
        }

        case "20": {
            let s = Math.abs(((i1_10 % 216) ** 3) - ((i2_10 % 216) ** 3));
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "21": {
            const a = Math.max(i1_10 % 18, i2_10 % 18);
            const b = Math.min(i1_10 % 18, i2_10 % 18);

            let a_fact = 1;
            let b_fact = 1;
            let a_minus_b_fact = 1;

            for (let x = 1; x <= a; x++) { a_fact *= x; }
            for (let y = 1; y <= b; y++) { b_fact *= y; }
            for (let z = 1; z <= (a-b); z++) { a_minus_b_fact *= z; }

            let s = a_fact / (b_fact * a_minus_b_fact);
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "22": {
            let s = 0;
            let str = input1.toString() + input2.toString()
            const segments = [8, 2, 6, 6, 5, 6];
            for (let i = 0; i < str.length; i++) {
                s += segments[parseInt(str[i])];
            }
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "23": {
            if (i2_10 > i1_10) { [i1_10, i2_10] = [i2_10, i1_10]; }

            while (i2_10 != 0) {
                [i1_10, i2_10] = [i2_10, i1_10 % i2_10];
            }
            output = baseConvert(10, 6, i1_10.toString());
            break;
        }

        case "24": {
            if (i1_10 == 0 || i2_10 == 0) {
                output = '0'
            } else {
                let a = Math.max(i1_10, i2_10);
                let b = Math.min(i1_10, i2_10);
                while (b != 0) {
                    [a, b] = [b, a % b];
                }
                let gcd = a;
                let s = i1_10 * i2_10 / gcd;
                output = baseConvert(10, 6, s.toString());
            }
            break;
        }

        case "25": {
            let s = Math.floor((i1_10 + i2_10) / 2);
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "30": {
            const s1 = input1.toString();
            const s2 = input2.toString();
            let count = 1;
            let las1 = "";
            let las2 = "";

            for (let i = 0; i < (s1.length); i++) {
                if (i == s1.length - 1) {
                    las1 = las1 + s1[i] + count.toString();
                } else if (s1[i] == s1[i+1]) {
                    count += 1;
                } else {
                    las1 = las1 + s1[i] + count.toString();
                    count = 1;
                }
            }

            count = 1;
            for (let i = 0; i < (s2.length); i++) {
                if (i == s2.length - 1) {
                    las2 = las2 + s2[i] + count.toString();
                } else if (s2[i] == s2[i+1]) {
                    count += 1;
                } else {
                    las2 = las2 + s2[i] + count.toString();
                    count = 1;
                }
            }

            let s = parseInt(baseConvert(6, 10, las1)) + parseInt(baseConvert(6, 10, las2));
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "31": {
            const a = Math.max(i1_10, i2_10);
            const b = Math.min(i1_10, i2_10);
            let s;

            if (b == 0) {
                s = a;
            } else {
                s = a % b;
            }
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "32": {
            let s = Math.abs((i1_10 * (i1_10 + 1) / 2) - (i2_10 * (i2_10 + 1) / 2));
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "33": {
            const a = Math.max(i1_10, i2_10);
            const b = Math.min(i1_10, i2_10);
            let s;

            if (b == 0) {
                s = a;
            } else {
                s = Math.floor(a / b);
            }
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "34": {
            const n = Math.max(input1.toString().length, input2.toString().length);
            let i1 = '0'.repeat(n - input1.toString().length) + input1.toString();
            let i2 = '0'.repeat(n - input2.toString().length) + input2.toString();

            let s = ""
            for (let i = 0; i < n; i++) {
                s += (Math.abs(i1[i] - i2[i])).toString();
            }
            output = baseConvert(10, 6, s);
            break;
        }

        case "35": {
            const a = Math.max(i1_10, i2_10);
            const b = Math.min(i1_10, i2_10);
            let s = Math.abs(2*b - a);
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "40": {
            const sum = baseConvert(10, 6, (i1_10 + i2_10).toString());
            let s = digitalRoot(sum, 6);
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "41": {
            let s = Math.floor(1 / ((1 / i1_10) + (1 / i2_10)));
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "42": {
            let s;
            if (i1_10 == 0) {
                s = (i1_10 - i2_10) ** 2;
            } else {
                s = Math.floor(((i1_10 - i2_10) ** 2) / i1_10);
            }
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "43": {
            let str = input1.toString() + input2.toString()
            let l = [...str];
            l.sort()
            output = l.join("");
            break;
        }

        case "44": {
            const fact1 = factorize(i1_10);
            const fact2 = factorize(i2_10);
            const factors = fact1.concat(fact2);

            let s = 0;
            factors.forEach((num) => {
                s += num;
            });
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "45": {
            let s = Math.floor(Math.abs((i1_10 - i2_10)) / 2);
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "50": {
            const d1 = [...(baseConvert(6, 3, input1))];
            const d2 = [...(baseConvert(6, 3, input2))];
            const digits = d1.concat(d2);

            let s = 0;
            digits.forEach((digit) => {
                if (digit == '2') {
                    s += 1;
                }
            });
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "51": {
            const n = Math.max(input1.toString().length, input2.toString().length);
            let i1 = '0'.repeat(n - input1.toString().length) + input1.toString();
            let i2 = '0'.repeat(n - input2.toString().length) + input2.toString();

            let s = "";
            for (let i = 0; i < n; i++) {
                s += Math.max(parseInt(i1[i]), parseInt(i2[i])).toString();
            }
            output = baseConvert(10, 6, s);
            break;
        }

        case "52": {
            let str = input1.toString() + input2.toString()
            let s = 0;
            for (let i = 0; i < str.length; i++) {
                s += parseInt(str[i]);
            }
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "53": {
            const d1 = [...(baseConvert(6, 2, input1))];
            const d2 = [...(baseConvert(6, 2, input2))];
            const digits = d1.concat(d2);

            let s = 0;
            digits.forEach((digit) => {
                if (digit == '0') {
                    s += 1;
                }
            });
            output = baseConvert(10, 6, s.toString());
            break;
        }

        case "54": {
            output = "what";
            break;
        }

        case "55": {
            output = "i dont get it";
            break;
        }
    }
    return output;
}