/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE agentes RESTART IDENTITY CASCADE');
  await knex('agentes').insert([
    {
      nome: "João Silva",
      dataDeIncorporacao: "2020-03-15",
      cargo: "inspetor"
    },
    {
      nome: "Maria Oliveira",
      dataDeIncorporacao: "2019-06-22",
      cargo: "delegada"
    },
    {
      nome: "Carlos Santos",
      dataDeIncorporacao: "2021-01-10",
      cargo: "investigador"
    }
  ])
};
