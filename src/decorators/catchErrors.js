const catchErrors = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error("Error:", error);
      res.status(404).json({ message: error.message });
    }
  };
};

export default catchErrors;