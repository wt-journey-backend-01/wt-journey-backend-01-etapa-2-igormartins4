function errorResponse(res, status, message, errors = []) {
  res.status(status).json({
    status,
    message,
    errors,
  });
}

export { errorResponse };
