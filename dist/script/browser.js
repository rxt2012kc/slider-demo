function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
    return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}//myBrowser() end
//以下是调用上面的函数
function showBrowser() {
    var mb = myBrowser();
    if ("IE" == mb) {
        console.log("我是 IE");
        logs += "browser: IE\n";
    }
    if ("FF" == mb) {
        console.log("我是 Firefox");
        logs += "browser: Firefox\n";
    }
    if ("Chrome" == mb) {
        console.log("我是 Chrome");
        logs += "browser: Chrome\n";

    }
    if ("Opera" == mb) {
        console.log("我是 Opera");
        logs += "browser: Opera\n";

    }
    if ("Safari" == mb) {
        console.log("我是 Safari");
        logs += "browser:Safari\n";
    }
}
