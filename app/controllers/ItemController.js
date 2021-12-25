const Item = require('../models/Item');
const validator = require('validator');

exports.addPage = async (req, res, next) => {
    res.render('add');
};

exports.editPage = async (req, res, next) => {
	console.log("id:", req.query.id);

	const i = await Item.findOne({
		where: {
			id: req.query.id,
			buyer: req.session.user.id
		}
	});

    res.render('edit', {
		item: i.dataValues
	});
};


exports.add = async (req, res, next) => {
    const validationErrors = [];

	if (validator.isEmpty(req.body.qrCode)) validationErrors.push('QR Kod alanı boş olamaz.');
	if (validator.isEmpty(req.body.redirectTo)) validationErrors.push('Yönlendirme alanı boş olamaz.');
	if (validationErrors.length) {
		req.flash('error', validationErrors);
		return res.redirect('/add');
	}
	Item.findOne({
		where: {
			qrCode: req.body.qrCode
		}
	}).then(result => {
		if(result) {
			req.flash('error', 'Bu kodu alamazsınız.');
			req.flash('oldInput', {qrCode: req.body.qrCode});
			return res.redirect('/add');
		} else {
			Item.create({ buyer: req.session.user.id, qrCode: req.body.qrCode, redirectTo: req.body.redirectTo });
			return res.redirect('/home');
		}
	})
	.catch(err => console.log(err));
};

exports.edit = async (req, res, next) => {
    const validationErrors = [];

	if (validator.isEmpty(req.body.qrCode)) validationErrors.push('QR Kod alanı boş olamaz.');
	if (validator.isEmpty(req.body.redirectTo)) validationErrors.push('Yönlendirme alanı boş olamaz.');
	if (validationErrors.length) {
		req.flash('error', validationErrors);
		return res.redirect('/edit');
	}
	Item.findOne({
		where: {
			qrCode: req.body.qrCode,
			buyer: req.session.user.id
		}
	}).then(result => {
		result.redirectTo = req.body.redirectTo;
		result.save();
		return res.redirect('/home');
	})
	.catch(err => console.log(err));
};