let sheetID = "1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk";
//https://spreadsheets.google.com/feeds/list/1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk/od6/public/values?alt=json

let request = {};
let pairs = window.location.search.substring(1).split("&");
for (let i = 0; i < pairs.length; i++) {
  let pair = pairs[i].split("=");
  request[pair[0]] = pair[1];
}

let _getcategory = request["c"];
if (_getcategory === undefined) _getcategory = false;

function time(hm) {
  return hm.replace(".", ":");
}

function html_build(obj){


        document.getElementById("demo").innerHTML +=
          "<tr>" +
          '<td><a href="ricetta.html?id=' +
          obj.id +
          '">' +
          obj.titolo +
          "</a></td>" +
          "<td>" +
          obj.categoria +
          "</td>" +
          "<td>" +
          obj.difficolta +
          "</td>" +
          "<td>" +
          time(obj.tcottura) +
          "</td>" +
          "</tr>";
}

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var obj = {}, cart = [];
      obj.id = 1;
      obj.titolo = "banana";
      obj.categoria = "cibo";
      obj.difficolta = 2;
      obj.tcottura = "0.10";
    cart.push(obj);


document.getElementById("console").innerHTML = obj[1].id;

    let data = JSON.parse(this.responseText).feed.entry;

    /* for (let i = 0; i < data.length; i++) {
      obj.id.push(data[i]["gsx$id"]["$t"]);
      obj.titolo.push(data[i]["gsx$titolo"]["$t"]);
      obj.difficolta.push(data[i]["gsx$difficolta"]["$t"]);
      obj.tcottura.push(data[i]["gsx$tcottura"]["$t"]);
      obj.categoria.push(data[i]["gsx$categoria"]["$t"]);

      //let r_id = data[i]["gsx$id"]["$t"];
      //let r_titolo = data[i]["gsx$titolo"]["$t"];
      //let r_difficolta = data[i]["gsx$difficolta"]["$t"];
      //let r_tcottura = data[i]["gsx$tcottura"]["$t"];
      //let r_categoria = data[i]["gsx$categoria"]["$t"];

      //if (r_categoria === _getcategory) {
      //}
    }
  html_build(obj); */

    
document.getElementById("demo").innerHTML +=
          "<tr>" +
          '<td><a href="ricetta.html?id=' +
          obj.id +
          '">' +
          obj.titolo +
          "</a></td>" +
          "<td>" +
          obj.categoria +
          "</td>" +
          "<td>" +
          obj.difficolta +
          "</td>" +
          "<td>" +
          time(obj.tcottura) +
          "</td>" +
          "</tr>";
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
