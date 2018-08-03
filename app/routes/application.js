import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service('session'),

  actions : {
    invalidateSession() {
      console.log("invalidating session");
      this.get('session').invalidate();
    }
  }
});
