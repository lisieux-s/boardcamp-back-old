import joi from 'joi';

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi
    .string()
    .min(10)
    .max(11)
    .pattern(/^[0-9]+$/)
    .required(),
  cpf: joi
    .string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  birthday: joi.string().pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/).required()
});

export default customerSchema;
