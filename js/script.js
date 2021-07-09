let sheetID = "1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk";
//https://spreadsheets.google.com/feeds/list/1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk/od6/public/values?alt=json

let request = {};
let pairs = window.location.search.substring(1).split("&");
for (let i = 0; i < pairs.length; i++) {
  let pair = pairs[i].split("=");
  request[pair[0]] = pair[1];
}

let _getcategory = request["c"];

function time(hm) {
  return hm.replace(".", ":");
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
    time(obj.tpreparazione) +
    "</td>" +
    "<td>" +
    time(obj.tcottura) +
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
          difficolta: Number(r_difficolta),
          tpreparazione: r_tpreparazione,
          tcottura: r_tcottura,
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
