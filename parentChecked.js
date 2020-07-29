/**
 * Auto apply checked class to label parent on click
 * Applies to radio inputs inside label elements
 *
 * Requires:
 * Label element and 'checked' class
 */

$(document).ready(function() {
  $(function() {
    // Run on input selection
    $("[type='radio']").change(function() {
      const label = $(this).parents("label"),
        siblings = label.siblings(),
        checked = label.siblings().hasClass("checked");

      try {
        // Remove checked from current row
        checked && siblings.removeClass("checked");

        //  Add checked to checked values
        if ($(this).is(":checked")) {
          $(this)
            .parents("label")
            .addClass("checked");
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
});
