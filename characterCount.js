///////////////////////////////////////
// Character counter
//////////////////////////////////////

/**
 * Get current character count in text field on keypress
 */
$("field").keyup(function() {
  $(`.max-count`).html($(this).val().length);
});
