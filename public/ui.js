ui = (function() {
  var self = function (id) {
    return document.getElementById(id);
  };

  self.setOfferingDetails = function(text) {
    self('quickstart-offering-details').textContent = text; 
  };

  self.onClick = function(id, func) {
    self(id).addEventListener('click', func, false);
  };
  return self;
})();
