const db = require("../db/db")

class Repository {
  constructor(table) {
    this.table = table;
  }

  async create(object) {
    try {
      const created = await db(this.table).insert(object, ['*']);
      return created;
    } catch (error) {
      console.error("Erro:", error);
      return false;
    }
  }

  async readAll() {
    try {
      return await db(this.table).select("*");
    } catch (error) {
      console.error("Erro ao buscar todos:", error);
      return [];
    }
  }
  
  async read(query = {}) {
    try {
      const result = await db(this.table).where(query);
      const isSingular = Object.keys(query).length === 1 && 'id' in query;
      return isSingular ? result[0] : result;
    } catch (error) {
      console.error("Erro:", error);
      return null;
    }
  }

  async update(id, fieldsToUpdate) {
    try {
      const updated = await db(this.table)
        .where({ id })
        .update(fieldsToUpdate, ['*']);
      return updated[0];
    } catch (error) {
      console.error("Erro:", error);
      return false;
    }
  }

  async remove(id) {
    try {
      const deleted = await db(this.table)
        .where({ id })
        .del();
      return deleted > 0;
    } catch (error) {
      console.error("Erro:", error);
      return false;
    }
  }
}

module.exports = Repository;
