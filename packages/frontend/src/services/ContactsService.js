import HttClient from './utils/HttClient';

class ContactsService {
  constructor() {
    this.HttClient = new HttClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.HttClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async ceateContact(contact) {
    return this.HttClient.post('/contacts', contact);
  }
}

export default new ContactsService();
