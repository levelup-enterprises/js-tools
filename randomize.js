/**
 * Attach function to element to randomly order
 * children components.
 *
 * EX: $(element).randomize()
 */
$.fn.randomize = function(selector) {
  try {
    var $elems = selector ? $(this).find(selector) : $(this).children(),
      $parents = $elems.parent();

    $parents.each(function() {
      $(this)
        .children(selector)
        .sort(function() {
          return Math.round(Math.random()) - 0.5;
        })
        .detach()
        .appendTo(this);
    });

    return this;
  } catch (e) {
    console.log(e);
  }
};
