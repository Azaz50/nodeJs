import mongoose from "mongoose";
import Contact from "../models/contacts.models.js"


export const getContacts = async (req, res) => {
	// const contacts = await Contact.find();
	// res.render('home', { contacts })
	try{
		const {page = 1, limit = 3} = req.query;

		const options = {
			page : parseInt(page),
			limit : parseInt(limit)
		}
		const result = await Contact.paginate({}, options);

		res.render('home', {
		  totalDocs: result.totalDocs,
		  limit: result.limit,
		  totalPages: result.totalPages,
		  currentPage: result.page,
		  counter: result.pagingCounter,
		  hasPrevPage: result.hasPrevPage,
		  hasNextPage: result.hasNextPage,
		  prevPage: result.prevPage,
		  nextPage: result.nextPage,
		  contacts: result.docs
		});

	}catch{
		res.render('500', { message: error });
	}
}

export const getContact = async (req, res) => {
	// const contact = await Contact.findOne({ _id: req.params.id });
	var paramId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!paramId) {
        res.render("404", {message: "Contact not found"});
    }
    try {
	    const contact = await Contact.findById(req.params.id);
		res.render('show-contact', { contact });  
    }catch{
    	res.render('500', {message: error});
    }
	// res.json(contact);
}


export const addContactPage =  (req, res) => {
	res.render('add-contact');
}


export const addContact = async (req, res) => {
	// const contact = await Contact.insertOne({
	// 	first_name: req.body.first_name,
	// 	last_name: req.body.last_name,
	// 	email: req.body.email,
	// 	phone: req.body.phone,
	// 	address: req.body.address,
	// });
	await Contact.create(req.body);
	res.redirect("/");
}


export const updateContactPage = async (req, res) => {

	if (!mongoose.Types.ObjectId.isValid(req.params.id)){
		res.render('404', {message: "invalid id"})
	}

	try{
	const contact = await Contact.findById(req.params.id)
	if(!contact) return res.render('404', {message: "Contact not found"});
	res.render('update-contact', {contact});	
	}catch{
		res.render('500', {message: error});
	}


}

export const updateContact = async (req, res) => {
	await Contact.findByIdAndUpdate(req.params.id, req.body);
	res.redirect("/");


}

export const deleteContact = async (req, res) => {
	await Contact.findByIdAndDelete(req.params.id);
	res.redirect("/");
}