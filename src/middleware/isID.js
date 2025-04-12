const isID = (req, res, next) => {
  const { id } = req.params

  if (isNaN(Number(id))) {
    return res.status(400).send('ID должен быть числом')
  }

  next()
}

export default isID
