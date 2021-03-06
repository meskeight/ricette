let sheetID = "1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk";
//https://spreadsheets.google.com/feeds/list/1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk/od6/public/values?alt=json

let request = {};
let pairs = window.location.search.substring(1).split("&");
for (let i = 0; i < pairs.length; i++) {
  let pair = pairs[i].split("=");
  request[pair[0]] = pair[1];
}

let _getcategory = request["c"];
function Time_hm(hm) {
  return hm.replace(".", ":");
}

function timestrToSec(timestr) {
  var parts = timestr.split(":");
  //return parts[0] * 3600 + parts[1] * 60 + +parts[2];
  return parts[0] * 3600 + parts[1] * 60;
}

function pad(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return "" + num;
  }
}

function formatTime(seconds) {
  return [
    pad(Math.floor(seconds / 3600)),
    pad(Math.floor(seconds / 60) % 60)
    //pad(seconds % 60)
  ].join(":");
}

function timeSum(arr) {
  return formatTime(timestrToSec(arr[0]) + timestrToSec(arr[1]));
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

function html_build(obj) {
  //document.getElementById("console").innerHTML = obj.image;
  document.getElementById("demo").innerHTML +=
    "<tr>" +
    '<td><a href="ricetta.html?id=' +
    obj.id +
    '">' +
    obj.titolo +
    "</a></td>" +
    '<td><img src="' +
    obj.image +
    '" class="thumb" height="220"></td>' +
    "<td>" +
    obj.categoria +
    "</td>" +
    "<td>" +
    obj.difficolta +
    "</td>" +
    "<td>" +
    timeSum([obj.tpreparazione, obj.tcottura]) +
    "</td>" +
    "<td>" +
    obj.tpreparazione +
    "</td>" +
    "<td>" +
    obj.tcottura +
    "</td>" +
    "</tr>";
}

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let data = JSON.parse(this.responseText).feed.entry;
    let recipes = {};

    for (let i = 0; i < data.length; i++) {
      let r_id = data[i]["gsx$id"]["$t"];
      let r_titolo = data[i]["gsx$titolo"]["$t"];
      let r_image = data[i]["gsx$image"]["$t"];
      let r_difficolta = data[i]["gsx$difficolta"]["$t"];
      let r_tpreparazione = data[i]["gsx$tpreparazione"]["$t"];
      let r_tcottura = data[i]["gsx$tcottura"]["$t"];
      let r_categoria = data[i]["gsx$categoria"]["$t"];

      if (_getcategory === undefined || r_categoria === _getcategory) {
        recipes[i] = {
          id: Number(r_id),
          titolo: r_titolo,
          image: r_image,
          difficolta: difficolta(r_difficolta),
          tpreparazione: Time_hm(r_tpreparazione),
          tcottura: Time_hm(r_tcottura),
          categoria: r_categoria
        };

        html_build(recipes[i]);
      }
    }
  }
};

xmlhttp.open(
  "GET",
  "https://spreadsheets.google.com/feeds/list/" +
    sheetID +
    "/od6/public/values?alt=json",
  true
);
xmlhttp.send();
