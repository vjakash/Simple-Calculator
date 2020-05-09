window.onload = function() {
    var txt = document.getElementById("calc");
    txt.value = "";
}

function insert(val) {
    document.getElementById("ans").innerHTML = "";

    document.getElementById("deleteBtn").classList.remove("btn-danger");
    document.getElementById("clearBtn").classList.remove("btn-danger");
    document.getElementById("calc").classList.remove("border-danger");
    // console.log("hi")
    var txt = document.getElementById("calc");
    var str = txt.value;
    str += val;
    txt.value = str;
}
document.getElementById("deleteBtn").addEventListener("click", del);
document.getElementById("clearBtn").addEventListener("click", clear);

function clear() {
    document.getElementById("ans").innerHTML = "";
    var txt = document.getElementById("calc");
    txt.value = "";
}

function del() {
    document.getElementById("ans").innerHTML = "";
    // console.log("hi");
    var txt = document.getElementById("calc");
    var str = txt.value;
    str = str.split("");
    str = str.splice(0, str.length - 1);
    str = str.join("");
    // console.log(str);
    txt.value = "";
    txt.value = str;
}

function validate() {
    var txt = document.getElementById("calc");
    var str = txt.value.split("");
    for (let i = 0; i < str.length; i++) {
        if (str[i] == "+" || str[i] == "-" || str[i] == "*" || str[i] == "/" | str[i] == "%") {
            if (str[i + 1] == "+" || str[i + 1] == "-" || str[i + 1] == "*" || str[i + 1] == "/" | str[i + 1] == "%") {
                document.getElementById("calc").classList.add("border-danger");
                document.getElementById("calc").setAttribute("data-toggle", "tooltip");
                document.getElementById("calc").value = "";
                document.getElementById("deleteBtn").classList.add("btn-danger");
                document.getElementById("clearBtn").classList.add("btn-danger");

                alert("Enter in Valid pattern");
                return;
            }
        }
    }
    var exp = []
    var temp = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[+|\u002D|*|/|%]/g)) {
            exp.push(Number(temp.join("")));
            exp.push(str[i]);
            temp = [];
        } else if (i == str.length - 1) {
            temp.push(str[i]);
            exp.push(Number(temp.join("")));
            temp = [];
        } else {
            temp.push(str[i]);
        }
    }
    if (exp.includes("*") || exp.includes("/") || exp.includes("%")) {
        console.log("yes");
        var exp = dmm(exp);
        var exp = as(exp);

    } else {
        console.log("no");
        var exp = as(exp);
    }
    txt.value = txt.value
    if (Number.isInteger(exp[0])) {
        document.getElementById("ans").innerHTML = BigInt(exp[0]);
    } else {
        document.getElementById("ans").innerHTML = exp[0];
    }
}

function dmm(exp) {
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == "*" || exp[i] == "/" || exp[i] == "%") {
            switch (exp[i]) {
                case "*":
                    var res = exp[i - 1] * exp[i + 1];
                    exp[i - 1] = res;
                    exp.splice(i, 2);
                    dmm(exp)
                    break;
                case "/":
                    var res = exp[i - 1] / exp[i + 1];
                    exp[i - 1] = res;
                    exp.splice(i, 2);
                    dmm(exp)
                    break;
                case "%":
                    var res = exp[i - 1] % exp[i + 1];
                    exp[i - 1] = res;
                    exp.splice(i, 2);
                    dmm(exp);
                    break;
            }
        }
    }
    return exp;
}

function as(exp) {
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == "+") {
            var res = exp[i - 1] + exp[i + 1];
            exp[i - 1] = res;
            exp.splice(i, 2);
            as(exp)
        } else if (exp[i] == "-") {
            var res = exp[i - 1] - exp[i + 1];
            exp[i - 1] = res;
            exp.splice(i, 2);
            as(exp)
        }
    }
    return exp;

}