function GetDateAndTime(){
    var timestamp = new Date().getTime();
    var date = new Date(timestamp);
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var datevalues = [
        date.getFullYear(),
        months[date.getMonth()], // + 1 if in number format
        date.getDate(),
        days[date.getDay()], // + 1 if in number format
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
    return datevalues;
};

function SetDateAndTime(){
    var DateDiv = document.getElementById("Date");
    var TimeDiv = document.getElementById("Time");
    var TimeStamp = GetDateAndTime();
    var Second = TimeStamp[6];
    var Minute = TimeStamp[5];
    var Hour = TimeStamp[4];
    if (Second.toString().length == 1){
        Second = "0" + Second
    };
    if (Minute.toString().length == 1){
        Minute = "0" + Minute
    };
    if (Hour > 12){
        Hour = (Hour - 12);
    } else if (Hour == 0){
        Hour = 12;
    };
    DateDiv.innerHTML = TimeStamp[3] + ", " + TimeStamp[1] + " " + TimeStamp[2] + ", " + TimeStamp[0];
    TimeDiv.innerHTML = Hour + ":" + Minute + ":" + Second;
    setTimeout(function(){
        setTimeout(SetDateAndTime(), 1);
    }, 1);
};

function DetectDevice(){
    var NavUserAgent = navigator.userAgent;
    var isMobile = {
        Android: function(){
            return NavUserAgent.match(/Android/i);
        },
        BlackBerry: function(){
            return NavUserAgent.match(/BlackBerry/i);
        },
        iOS: function(){
            return NavUserAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function(){
            return NavUserAgent.match(/Opera Mini/i);
        },
        Windows: function(){
            return NavUserAgent.match(/IEMobile/i);
        },
        Any: function(){
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        },
        Type: function(){
            return ((isMobile.Android() && 'Android') || (isMobile.BlackBerry() && 'BlackBerry') || (isMobile.iOS() && 'iOS') || (isMobile.Opera() && 'Opera') || (isMobile.Windows() && 'Windows') || "Desktop");
        }
    };
    return isMobile;
};

function SetDeviceDisplay(){
    var DeviceInformationDiv = document.getElementById('DeviceInformation');
    var DeviceTypeDiv = document.getElementById("DeviceType");
    DeviceTypeDiv.innerHTML = DetectDevice().Type();
};

window.onload = function(){
    function LoadDateAndTime(){
        var DeviceInformationDiv = document.getElementById('DeviceInformation');
        if (DeviceInformationDiv){
            SetDateAndTime();
        }
        else {
            setTimeout(LoadDateAndTime(), 50);
        };
    };
    LoadDateAndTime();
    SetDeviceDisplay();
};