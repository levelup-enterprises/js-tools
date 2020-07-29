/////////////////////////////////////////////
// Check for valid zipcodes based on state
/////////////////////////////////////////////

window.selectedState = $("#state").val();

/** ------------------------
 *? Load zip-codes
 * -------------------------
 * Return json array
 *  associated with state.
 * @method SYNCHRONOUS
 */
function loadZips() {
  try {
    $.ajax({
      url: "/zipcodes/" + window.selectedState + ".json",
      dataType: "json",
      async: false,
      success: function (data) {
        window.validZips = data;
      },
    });
  } catch (e) {
    console.log(e);
  }
}

// Run on page load
loadZips();

$("#state, #zipcode").change(function () {
  window.selectedState = $("#state").val();
  const zipcode = $("#zipcode").val();

  loadZips();

  if (zipcode !== "") {
    // Check if in array
    if ($.inArray(zipcode, window.validZips) >= 0) {
      // Is valid
      console.log("valid");
      $("#submit").attr("disabled", false);
      $("#serviceable").addClass("hide");
    } else {
      // Not valid
      console.log("not valid");
      $("#submit").attr("disabled", true);
      $("#serviceable").removeClass("hide");
    }
  } else {
    $("#serviceable").addClass("hide");
  }
});
