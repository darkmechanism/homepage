document.addEventListener("keydown", function(e) {
    document.getElementsByClassName("terminal")[0].focus();
})
function opentab(url) {
    window.open(url, '_blank').focus();
}
var process = localStorage.getItem("youtubelist");
if (process != null) {
    var myYoutubeList = process.split(";;;");
}
else {
    var myYoutubeList = [];
}
var bgimage = localStorage.getItem("bgimage");
if (bgimage != null) {
    document.documentElement.style.setProperty('--bgimage', bgimage);
}
else {
    document.documentElement.style.setProperty('--bgimage', "url(me2.jpg)");
}
var q = document.getElementsByClassName("terminal")[0];
function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
    return i;
}
setInterval( function() {
    var changeTime = document.getElementById("time");
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var hdisplay = checkTime(hours);
    var mdisplay = checkTime(minutes);
    changeTime.innerHTML = hdisplay + ":" + mdisplay;
}, 1000);
q.addEventListener("keydown", function(e) {
    if (e.code == "Enter") {
        switch (q.value) {
            case ">background":
                localStorage.setItem("bgimage", "url(" + prompt("Enter link to new background image.", "") + ")");
                document.getElementById("errtext").style.display = "none";
                break;
            case ">google":
                opentab("https://google.com");
                document.getElementById("errtext").style.display = "none";
                break;
            case ">youtube":
                opentab("https://youtube.com");
                document.getElementById("errtext").style.display = "none";
                break;
            case ">twitter":
                opentab("https://twitter.com");
                document.getElementById("errtext").style.display = "none";
                break;
            case ">github":
                opentab("https://github.com");
                document.getElementById("errtext").style.display = "none";
                break;
            case ">config":
                localStorage.setItem("youtubelist", prompt("Enter list in YPLY format.", ""));
                var process = localStorage.getItem("youtubelist");
                myYoutubeList = process.split(";;;");
                document.getElementById("errtext").style.display = "none";
                break;
            case ">play":
                opentab(myYoutubeList[Math.floor(Math.random() * myYoutubeList.length)]);
                document.getElementById("errtext").style.display = "none";
                break;
            case ">custom":
                var val = prompt("Enter command name and link to go to, separated by a ';;;'.", "website;;;https://website.com");
                if (localStorage.getItem("customcommands") == null) {
                    localStorage.setItem("customcommands", val);   
                }
                else {
                    localStorage.setItem("customcommands", localStorage.getItem("customcommands") + "|||" + val);
                }
                document.getElementById("errtext").style.display = "none";
                break;
            default:
                if (q.value.startsWith(">") && localStorage.getItem("customcommands") != null) {
                    var qb = localStorage.getItem("customcommands").split("|||");
                    var qbdic = {}; // turn custom commands into dictionary for easy reading
                    for (var i = 0; i < qb.length; i++) {
                        qbdic[qb[i].split(";;;")[0]] = qb[i].split(";;;")[1];
                    }
                    if (qbdic[q.value.replace(">", "")] != undefined) {
                        opentab(qbdic[q.value.replace(">", "")]);
                    }
                    document.getElementById("errtext").style.display = "none";
                }
                else if (!q.value.startsWith(">")) {
                    opentab("https://google.com/search?q=" + q.value);
                    document.getElementById("errtext").style.display = "none";
                }
                else if (q.value.startsWith(">")) {
                    document.getElementById("errtext").style.display = "block";
                }
                break;
        }
    }
});
