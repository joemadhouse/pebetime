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
    console.log(info[0].time)

    console.log(json);
    document.getElementById("destination").innerHTML=STA_NAME[info[0].dest]
    document.getElementById("platform").innerHTML=info[0].plat
    document.getElementById("time").innerHTML=info[0].time

    document.getElementById("inone").innerHTML=
    `<div>${STA_NAME[info[0].dest]} ${info[0].plat} ${info[0].time} Next Train will be arrived in <b>${timeLeft}</b> minutes</div>`


}

getInfo();
