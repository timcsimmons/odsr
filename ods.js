// Combine counts with percentages
function tabularTable(element) {
    var table = element.firstElementChild;
    var body = table.getElementsByTagName("tbody")[0];
    var rows = body.querySelectorAll("tr");

    var n = rows.length/2;

    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.textContent = rows[0].firstElementChild
        .textContent.split("/")[0] + " [n (%)]";
    tr.appendChild(th);
    body.insertBefore(tr, body.firstElementChild);

    var p = rows[0].querySelectorAll("td").length;
    for (var i = 0; i < p; i++) {
        var td = document.createElement("td");
        tr.appendChild(td);
    }

    for (var i = 0; i < n; i++) {
        var thn = rows[i].querySelectorAll("th")[0];
        var tdn = rows[i].querySelectorAll("td");
        var tdp = rows[n + i].querySelectorAll("td");

        var level = thn.textContent.split("/");
        level.shift();
        thn.textContent = level.join("/");

        for (var j = 0; j < tdn.length; j++) {
            tdn[j].textContent += " (" + tdp[j].textContent + ")";
        }

        rows[n+i].parentElement.removeChild(rows[n+i]);
    }

    return table;
}

// Combine means with SDs
function tabularMean(element) {
    var table = element.firstElementChild;
    var body = table.getElementsByTagName("tbody")[0];
    var rows = body.querySelectorAll("tr");

    var thm = rows[1].querySelectorAll("th")[0];
    var tdm = rows[1].querySelectorAll("td");
    var tds = rows[2].querySelectorAll("td");

    thm.textContent = thm.textContent.split("/")[0] + " [mean (sd)]";

    for (var j = 0; j < tdm.length; j++) {
        tdm[j].textContent += " (" + tds[j].textContent + ")";
    }

    rows[2].parentElement.removeChild(rows[2]);
    rows[0].parentElement.removeChild(rows[0]);

    return table;
}

// Put the rows of one table into another and remove the first
function tabularUnion(element1, element2) {
    var body1 = element1.querySelectorAll("tbody")[0];
    var body2 = element2.querySelectorAll("tbody")[0];

    var row = body2.querySelectorAll("tr");
    for (var i = 0; i < row.length; i++)
        body1.appendChild(row[i]);

    element2.parentElement.removeChild(element2);
}

// Combine all tables in a tabulator section
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

    return t1;
}

// Restrict and re-order columns
function tabularSelect(element, column) {
    var order = {};
    var head = element.querySelectorAll("thead")[0]
        .querySelectorAll("tr")[0];
    var hth = head.querySelectorAll("th");
    for (var i = 0; i < hth.length; i++)
        order[hth[i].textContent] = i;

    for (var i = 0; i < column.length; i++) {
        var th = document.createElement("th");
        var loc = order[column[i]];
        th.textContent = hth[loc].textContent;
        head.appendChild(th);
        hth[loc].parentElement.removeChild(hth[loc]);
    }

    var body = element.querySelectorAll("tbody")[0];
    var row = body.querySelectorAll("tr");

    for (var i = 0; i < row.length; i++) {
        var btd = row[i].querySelectorAll("td");
        for (var j = 0; j < column.length; j++) {
            var td = document.createElement("td");
            var loc = order[column[j]];
            td.textContent = btd[loc].textContent;
            row[i].appendChild(td);
            btd[loc].parentElement.removeChild(btd[loc]);
        }
    }
}

// Nest the header columns in a table (factor1/level:factor2/level)
function tabularNestHeader(element) {
    var head = element.querySelectorAll("thead")[0];
    var row = head.querySelectorAll("tr")[0];
    var hth = row.querySelectorAll("th");

    var colons = 0;
    var i;
    for (i = 0; i < hth.length; i++) {
        var n = hth[i].textContent.split(":").length;
        if (n > colons) colons = n;
    }

    for (i = 0; i < 2*colons; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        tr.appendChild(td);

        for (var j = 0; j < hth.length; j++) {
            var text = hth[j].textContent.split(":");
            var k = Math.floor(i/2);
            var th = document.createElement("th");
            if (k < text.length) {
                th.textContent = text[k].split("/")[i % 2];
            } else {
                th.textContent = "";
            }
            tr.appendChild(th);
        }
        head.appendChild(tr);
    }

    row.parentElement.removeChild(row);
    row = head.querySelectorAll("tr");
    for (i = 0; i < row.length; i++) {
        var rth = row[i].querySelectorAll("th");
        var curn = 0;
        var cur = rth[curn].textContents;
        var colspan = 1;
        for (j = 0; j < rth.length; j++) {
            if (rth[j].textContent === cur && rth[j].textContent !== "") {
                rth[j].parentElement.removeChild(rth[j]);
                colspan++;
                rth[curn].setAttribute("colspan", colspan);
            } else {
                colspan = 1;
                curn = j;
                cur = rth[curn].textContent;
            }
        }
    }
}

// Test
var tabular = document.getElementsByClassName("tabulator");
var t0 = tabularCombine(tabular[0]);


tabularSelect(t0, [
    "cyl/4:am/0", "cyl/4:am/1", "cyl/4",
    "cyl/6:am/0", "cyl/6:am/1", "cyl/6",
    "cyl/8:am/0", "cyl/8:am/1", "cyl/8",
    "(Intercept)"]);


tabularNestHeader(t0);
