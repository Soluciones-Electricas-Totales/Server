const setBelongsToInstallation = (req, res, next) => {

    res.locals.setBelongsTo = "Installation";

    next();
};

export default setBelongsToInstallation;