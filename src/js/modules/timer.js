export class Timer {

    #duration 

    constructor(duration) {
      this.duration = duration;
    }
  
    start() {
      var countDownDate = new Date().getTime() + this.duration*1000;
  
      var x = setInterval(() => {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (seconds >=  0 ) {
            document.getElementById("seconds").innerHTML = seconds + "s ";
        }

        if (distance <= 1) {
            clearInterval(x);
          }

  

      }, 1000);
    }
  }