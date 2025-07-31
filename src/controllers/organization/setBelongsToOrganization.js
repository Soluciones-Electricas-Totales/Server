const setBelongsToOrganization = (req, res, next) => {

    res.locals.setBelongsTo = "Organization";

    next();
};

export default setBelongsToOrganization;