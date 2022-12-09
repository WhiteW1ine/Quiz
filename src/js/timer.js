let seconds = 5; 

let tempSeconds = seconds;


const setSeconds = (s) => {
document.querySelector("#seconds").textContent = s + "s";
};


// Update the count down every 1 second
var x = setInterval(() => {
//clears countdown when all seconds are counted
if (seconds <= 0) {
    clearInterval(x);
}       
setSeconds(tempSeconds == 60 ? 59 : tempSeconds);
seconds--;
tempSeconds = seconds;
}, 1000);