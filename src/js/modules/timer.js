let seconds = 15; 

let tempSeconds = seconds;


const setSeconds = (s) => {
document.querySelector("#seconds").textContent = s + "s";
};


let x = setInterval(() => {
    if (seconds <= 0) {
        clearInterval(x);
    }       
    setSeconds(tempSeconds == 60 ? 59 : tempSeconds);
    getSeconds(tempSeconds)
    seconds--;
    tempSeconds = seconds;
}, 1000);   


const getSeconds = (s) => {
    console.log(s)
    return s;
    };
