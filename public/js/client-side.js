console.log("Up & running!");


const currentDate = document.getElementById("date")

const getCurrentDay = ()=>{
    let weekday = new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
}

const getCurrentTime = ()=>{

    let months = ["Jan", "Feb", "Mar","Apr", "May","June","July","Aug","Sept","Oct","Nov","Dec"];

    let currentData = new Date();
    let month = months[currentData.getMonth()+1];
    let date = currentData.getDate();
    
    let hour = currentData.getHours();
    let mins = currentData.getMinutes();

    let period = "AM"

    if (hour > 11) {
        period = "PM";
        if (hour > 12) hour -= 12;
    }

    if (mins < 10) {
        mins = "0"+mins;
    }
    return `${month}${date} | ${hour}:${mins}${period}`;
}

currentDate.innerHTML = getCurrentDay() + " | " + getCurrentTime();
