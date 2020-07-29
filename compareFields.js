///////////////////////////////////////
// Compare Input Fields
//////////////////////////////////////

/**
 * Compare while typing another field and display error if not
 */
$("#EmailAddressVerify, #EmailAddress").on("keyup", function() {
  var verify = $("#EmailAddressVerify").val(),
    original = $("#EmailAddress").val(),
    label = $("label[for='" + $("#EmailAddressVerify").attr("id") + "']"),
    message = "Emails do not match",
    className = "validator-holder",
    style = "not-valid";

  try {
    if (verify !== "") {
      if (
        verify === "" ||
        !original.startsWith(verify) ||
        !verify.startsWith(original)
      ) {
        if (
          !label
            .parents()
            .children()
            .hasClass(className)
        ) {
          label.after(
            "<span class='" +
              className +
              " " +
              style +
              "'>&nbsp; " +
              message +
              "</span>"
          );
        }
      } else {
        label
          .parents()
          .children("." + className)
          .remove();
      }
    } else {
      original === "" &&
        verify === "" &&
        label
          .parents()
          .children("." + className)
          .remove();
    }
  } catch (e) {
    console.log(e);
  }
});
