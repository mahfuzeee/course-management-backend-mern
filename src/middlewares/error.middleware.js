export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 400;
  res
    .status(status)
    .json({ message: err.message || "Something went wrong", stack: err.stack });
};
