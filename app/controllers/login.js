import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  actions: {
    authenticate() {
      const credentials = this.getProperties('identification', 'password');

      console.log(credentials);
      this.get('session').session.authenticate('authenticator:oauth2', credentials)
      .catch((reason) => {
        console.log("FUCK", reason.error);
      });

      console.log("Authenticating...");
    }
  }
});
