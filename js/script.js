var sheetID = "1CY2e1Dn9wi4v37cAoJyhX2lhgBXVtUC4BUaytk0aDuk";

var request = {};
var pairs = window.location.search.substring(1).split('&');
for (var i = 0; i < pairs.length; i++) {
  var pair = pairs[i].split('=');
  request[pair[0]] = pair[1];
}
alert(request["name"]);

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let data = JSON.parse(this.responseText).feed.entry;

    let i;
    for (i = 0; i < data.length; i++) {
      let name = data[i]["gsx$_cn6ca"]["$t"];
      let age = data[i]["gsx$_cokwr"]["$t"];
      let email = data[i]["gsx$_cpzh4"]["$t"];

      document.getElementById("demo").innerHTML +=
        "<tr>" +
        '<td><a href="?name='+name+'">'+name+'</a></td>'+
        "<td>"+age+"</td>"+
        "<td>"+email+"</td>"+
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
