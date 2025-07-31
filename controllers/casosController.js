const Repository = require("../repositories/Repository")
const Validator = require("../utils/errorHandler")


const casosRepository = new Repository("casos")
const agentesRepository = new Repository("agentes")
const fields = ["titulo", "descricao", "status", "agente_id"]
const validator = new Validator(fields)

module.exports = {

    //GET /casos
    getCasos: async(req, res) => {
        const query = req.query;
      
        if (Object.keys(query).length > 0) {
          const filtered = casosRepository.filterByQuery(query);
          return res.json(filtered);
        }
      
        const all = await casosRepository.readAll();
        return res.json(all);
      },
    //GET /casos/:id
    getCasoById: async(req, res) => {
        
        const {id} = req.params
       
        const caso = await casosRepository.read({id: id})

        if (caso) {
          return res.json(caso)

        } else {
            res.status(404)
            res.json({message: "Caso não encontrado"})
        }
    },
    //POST /casos
    create: async(req, res) => {
        const body = req.body
        const isAgentValid = await agentesRepository.read({id: body.agente_id})
        if(!isAgentValid) {
            res.status(404)
            return res.json({message: "Agente não encontrado. Atribua o caso a um agente existente"})
        }
        const isBodyValid = validator.validateFields(body)
        if(!isBodyValid) {
        
            res.status(400)
            return res.json({message: `O corpo da requisição deve conter os seguintes campos: ${fields.join(" , ")}, e devem possuir valores válidos`})

        }
        const newCaso = await casosRepository.create(body)
        res.status(201)
        return res.json(newCaso)
    },
    updateById: async (req, res) => {

        const body = req.body
        const {id} = req.params
        if(req.method == "PATCH") {

            const keysArray = Object.keys(body)
            if(!Validator.isSubset(keysArray,fields)) {
                res.status(400)
                return res.json({message: "Campo(s) inválido(s)"})
            }
        //PUT
        } else {

            const isBodyValid = validator.validateFields(body)
            if(!isBodyValid) {
                res.status(400)
               return res.json({message: `O corpo da requisição deve conter os seguintes campos: ${fields.join(" , ")}`})
            }

        }
          

        const updatedCaso = await casosRepository.update(id, body)
        if(!updatedCaso ) {
            res.status(404)
            return res.json({message: "Caso não encontrado"})
        }
        res.status(200)
        return res.json(updatedCaso)


    },
    deleteById: async (req, res) => {
        const { id } = req.params;

        const wasRemoved = await casosRepository.remove(id)

        if (wasRemoved) {
        
            return res.status(204).send()

        } else {
            res.status(404)
            return res.json({ message: "Caso não encontrado" })
        }
    }

}