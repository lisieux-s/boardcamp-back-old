export default function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body);

    if (validation.error) {
      console.log(validation.error);
      return res.sendStatus(400);
    }

    next();
  };
}
