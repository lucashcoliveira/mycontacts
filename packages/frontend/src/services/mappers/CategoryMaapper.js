class CategoryMaapper {
  toPersistente(domainCategory) {
    return {
      cateogry: {
        category_id: domainCategory.id,
        category_name: domainCategory.name,
      },
    };
  }

  toDomain(persistenceCategoty) {
    return {
      id: persistenceCategoty.id,
      name: persistenceCategoty.name,
    };
  }
}

export default new CategoryMaapper();
