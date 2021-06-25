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

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let data = JSON.parse(this.responseText).feed.entry;

    for (let i = 0; i < data.length; i++) {
      // let r_id = data[i]["gsx$id"]["$t"];
      let r_titolo = data[i]["gsx$titolo"]["$t"];
      let r_difficolta = data[i]["gsx$difficolta"]["$t"];
      let r_tcottura = data[i]["gsx$tcottura"]["$t"];
      let r_categoria = data[i]["gsx$categoria"]["$t"];

      if (r_categoria === _getcategory) {
        document.getElementById("demo").innerHTML +=
          "<tr>" +
          '<td><a href="ricetta.html?id=' +
          i +
          '">' +
          r_titolo +
          "</a></td>" +
          "<td>" +
          r_categoria +
          "</td>" +
          "<td>" +
          r_difficolta +
          "</td>" +
          "<td>" +
          time(r_tcottura) +
          "</td>" +
          "</tr>";
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
