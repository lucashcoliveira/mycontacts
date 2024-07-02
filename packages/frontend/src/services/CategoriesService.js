import CategoryMaapper from './mappers/CategoryMaapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categories = await this.HttpClient.get('/categories');

    return categories.map(CategoryMaapper.toDomain);
  }

  async getCategory() {
    const categories = await this.HttpClient.get('/categories');

    return CategoryMaapper.toPersistente(categories);
  }
}

export default new CategoriesService();
