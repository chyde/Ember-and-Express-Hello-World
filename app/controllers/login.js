import Controller from '@ember/controller';

export default Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        console.log(reason.error);
      });

      console.log("Authenticating...");
    }
  }
});
