const Repository = require("../repositories/Repository")
const Validator = require("../utils/errorHandler")
const fields = ["nome", "dataDeIncorporacao", "cargo"]

const validator = new Validator(fields)
const repository = new Repository("agentes")
module.exports = {

    //GET /agentes
    getAgentes: async (req, res) => {
        const query = req.query;
      
        // if (Object.keys(query).length > 0) {
        //   const filtered = repository.filterByQuery(query);
        //   return res.json(filtered);
        // }
      
        const all = await repository.read(query);
        return res.json(all);
      },
    //GET /agentes/:id
    getAgenteById: async(req, res) => {
        
        const {id} = req.params
        const agente = await repository.read({id: id})

        if (agente) {
          return res.json(agente)

        } else {
            res.status(404)
            return res.json({message: "Agente não encontrado"})
        }
    },
    //POST /agentes
    create: async(req, res) => {
         const body = req.body
         const isBodyValid = validator.validateFields(body)
         if(!isBodyValid) {
            
            res.status(400)
            return res.json({message: validator.errorMessage})

         }
         const newAgente = await repository.create(body)
         res.status(201)
         return res.json(newAgente)
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
                return  res.json({message: validator.errorMessage})
            }

        }
            
        const updatedAgente = await repository.update(id, body)
        if(!updatedAgente ) {
            res.status(404)
            return res.json({message: "Agente não encontrado"})
        } else {
            res.status(200)
            return res.json(updatedAgente)
        }
        


    },
    deleteById: async (req, res) => {
        const { id } = req.params;

        const wasRemoved = await repository.remove(id)

        if (wasRemoved) {
        
            return res.status(204).send()

        } else {
            res.status(404)
            return res.json({ message: "Agente não encontrado" })
        }
    }

}
