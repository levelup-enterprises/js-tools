// Title: Form Masks
// Desc: Mask phone and zip-code fields
// Dependencies: jQuery < 2.1
// Author: Tommy Wheeler
// Version: 0.2
// Created: 11/10/20

$("#phone, #phone_number, #phonenumber").keypress(function () {
  $(this).val(phone($(this).val()));
});

$("#zip, #zipcode, #Zipcode").keypress(function () {
  $(this).val(zip($(this).val()));
});

/** -------------------------------
 ** Mask and format phone value
 * --------------------------------
 * @param {string} n value to be converted
 * @param {integer} max limit the length - default 10
 */
function phone(n, max = null) {
  try {
    if (!n) return n;
    // Max limiter
    max ? (max = max) : (max = 9);
    // only allows 0-9 inputs
    n = n.replace(/[^\d]/g, "");
    // Prevent more than 10
    n = n.substring(0, max);
    if (n.length < 4) return n;
    if (n.length < 7) return n.slice(0, 3) + "-" + n.slice(3);
    return n.slice(0, 3) + "-" + n.slice(3, 6) + "-" + n.slice(6, 10);
  } catch (error) {
    console.log(error);
  }
}

/** -------------------------------
 ** Mask and format zip code value
 * --------------------------------
 * @param {string} n value to be converted
 * @param {integer} max limit the length - default 5
 */
function zip(n, max = null) {
  try {
    if (!n) return n;
    // Max limiter
    max ? (max = max) : (max = 4);
    // only allows 0-9 inputs
    n = n.replace(/[^\d]/g, "");
    // Prevent more than 8
    n = n.substring(0, max);
    if (n.length <= 4) return n;
    return n.slice(0, 5) + "-" + n.slice(5);
  } catch (error) {
    console.log(error);
  }
}
