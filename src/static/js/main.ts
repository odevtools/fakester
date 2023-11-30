import "./mexico"
import {curp, rfc} from "./mexico";
import {bban, cif, iban, nie, nif} from "./spain";
import {formatBBAN, formatIBAN} from "./utils";

window.ui = (function(generator) {

    const utils = {
        setupField: function(prefix, type, fn) {
            let field = document.getElementById(`${prefix}-${type}-field`);
            let btn = document.getElementById(`${prefix}-${type}-button`);

            if (!field || !btn) {
                return;
            }

            btn.onclick = function() {
                field.value = fn();
            }
            field.value = fn();
        }
    };

    return {
        init: function() {
            window.ui.spain.init();
            window.ui.mexico.init();
        },
        spain: {
            init: function() {
                utils.setupField("spain", "nie", nie);
                utils.setupField("spain", "nif", nif);
                utils.setupField("spain", "cif", cif);
                utils.setupField("spain", "bban", function() {
                    return formatBBAN(bban());
                });
                utils.setupField("spain", "iban", function() {
                    return formatIBAN(iban());
                });
            },
        },
        mexico: {
            init: function() {
                utils.setupField("mexico", "rfc", function() {
                    return rfc("first", "last", "mother", "03", "12", "1987");
                });
                utils.setupField("mexico", "curp", function() {
                    return curp("first", "last", "mother", "03", "12", "1987", "CAMPECHE", "MALE");
                });
            },
        }
    }
}());

// on ready, init view
(function(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}(window.ui.init));
