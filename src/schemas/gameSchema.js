import joi from 'joi';

const gameSchema = joi.object({
  name: joi.string().required(),
  stockTotal: joi.number().integer().greater(0).required(),
  pricePerDay: joi.number().greater(0).required(),
  image: joi.string(),
  categoryId: joi.number()
});

export default gameSchema;