import joi from 'joi';

const gameSchema = joi.object({
  name: joi.required(),
  stockTotal: joi.integer().greater(0).required(),
  pricePerDay: joi.number().greater(0).required()
});

export default gameSchema;