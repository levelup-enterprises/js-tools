/**
 * Checks for user agent values for ie and returns true if ie
 */
function ieCheck() {
  var msie = window.navigator.userAgent.indexOf("MSIE") || false,
    trident = window.navigator.userAgent.indexOf("Trident") || false,
    isIE = false;

  msie > 0 && (isIE = true);
  trident > 0 && (isIE = true);

  return isIE;
}
