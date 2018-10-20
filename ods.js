function tabularTable(element) {
    var table = element.firstElementChild;
    var body = table.getElementsByTagName("tbody")[0];
    var rows = body.querySelectorAll("tr");

    var n = rows.length/2;
    for (var i = 0; i < n; i++) {
        var tdn = rows[i].querySelectorAll("td");
        var tdp = rows[n + i].querySelectorAll("td");

        for (var j = 0; j < tdn.length; j++) {
            tdn[j].textContent += " (" + tdp[j].textContent + ")";
        }

        rows[n+i].parentElement.removeChild(rows[n+i]);
    }

    return table;
}

function tabularMean(element) {
    var table = element.firstElementChild;
    var body = table.getElementsByTagName("tbody")[0];
    var rows = body.querySelectorAll("tr");

    var tdm = rows[1].querySelectorAll("td");
    var tds = rows[2].querySelectorAll("td");

    for (var j = 0; j < tdm.length; j++) {
        tdm[j].textContent += " (" + tds[j].textContent + ")";
    }

    rows[2].parentElement.removeChild(rows[2]);
    rows[0].parentElement.removeChild(rows[0]);

    return table;
}

function tabularUnion(element1, element2) {
    var body1 = element1.querySelectorAll("tbody")[0];
    var body2 = element2.querySelectorAll("tbody")[0];

    var row = body2.querySelectorAll("tr");
    for (var i = 0; i < row.length; i++)
        body1.appendChild(row[i]);

    element2.parentElement.removeChild(element2);
}

function tabularCombine(element) {
    var section = element.querySelectorAll("section");
    var t1 = section[0].querySelectorAll("table")[0];
    var t2;

    for (var i = 1; i < section.length; i++) {
        t2 = undefined;

        if (section[i].className === "tabulator-table")
            t2 = tabularTable(section[i]);
        if (section[i].className === "tabulator-mean")
            t2 = tabularMean(section[i]);

        if (t2 !== undefined)
            tabularUnion(t1, t2);
    }
}

var tabular = document.getElementsByClassName("tabulator");
tabularCombine(tabular[0]);
