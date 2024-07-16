const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index (request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs)
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    // Gerando um hash do id para cadastrar a ong
    const id = await crypto.randomBytes(4).toString("HEX");

    await connection("ongs").insert({
      id: id,
      name: name,
      email: email,
      whatsapp: whatsapp,
      city: city,
      uf: uf,
    });

    return response.json({ id, ...request.body });
  },

  async delete (request, response){
    const { id } = request.params;

    const ongs = await connection("ongs").where("id", id).first();

    if( !ongs ){
      return response.status(401).json({ error : "Operation is not permitted..."})
    }

    await connection("ongs").where("id", id).delete();

    return response.status(204).send();
  }
};
