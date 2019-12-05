const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ date: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.deleteCards = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточки с id не существует!' });
      } else {
        res.delete({ data: card });
      }
    })
    .catch((err) => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0) {
        res.status(404).send({ message: 'Неправильный id' });
        return;
      }
      res.status(500).send({ message: err });
    });
};
