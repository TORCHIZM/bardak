const res = require('express/lib/response');
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

exports.qrCode = (req, res, next) => {
	res.render('qrcode');
}

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
		return;
	}

	if (isValidHttpUrl(i.dataValues.redirectTo)) {
		res.redirect(i.dataValues.redirectTo);
	} else {
		res.render('showmessage', {
			message: i.dataValues.redirectTo
		});
	}
}

function isValidHttpUrl(string) {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;  
	}
	return url.protocol === "http:" || url.protocol === "https:";
}