uiSelect = (function () {
    var self = function (id) { 
        var selectSelector = document.querySelector('#'+id);
        var select = new mdc.select.MDCSelect(selectSelector);
        
        return select.value;
    };

    self.setOfferingDetails = function (text) {
        self('offering-details').textContent = text;
    };
    return self;
})();
