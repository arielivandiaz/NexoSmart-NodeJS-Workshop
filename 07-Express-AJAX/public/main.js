function loadDoc() {
    var xhttp = new XMLHttpRequest();
    console.log("xhttprequest");
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("demo").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/welcome" +'?chanfle', true,'variable1','variable2');
    xhttp.send();
  }