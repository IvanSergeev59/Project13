const User= require("../models/user");

module.exports.getUsers = (req, res) => {
    User.find({})
    .then(user => res.send({ data:user}))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
    };
module.exports.getUsersId   = (req,res) => {
	User.findById(req.params.userId)
	.then(user=> {
		if(!user) {
			res.status(404).send({message: "Пользователя с не существует!"});
		} else {
			res.send({data:user});
		}
	})
	.catch((err) => {
		if(err.message.indexOf("Cast to ObjectId failed")===0) {
			res.status(404).send({message:"Неправильный id"});
			return;
		}
	
});
};   
module.exports.createUser = (req,res) => {
        const {name, about, avatar} = req.body;
        User.create({name, about, avatar})
        .then(user=>res.send({date:user}))
        .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
      };