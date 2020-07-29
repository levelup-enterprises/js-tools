$(function() {
  // Check for valid user login
  const validSession = sessionStorage.getItem("survey") || false,
    timeOut = 30000; // 30 minutes
  let idleTime = 0;

  if (validSession) {
    //Increment the idle time counter every minute.
    setInterval(timerIncrement, timeOut);

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function(e) {
      idleTime = 0;
    });

    $(this).keypress(function(e) {
      idleTime = 0;
    });

    function timerIncrement() {
      if (idleTime > 0) {
        console.log("Do something");
      }
      idleTime++;
    }
  }
});
