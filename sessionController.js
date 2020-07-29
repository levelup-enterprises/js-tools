/////////////////////////////////
// Check for Session
//////////////////////////////////

if (event.session !== false) {
  /**
   * Check if local and session var exist
   * @param sessionName Name of storage values
   *
   * If session exist return true
   * if local exist, check if expired, return results
   */
  var sessionCheck = function sessionCheck(sessionName) {
    try {
      let send = false;
      const currentSession = sessionStorage.getItem(sessionName) || false,
        localSession = localStorage.getItem(sessionName) || false;
      // --------------------------------------------------------------------
      // Check local storage
      if (localSession !== false) {
        let now = new Date();
        now.getDate() >= localSession && (send = true);
      }
      // Check session storage
      currentSession && (send = true);

      return send;
    } catch (e) {
      console.log(e);
    }
  };
}

//////////////////////////////////
// Set Session
//////////////////////////////////

if (event.session !== false) {
  /**
   * Set local and session var
   * @param daysExpire Expires in number of days
   * @param sessionName Name of storage values
   */
  var sessionSet = function sessionSet(daysExpire, sessionName) {
    try {
      let now = new Date(),
        expires = new Date();
      // --------------------------------------------
      expires.setDate(now.getDate() + daysExpire);
      window.sessionStorage.setItem(sessionName, true);
      window.localStorage.setItem(sessionName, expires.getTime());
    } catch (e) {
      console.log(e);
    }
  };
}
