//https://spreadsheets.google.com/feeds/list/1dH6QCXDm7_Jw1UHc0KAmgklKTz-F_lDgDtld3i9eCPA/od6/public/values?alt=json
//1dH6QCXDm7_Jw1UHc0KAmgklKTz-F_lDgDtld3i9eCPA
let sheetID = "1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk";

let request = {};
let pairs = window.location.search.substring(1).split("&");
for (let i = 0; i < pairs.length; i++) {
  let pair = pairs[i].split("=");
  request[pair[0]] = pair[1];
}

let xmlhttp = new XMLHttpRequest();
let _get = request["id"];

function getById(object, id) {
  let r = Number();
  for (let i = 0; i < object.length; i++) {
    if (object[i]["gsx$id"]["$t"] === id) {
      r = Number(i);
      break;
    }
  }
  return r;
}

function time_s(hm) {
  let arr = hm.split(".");
  arr = [Number(arr[0]), Number(arr[1])];
  let str = "";
  if (arr[0] === 1) str += arr[0] + " ora";
  else if (arr[0] > 1) str += arr[0] + " ore";
  if (arr[0] > 0) str += " ";
  if (arr[1] === 1) str += arr[1] + " minuto";
  else str += arr[1] + " minuti";
  return str;
}

function difficolta(n) {
  switch (Number(n)) {
    case 0:
      return "Principiante";
    case 1:
      return "Facile";
    case 2:
      return "Intermedio";
    case 3:
      return "Esperto";
    default:
      return "Livello";
  }
}

/* function difficolta_img(n) {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += "*";
  }
  return str;
} */

function list(elementId, str) {
  let ul = document.getElementById(elementId);

  let arr = str.split("\n");
  for (var i = 0; i < arr.length; i++) {
    //var name = names[i];
    var li = document.createElement("li");
    li.innerHTML = arr[i];
    ul.appendChild(li);
  }
}

xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let data = JSON.parse(this.responseText).feed.entry;
    let key = getById(data, _get);

    document.getElementById("titolo").innerHTML = data[key]["gsx$titolo"]["$t"];
    //document.getElementById("image").src = data[key]["gsx$image"]["$t"];
    document.getElementById("difficolta").innerHTML = difficolta(
      data[key]["gsx$difficolta"]["$t"]
    );
    document.getElementById("tcottura").innerHTML = time_s(
      data[key]["gsx$tcottura"]["$t"]
    );
    list("ingredienti", data[key]["gsx$ingredienti"]["$t"]);
    list("preparazione", data[key]["gsx$preparazione"]["$t"]);
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
