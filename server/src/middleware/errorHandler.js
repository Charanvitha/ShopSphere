export function notFoundHandler(_request, response) {
  response.status(404).json({ success: false, message: 'Route not found.' });
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);
  response.status(error.status || 500).json({
    success: false,
    message: error.status ? error.message : 'An unexpected server error occurred.',
  });
}
