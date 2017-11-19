const CatesService = require('../services/CategoriesService');

module.exports = {
    getById:(req,res)=>{
        let id = req.body.id;
        if(!id) res.send({message:"invalid id"});
        CatesService.getById(id).then((data)=>{
           res.send(data);
        })
    }
}