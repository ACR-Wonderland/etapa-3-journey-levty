/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del()
  await knex('casos').insert([
    {
      titulo: "Roubo no centro",
      descricao: "Relato de furto de veículo próximo ao centro da cidade.",
      status: "aberto",
      agente_id: 1
    },
    {
      titulo: "Homicídio em bairro nobre",
      descricao: "Vítima encontrada sem vida em sua residência.",
      status: "solucionado",
      agente_id: 2
    },
    {
      titulo: "Tráfico de drogas",
      descricao: "Suspeitos presos com grandes quantidades de entorpecentes.",
      status: "aberto",
      agente_id: 3
    },
    {
      titulo: "Violência doméstica",
      descricao: "Denúncia de agressão física em ambiente familiar.",
      status: "aberto",
      agente_id: 1
    }
  ]);
};
