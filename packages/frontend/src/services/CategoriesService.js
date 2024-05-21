import HttClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttClient = new HttClient('http://localhost:3001');
  }

  async listCategories() {
    return this.HttClient.get('/categories');
  }
}

export default new CategoriesService();
