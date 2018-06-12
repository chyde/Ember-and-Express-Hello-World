import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addPizza() {
      var name = this.get('pizzaName');
      var desc = this.get('pizzaDescription');
      // TODO: add validation
      var newPizza = this.store.createRecord('pizza', {
        name: name,
        description: desc
      });

      newPizza.save();
    },

    deletePizza(pizzaId) {
      this.store.findRecord('pizza', pizzaId, {
          backgroundReload: false
        })
        .then(function(pizza) {
          pizza.deleteRecord();
          console.log("isDelet", pizza.get('isDeleted')); // => true
          pizza.save(); // => DELETE to /posts/1
        });
    }
  }
});