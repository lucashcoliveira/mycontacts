const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async show(request, response) {
    const { id } = request.params

    const category = await CategoriesRepository.findById(id)

    if(!category){
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category)
  }

  async update(request, response){
    const { id } = request.params;
    const { name } = request.body

    const nameExistis = await CategoriesRepository.findAll()
  }

  async delete(request, response){
    const { id } = request.params;

    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
