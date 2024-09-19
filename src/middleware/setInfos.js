exports.setInfos = (req, res, next) => {
	if (!req.body.user) req.body.user = req.user._id
	if (!req.body.accountId) req.body.accountId = req.params.accountId
	next()
}
