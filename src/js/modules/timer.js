export class Timer {

    isRunning

  
    start(duration) {


      this.isRunning = true;


      let timeLeft = duration

        let downloadTimer = setInterval(function(){

        if(this.isRunning) {
          console.log(1)
           clearInterval(downloadTimer)
           this.isRunning = false;
        }
        
        if (timeLeft<= 0) {
          clearInterval(downloadTimer)
        }
        document.getElementById('seconds').innerHTML = timeLeft + 's';
        timeLeft -= 1;

      }, 1000);
    }


  }