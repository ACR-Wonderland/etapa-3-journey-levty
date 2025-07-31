/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable("agentes", (table) => {
        table.increments("id").primary();
        table.string("nome").notNullable();
        table.string("dataDeIncorporacao").notNullable();
        table.string("cargo").notNullable();
      })
      .then(() => {
        return knex.schema.createTable("casos", (table) => {
          table.increments("id").primary();
          table.string("titulo").notNullable();
          table.string("descricao").notNullable();
          table.string("status").notNullable();
  
          table.integer("agente_id").unsigned();
  
          
          table
            .foreign("agente_id")
            .references("id")
            .inTable("agentes")
            .onDelete("CASCADE");
        });
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("casos")
      .then(() => knex.schema.dropTableIfExists("agentes"));
  };
  
