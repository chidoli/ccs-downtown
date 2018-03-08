uiDate = (function () {
    var self = function (id) {
        var ret;
        switch (id) {
            case "year":
                ret = new Date(document.getElementById("ymd").value).getUTCFullYear();
                break;
            case "month":
                ret = new Date(document.getElementById("ymd").value).getUTCMonth() + 1;
                break;
            case "day":
                ret = new Date(document.getElementById("ymd").value).getUTCDate();
                break;
        }
        return ret;
    };

    self.setOfferingDetails = function (text) {
        self('offering-details').textContent = text;
    };

    return self;
})();
