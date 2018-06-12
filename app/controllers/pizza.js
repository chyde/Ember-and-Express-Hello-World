import Controller from '@ember/controller';

export default Controller.extend({
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
    }
  }
});
