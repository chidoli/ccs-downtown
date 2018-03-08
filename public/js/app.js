app = (function () {
    class App {
        putOffer() {
            if (firebase.auth().currentUser) {
                db.offer.put({
                    year: uiDate('year'),
                    month: uiDate('month'),
                    day: uiDate('day'),
                    name: ui('name').value,
                    type: uiSelect('type'),
                    method: uiSelect('method'),
                    amount: ui('amount').value
                });

                // this.refreshOffers();
            }
        }

        allOffers() {
            if (firebase.auth().currentUser) {
                db.offer.map((offers) => {
                    var csv = this.offersToCsv(offers);
                    ui.setOfferingDetails(csv);
                });
            }
        }

        latestPrefix() {
            var now = new Date();
            return now.getFullYear() + '/' + pad(now.getMonth() + 1, 2);
        }

        latestOffers() {
            if (firebase.auth().currentUser) {
                var prefix = this.latestPrefix();
                db.offer.of(prefix).map((offers) => {
                    var csv = this.offersToCsv(offers);
                    ui.setOfferingDetails(csv);
                });
            }
        }

        clearOffers() {
            ui.setOfferingDetails("");
        }

        downloadOffers(offers) {
            if (firebase.auth().currentUser) {
                var csv = this.offersToCsv(offers);
                downloadAsFile("offering.csv", csv);
            }
        }

        downloadLatestOffers() {
            var prefix = this.latestPrefix();
            db.offer.of(prefix).map((offers) => this.downloadOffers(offers));
        }

        offerToCsvRow(offer) {
            return [
        offer.year,
        offer.month,
        offer.day,
        offer.name,
        offer.method,
        offer.amount
      ].join(',');
        }

        offersToCsv(offers) {
            return offers.map(o => this.offerToCsvRow(o)).join("\n");
        }
    }
    return new App();
})();
