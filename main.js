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
var q = document.getElementsByClassName("terminal")[0];
q.value = ">";
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
            case ">google":
                opentab("https://google.com");
                q.value = ">";
                break;
            case ">youtube":
                opentab("https://youtube.com");
                q.value = ">";
                break;
            case ">twitter":
                opentab("https://twitter.com");
                q.value = ">";
                break;
            case ">github":
                opentab("https://github.com");
                q.value = ">";
                break;
            case ">config":
                localStorage.setItem("youtubelist", prompt("Enter list in YPLY format.", ""));
                var process = localStorage.getItem("youtubelist");
                myYoutubeList = process.split(";;;");
                break;
            case ">play":
                opentab(myYoutubeList[Math.floor(Math.random() * myYoutubeList.length)]);
                q.value = ">";
                break;
            case ">custom":
                var val = prompt("Enter command name and link to go to, separated by a ';;;'.", "website;;;https://website.com");
                if (localStorage.getItem("customcommands") == null) {
                    localStorage.setItem("customcommands", val);   
                }
                else {
                    localStorage.setItem("customcommands", localStorage.getItem("customcommands") + "|||" + val);
                }
                break;
            default:
                var qb = localStorage.getItem("customcommands").split("|||");
                var qbdic = {}; // turn custom commands into dictionary for easy reading
                for (var i = 0; i < qb.length; i++) {
                    qbdic[qb[i].split(";;;")[0]] = qb[i].split(";;;")[1];
                }
                if (qbdic[q.value.replace(">", "")] != undefined) {
                    opentab(qbdic[q.value.replace(">", "")]);
                }
                q.value = ">";
                break;
        }
    }
    else if (e.code == "Backspace" && q.value == ">") {
        e.preventDefault();
        e.stopPropagation();
    }
});
