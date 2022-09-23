import {PermissionsAndroid, Platform} from 'react-native';
import {TboxContacts} from 'tbox-commons';

export default class Contact {
  contacts = [];

  getContactsAndroid = async params => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return await TboxContacts.getAllContacts(params);
      }
      return Promise.reject(granted);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  getContacts = async params => {
    try {
      this.contacts = await Platform.select({
        ios: () => TboxContacts.getAllContacts(params),
        android: () => this.getContactsAndroid(params),
      })();
      return this.contacts;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  choosePhoneContact = async data => TboxContacts.choosePhoneContact(data);

  openContactForm = async data => TboxContacts.openContactForm(data);

  addToExistingContact = async data => TboxContacts.addToExistingContact(data);
}
