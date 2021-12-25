const Item = require('../models/Item');

exports.homePage = async (req, res, next) => {
	if (req.session.isLoggedIn) {
		const items = [];
		const itemsObj = await Item.findAll({
			where: {
				buyer: req.session.user.id
			}
		});

		itemsObj.forEach(item => {
			items.push(item.dataValues);
		});

		res.render('home', {
			items: items,
			user: req.session.user.fullName
		});
	} else {
		res.render('welcome');
	}
};

exports.redirect = async (req, res, next) => {
	console.log(req);
	console.log("ID", req.params.id)

	const i = await Item.findOne({
		where: {
			qrCode: req.params.id
		}
	});

	if (i == null) {
		res.redirect('/welcome');
	} else {
		res.redirect(i.dataValues.redirectTo);
	}
}