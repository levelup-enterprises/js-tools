/**
 * Toggle form input disabled status
 * @param {element} enable jQuery element containing visible form inputs
 * @param  {element} disable jQuery element containing hidden form inputs
 *
 * Use false or null for enable when only disabling an element
 * Ex: toggleDisabled(false, element)
 */
function toggleDisabled(enable, disable = null) {
  try {
    // Form elements
    const types = ["input", "select", "textarea"];

    // Enable
    enable &&
      types.forEach(function (type) {
        enable.find(type).map(function () {
          $(this).prop("disabled", false);
        });
      });

    // Disable
    disable &&
      types.forEach(function (type) {
        disable.find(type).map(function () {
          $(this).prop("disabled", true);
        });
      });
  } catch (e) {
    console.log(e);
  }
}
