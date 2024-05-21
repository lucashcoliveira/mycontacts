import HttClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttClient = new HttClient('http://localhost:3001');
  }

  async listCategories() {
    return this.HttClient.get('/categoriess');
  }
}

export default new CategoriesService();
