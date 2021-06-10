sheetID ="1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk";
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText).feed.entry;

    let i;
    for (i = 0; i < data.length; i++) {
      let name = data[i]["gsx$_cn6ca"]["$t"];
      let age = data[i]["gsx$_cokwr"]["$t"];
      let email = data[i]["gsx$_cpzh4"]["$t"];

      document.getElementById("demo").innerHTML +=
        "<tr>" +
        "<td>" +
        name +
        "</td>" +
        "<td>" +
        age +
        "</td>" +
        "<td>" +
        email +
        "</td>" +
        "</tr>";
    }
  }
};

xmlhttp.open(
  "GET",
  "https://spreadsheets.google.com/feeds/list/"+sheetID+"/od6/public/values?alt=json",
  true
);
xmlhttp.send();
