//https://spreadsheets.google.com/feeds/list/1dH6QCXDm7_Jw1UHc0KAmgklKTz-F_lDgDtld3i9eCPA/od6/public/values?alt=json
//1dH6QCXDm7_Jw1UHc0KAmgklKTz-F_lDgDtld3i9eCPA
var sheetID = "1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk";

var request = {};
var pairs = window.location.search.substring(1).split("&");
for (var i = 0; i < pairs.length; i++) {
  var pair = pairs[i].split("=");
  request[pair[0]] = pair[1];
}

let xmlhttp = new XMLHttpRequest();
var _get = request["id"];

function difficolta(n) {
  var str = "";
  for (var i = 0; i < n; i++) {
    str += "*";
  }
  return str;
}

xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let data = JSON.parse(this.responseText).feed.entry;

    document.getElementById("titolo").innerHTML =
      data[_get]["gsx$titolo"]["$t"];
    document.getElementById("difficolta").innerHTML = difficolta(
      data[_get]["gsx$difficolta"]["$t"]
    );
    document.getElementById("tcottura").innerHTML =
      data[_get]["gsx$tcottura"]["$t"];
    document.getElementById("preparazione").innerHTML =
      data[_get]["gsx$preparazione"]["$t"];
  }
};

/* xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let data = JSON.parse(this.responseText).feed.entry;
    let r_titolo = data[_get]["gsx$titolo"]["$t"];
    let r_difficolta = data[_get]["gsx$difficolta"]["$t"];
    let r_tcottura = data[_get]["gsx$tcottura"]["$t"];
    let r_preparazione = data[_get]["gsx$preparazione"]["$t"];

    document.getElementById("titolo").innerHTML = r_titolo;
    document.getElementById("difficolta").innerHTML = r_difficolta;
    document.getElementById("tcottura").innerHTML = r_tcottura;
    document.getElementById("preparazione").innerHTML = r_preparazione;
  }
}; */

xmlhttp.open(
  "GET",
  "https://spreadsheets.google.com/feeds/list/" +
    sheetID +
    "/od6/public/values?alt=json",
  true
);
xmlhttp.send();
