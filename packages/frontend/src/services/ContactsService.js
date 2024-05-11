import HttClient from './utils/HttClient';

class ContactsService {
  constructor() {
    this.HttClient = new HttClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.HttClient.get(`/contacts?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
