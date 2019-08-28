function setConfig() {
    var texts = {
        "title" : "Shopping Control"
    }
    document.title = texts.title;
    document.getElementById("navTitle").innerHTML = texts.title;
    //var titulo = document.getElementById("navTitle");
    //titulo.innerHTML = texts.title;
}
setConfig();