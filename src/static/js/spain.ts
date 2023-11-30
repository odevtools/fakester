import {pad} from "./utils";
import * as IBAN from "iban";

function calculateLetter(r) {
    return "TRWAGMYFPDXBNJZSQVHLCKE".charAt(r % 23)
}

// function calculateControlNifAndNie(r) {
//     n = null;
//     try {
//         var t = r.substr(0, 1);
//         if (-1 !== "XYZ".indexOf(t)) {
//             var a = "XYZ".indexOf(t);
//             return n = utils.pad(parseInt(a.toString() + r.substr(1, r.length - 1), 10), 8), isNaN(n) ? null : calculateLetter(n)
//         }
//         if (-1 === "KLM".indexOf(t)) return n = parseInt(r, 10), isNaN(n) ? null : calculateLetter(n);
//         var n = utils.pad(parseInt(0 + r.substr(1, r.length - 1), 10), 8);
//         return calculateLetter(n)
//     } catch (r) {
//         return null
//     }
// }

function calculateControlCif(r) {
    var t = r.substr(1, r.length - 1), a = 0, n = 0;
    for (n = 1; n < t.length; n += 2) a += parseInt(t.substr(n, 1));
    var e = 0;
    for (n = 0; n < t.length; n += 2) {
        var l = 2 * parseInt(t.substr(n, 1));
        1 == String(l).length ? e += parseInt(l) : e = e + parseInt(String(l).substr(0, 1)) + parseInt(String(l).substr(1, 1))
    }
    var o = 10 - (a += e) % 10, s = r.substr(0, 1).toUpperCase();
    return s.match(/^[PQRSNW]$/) ? String.fromCharCode(64 + o).toUpperCase() : s.match(/^[ABCDEFGHJUV]$/) ? (10 == o && (o = 0), o) : calculateLetter(r)
}

export function nif() {
    var r = Math.floor(1e8 * Math.random());
    return pad(r.toString(), 8) + calculateLetter(r)
}

export function nie() {
    var r = Math.floor(3 * Math.random()), t = Math.floor(1e7 * Math.random()),
        a = calculateLetter(pad(parseInt(r.toString() + pad(t.toString(), 7), 10), 8));
    return "XYZ".charAt(r) + pad(t.toString(), 7) + a
}

export function cif() {
    var r = "ABCDEFGHJNPQRSUVW";
    r = r.charAt(Math.floor(17 * Math.random()));
    var t = Math.floor(100 * Math.random()), a = Math.floor(1e5 * Math.random()),
        n = r + pad(t.toString(), 2) + pad(a.toString(), 5);
    return n + calculateControlCif(n)
}

export function bban() {
    var banks = ["0001", "0102", "1484", "2095", "3187"];

    function calcula_dc(a) {
        for (var r = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6), t = 0, n = 0, o = 0; o <= 7; o++) {
            t += parseInt(a.charAt(o)) * r[o + 2];
        }
        for (11 == (t = 11 - t % 11) ? t = 0 : 10 == t && (t = 1), o = 10; o <= 19; o++) {
            n += parseInt(a.charAt(o)) * r[o - 10];
        }
        return 11 == (n = 11 - n % 11) ? n = 0 : 10 == n && (n = 1), t.toString() + n.toString();
    }

    function genera_ccc() {
        var a = banks[Math.floor(Math.random() * banks.length)];
        var r = pad(Math.floor(1e4 * Math.random()).toString(), 4);
        var t = pad(Math.floor(1e10 * Math.random()).toString(), 10);

        return a + r + calcula_dc(a + r + "--" + t) + t;
    }

    return genera_ccc();
}

export function iban() {
    return IBAN.fromBBAN('ES', bban());
}