import Controller from '@ember/controller';

export default Controller.extend({
  editingId : undefined,

  actions: {
    addPizza () {
      var name = this.get('pizzaName');
      var desc = this.get('pizzaDescription');
      // TODO: add validation
      var newPizza = this.store.createRecord('pizza', {
        name: name,
        description: desc
      });

      newPizza.save();
    },

    deletePizza (pizzaId) {
      this.store.findRecord('pizza', pizzaId, { backgroundReload: false }).then(function(pizza) {
        pizza.destroyRecord(); 
      });
    },

    editPizza (pizzaId) {
      console.log(pizzaId, this.get('editingId'));
      this.set('editingId', pizzaId);
      console.log(pizzaId, this.get('editingId'));
    },

    updatePizza (pizza) {
      this.store.findRecord('pizza', pizza.id, { backgroundReload: false }).then(function(pizza) {
        pizza.save().then(function(pizza){
          console.log("Saved", pizza.get('name'));
        });
      });
      this.set('editingId', undefined);
    },

    reloadPizza (pizza) {
      this.store.findRecord('pizza', pizza.id, { backgroundReload: false }).then(function(pizza) {
        pizza.rollbackAttributes();
      });
      this.set('editingId', undefined);
    }
  }
});
