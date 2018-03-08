db = (function() {
  class Table {
    constructor(db, tableName) {
      this.ref = db.ref.child(tableName);
    }

    put(offer) {
        var ref = this.ref.child(offer.year).child(offer.month).child(offer.day);
        var key = ref.push().key;

        var updates = {};
        updates[key] = offer;
        ref.update(updates);
    }

    map_of(func, prefix) {
      var ref = this.ref;
      if (prefix !== undefined) {
        ref = ref.child(prefix);
      }
      var depth = ref.path.n.length;
      ref.once('value').then(function(container) {
        var snapshot = container.val();
        if (!snapshot) {
          return [];
        }
        var offers = [snapshot].multiFlatten(5 - depth, Object.values);
        func(offers);
      });
    }

    of(prefix) {
      return {
        map: (func) => {
          this.map_of(func, prefix);
        }
      };
    }

    map(func) {
      this.map_of(func);
    }
  }

  class DB {
    constructor() {
      this._ = firebase.database();
      this.ref = this._.ref();
      this.offer = new Table(this, 'offer');
    }
  }
  return new DB();
})();
