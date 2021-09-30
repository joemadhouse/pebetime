async function getInfo(){
    const res = await fetch('https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=AEL&sta=AIR')
    const json = await res.json()

    const STA_NAME={
        AWE:"博覽館",
        HOK:"香港"
    }

    
    
    const info = json.data['AEL-AIR'].UP
    
    const currentTime = json.curr_time;
    const currentTimeStamp = new Date(currentTime).getTime();
    const targetTimeStamp = new Date(info[0].time).getTime();
    const timeLeft = Math.ceil((targetTimeStamp-currentTimeStamp)/1000/60);
    console.log(new Date());
    console.log(info[0].time);

    console.log(json);
    document.getElementById("destination").innerHTML=STA_NAME[info[0].dest]
    document.getElementById("platform").innerHTML=info[0].plat
    document.getElementById("time").innerHTML=info[0].time

    document.getElementById("inone").innerHTML=
    `<div>${STA_NAME[info[0].dest]} 月台:${info[0].plat} 到站時間:${info[0].time} <b>${timeCal(currentTime, info[0].time, "First")}</b></div>
    <div>${STA_NAME[info[1].dest]} 月台:${info[1].plat} 到站時間:${info[1].time}  <b>${timeCal(currentTime, info[1].time, "Second")}</b></div>`


}

function timeCal(now, target, trainCall){
    const currentTimeStamp = new Date(now).getTime();
    const targetTimeStamp = new Date(target).getTime();
    const timeLeft = Math.ceil((targetTimeStamp-currentTimeStamp)/1000/60);

    if (timeLeft === 0){
        return `The ${trainCall} train is departing`
    }else if(timeLeft <= 2){
        return `The ${trainCall} train is approaching`
    }else {
        return `The ${trainCall} train will arrive in ${timeLeft} minutes`
    }

}
 
getInfo();
