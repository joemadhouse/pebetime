async function getInfo(){



    const res = await fetch('https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TML&sta=TIS')
    const json = await res.json()

    const STA_NAME={
        AWE:"博覽館",
        HOK:"香港",
        TIS:"天水圍",
        WKS:"烏溪沙"
    }



    const info = json.data['TML-TIS'].DOWN
    
    const currentTime = json.curr_time.replace(/-/g,"/");
    const targetTime = info[0].time.replace(/-/g,"/");
    // .replace("x", "y") turn the first x in the sring into y
    // .replace(/x/g, "y") turn all the x in the string into y, g representing global.
    const currentTimeStamp = new Date(currentTime).getTime();
    const targetTimeStamp = new Date(targetTime).getTime();
    const timeLeft = Math.ceil((targetTimeStamp-currentTimeStamp)/1000/60);
    console.log(timeLeft)

    console.log(json);
    //document.getElementById("destination").innerHTML=STA_NAME[info[0].dest]
    //document.getElementById("platform").innerHTML=info[0].plat
    //document.getElementById("time").innerHTML=info[0].time

    //document.getElementById("inone").innerHTML=
    //`<div>往 ${STA_NAME[info[0].dest]} 月台:${info[0].plat} 到站時間:${info[0].time} <b>${timeCal(currentTime, info[0].time, "First")}</b></div>
    //<div>往 ${STA_NAME[info[1].dest]} 月台:${info[1].plat} 到站時間:${info[1].time}  <b>${timeCal(currentTime, info[1].time, "Second")}</b></div>
    //<div>往 ${STA_NAME[info[2].dest]} 月台:${info[2].plat} 到站時間:${info[2].time}  <b>${timeCal(currentTime, info[2].time, "Thrid")}</b></div>
    //<div>往 ${STA_NAME[info[3].dest]} 月台:${info[3].plat} 到站時間:${info[3].time}  <b>${timeCal(currentTime, info[3].time, "Fourth")}</b></div>`

    let TrainData = ""
    for (let i of info){
        TrainData += `<div>往 ${STA_NAME[i.dest]} 月台:${i.plat} 到站時間:${i.time} <b>${timeCal(currentTime, i.time, i.seq)}</b></div>`
    }
    document.getElementById("inone").innerHTML=TrainData

    
}

function timeCal(now, target, trainCall){
    const currentTimeStamp = new Date(now.replace(/-/g,"/")).getTime();
    const targetTimeStamp = new Date(target.replace(/-/g,"/")).getTime();
    const timeLeft = Math.ceil((targetTimeStamp-currentTimeStamp)/1000/60);

    if (timeLeft === 0){
        return `The train is departing`
    }else if(timeLeft <= 2){
        return `The train is approaching`
    }else {
        return `Train ${trainCall} will arrive in ${timeLeft} minutes`
    }

}
 
getInfo();
