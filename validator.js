$(function () {
  // Title: Form Validation
  // Desc: Handles validation for form data
  // Dependencies: jQuery < 2.1
  // Author: Tommy Wheeler
  // Version: 1.7
  // Created: 8/16/19

  /** -----------------
   *# Validator
   * ------------------
   *? HOW IT WORKS
   * The validator is called during form submission and returns a value of FALSE if there are
   *  any non-valid entries.
   *
   * Pass the submitting form element to validate only the supplied form.
   * * The alternative is to have all forms validated (ideally an element
   **     should always be passed).
   *
   *  First - the validator takes the provided form ID and checks if all required inputs
   *          are not empty, if they are empty it adds a span with the error.
   *  Second - the validator checks if unique inputs are valid
   *           (phone, email, radio, pattern, signature).
   *           * To validate without requiring, only add unique data attribute (data-email).
   *  Third - if all pass then a value of TRUE is returned.
   *
   *? SETUP
   * Add dataText (custom attr) to all empty fields that require validation.
   * For each type that requires unique validation add an additional data field
   *  (data-email, data-phone...).
   * * Create a custom css tag for styling non-valid inputs (.not-valid is the default tag)
   *
   *? RADIO
   *  Radio requires a wrapper (.required-radio is the default tag) be placed around the entire
   *   group that needs to be validated.
   *
   *? Pattern
   *  If a pattern attr is available the field will be tested against the regex value.
   *
   *? SIGNATURE
   *  Signature requires a wrapper to be placed around the capture element.
   *
   *? MODIFICATIONS
   *  The validator is designed to be easily modified for different applications
   *
   * @param {string} form
   */
  formValidate = function formValidate(form = false) {
    // If no form value passed
    !form && (form = $("form"));

    // Input data attributes defaults
    var dataText = "data-parsley-error-message", // For required inputs
      dataPhone = "validate-phone", // For required phone inputs
      dataRadio = "validate-radio", // For required radio inputs
      dataSelect = "validate-select", // For required select inputs
      dataCheckbox = "validate-checkbox", // For required checkbox input
      dataEmail = "validate-email", // For required email inputs
      dataPattern = "data-parsley-pattern", // For required pattern match
      dataSign = "validate-signature", // For required signature inputs
      dataLength = "validate-length", // Check for min length
      customMessage = "data-parsley-error-message", // Check for custom message
      // Identifier classes and wrappers
      style = "validator-error-message", // Custom class for form errors
      radioWrapper = $(".required-radio"), // Radio group wrapper
      // Error display
      defaultText = " required",
      defaultPhone = "Valid phone number required",
      defaultEmail = "Valid email address required",
      defaultRadio = "make a selection",
      defaultSelect = "make a selection",
      defaultPattern = "Not a valid format",
      defaultSign = "Valid signature required",
      defaultMin = "Minimum length not met",
      defaultMax = "Maximum length exceeded",
      // Regex
      phoneRegex = new RegExp(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
      ),
      emailRegex = new RegExp(
        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
      );

    // Clear existing alerts
    clearAlerts();

    function validatePattern() {
      var pattern = form.find("*[" + dataPattern + "]");
      if (pattern.length > 0) {
        if (pattern.val() !== "") {
          var patternReg = new RegExp(pattern.attr(dataPattern));
          if (patternReg.test(pattern.val()) === false) {
            pattern.val("");
            var text = pattern.attr(customMessage)
              ? pattern.attr(customMessage)
              : defaultPattern;
            addAlert(pattern.attr("id"), text), pattern.focus();
            return false;
          }
          return true;
        }
      }
    }

    function validatePhone() {
      var phone = form.find("*[type='tel'][ " + dataText + "]");
      if (phone.length > 0) {
        if (phone.val() !== "") {
          if (phoneRegex.test(phone.val()) === false) {
            // phone.val(""),
            addAlert(phone.attr("id"), defaultPhone), phone.focus();
            return false;
          }
          return true;
        }
      }
    }

    function validateEmail() {
      var email = form.find("*[type='email'][ " + dataText + "]");
      if (email.length > 0) {
        if (email.val() !== "") {
          if (emailRegex.test(email.val()) === false) {
            // email.val(""),
            addAlert(email.attr("id"), defaultEmail), email.focus();
            return false;
          }
          return true;
        }
      }
    }

    function validateRadio() {
      var radio = form.find("*[" + dataRadio + "]");
      if (radio.length > 0) {
        var group = radio.attr("name"),
          checked = $("input:radio[name=" + group + "]:checked").val();
        if (checked === undefined) {
          addAlert(radio.attr("name"), defaultRadio), radioWrapper.focus();
          return false;
        }
        return true;
      }
    }

    function validateSelect() {
      var select = form.find("*[" + dataSelect + "]");
      if (select.val() === "") {
        addAlert(select.attr("id"), defaultSelect), select.focus();
        return false;
      } else {
        return true;
      }
    }

    function validateCheckbox() {
      var box = form.find("*[" + dataCheckbox + "]");

      if (box.length > 0) {
        var group = box.attr("name"),
          checked = $("input:checkbox[name=" + group + "]:checked").val();

        if (checked === undefined) {
          console.log(box);
          addAlert(box.attr("name")), box.focus();
          return false;
        }

        return true;
      }
    }

    function validateSign() {
      var sign = form.find("*[" + dataSign + "]");
      if (sign.length > 0) {
        if (sign.val() === "") {
          addAlert(sign.attr("id"), defaultSign), sign.focus();
          return false;
        }
        return true;
      }
    }

    function validateLength() {
      var min = $(minLength);
      if (min.length < min.attr("validate-min-length")) {
        min.val(""), addAlert(min.attr("id"), defaultMin), min.focus();
        return false;
      } else {
        return true;
      }
    }

    function clearAlerts() {
      try {
        form.find("." + style).remove();
      } catch (e) {
        console.log(e);
      }
    }

    function customMessage() {
      if (customMessage) {
        dataText.attr(customMessageTxt) &&
          (defaultText = dataText.attr(customMessageTxt));
        dataEmail.attr(customMessageTxt) &&
          (defaultEmail = dataEmail.attr(customMessageTxt));
        dataPhone.attr(customMessageTxt) &&
          (defaultPhone = dataPhone.attr(customMessageTxt));
        dataRadio.attr(customMessageTxt) &&
          (defaultRadio = dataRadio.attr(customMessageTxt));
        dataSelect.attr(customMessageTxt) &&
          (defaultSelect = dataSelect.attr(customMessageTxt));
        dataSign.attr(customMessageTxt) &&
          (defaultSign = dataSign.attr(customMessageTxt));
        minLength.attr(customMessageTxt) &&
          (defaultMin = minLength.attr(customMessageTxt));
        maxLength.attr(customMessageTxt) &&
          (defaultMax = maxLength.attr(customMessageTxt));
      }
    }

    function addAlert(field) {
      var message =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : null; // Check if jquery or js

      typeof field === "string" ? (field = field) : (field = field.id); // Get label and append validator holder

      !message && (message = $("#" + field).attr(customMessage) || defaultText);

      try {
        var label = form.find("label[for='" + field + "']");
        // message === null && (message = defaultText);
        label.after("<span class='" + style + "'>" + message + "</span>");
      } catch (e) {
        console.log(e);
      }
    }

    function ieCheck() {
      var msie = window.navigator.userAgent.indexOf("MSIE") || false,
        trident = window.navigator.userAgent.indexOf("Trident") || false,
        isIE = false;

      msie > 0 && (isIE = true);
      trident > 0 && (isIE = true);

      return isIE;
    }

    var fields = form.find("*[" + dataText + "]");

    //  Validate all data-required fields
    try {
      var validate = function (fields) {
        var valid = {
            empty: true,
            email: true,
            phone: true,
            radio: true,
            select: true,
            pattern: true,
            box: true,
            sign: true,
            min: true,
          },
          focus = [];

        for (var i = 0; i < fields.length; i++) {
          fields[i].value === "" &&
            (focus.push(fields[i]), addAlert(fields[i]), fields[i].focus());
        }

        focus.length !== 0 && (focus[0].focus(), (valid.empty = false));
        valid.empty && (valid.phone = validatePhone());
        valid.empty && (valid.email = validateEmail());
        valid.empty && (valid.radio = validateRadio());
        valid.empty && (valid.select = validateSelect());
        valid.empty && (valid.pattern = validatePattern());
        valid.empty && (valid.box = validateCheckbox());
        valid.empty && (valid.sign = validateSign());
        // valid.empty && (valid.min = validateMinLength());
        return valid;
      };
    } catch (e) {
      console.log(e);
    }
    //  Check for any false values in 'valid' array
    try {
      if (!ieCheck()) {
        //  Check for any false values in 'valid' array
        if (Object.values(validate(fields)).indexOf(false) < 0) {
          return true;
        } else {
          return false;
        }
      } else {
        // For ie support
        var obj = validate(fields);
        if (
          Object.keys(obj)
            .map(function (e) {
              return obj[e];
            })
            .indexOf(false) < 0
        ) {
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
});
