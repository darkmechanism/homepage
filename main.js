var autofocuscheck = true;
document.addEventListener("keydown", function(e) {
    if (autofocuscheck == true) {
        document.getElementsByClassName("terminal")[0].focus();
        e.preventDefault();
        e.stopPropagation();
        autofocuscheck = false;
    } 
})
function opentab(url) {
    window.open(url, '_blank').focus();
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
            case ">play":
                opentab(myYoutubeList[Math.floor(Math.random() * 66)]);
                q.value = ">";
                break;
            default:
                q.value = ">";
                break;
        }
    }
    else if (e.code == "Backspace" && q.value == ">") {
        e.preventDefault();
        e.stopPropagation();
    }
});
