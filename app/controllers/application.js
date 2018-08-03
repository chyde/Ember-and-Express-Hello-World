import Controller from '@ember/controller';

export default Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
