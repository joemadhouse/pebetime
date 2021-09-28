async function getInfo(){
    const res = await fetch('https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=AEL&sta=AIR')
    const json = await res.json()

    const STA_NAME={
        AWE:"博覽館",
        HOK:"香港"
    }

    let currentTimeStamp= new Date()

    const info = json.data['AEL-AIR'].UP
    
    console.log(json);
    document.getElementById("destination").innerHTML=STA_NAME[info[0].dest]
    document.getElementById("platform").innerHTML=info[0].plat
    document.getElementById("time").innerHTML=info[0].time

    document.getElementById("inone").innerHTML=
    `<div>${STA_NAME[info[0].dest]} ${info[0].plat} ${info[0].time}</div>`

    console.log(time)
}

getInfo();
