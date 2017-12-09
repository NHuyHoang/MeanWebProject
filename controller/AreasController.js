const AreasService = require('../services/AreasService');

module.exports = {
    getChildArea:(req, res) => {
        let id = req.body.id;
        if(!id) res.json("invalid.id");
        else
            AreasService.getChildArea(id).then((data) => {
                res.send(data);
            })
    },
    getAll:(req,res) =>{
        return AreasService.getAll()
            .then(data => {
                res.send(data);
            });
    }
}