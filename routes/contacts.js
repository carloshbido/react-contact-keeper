const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

//  @route   GET api/contacts
//  @desc    get all user contacts
//  @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(contacts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//  @route   POST api/contacts
//  @desc    Add new contact
//  @access  Private
router.post('/', [auth, [check('name', 'Name is required').not().isEmpty()]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(404).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {

        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.status(200).json(contact);

    } catch (error) {

        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//  @route   PUT api/contacts/:id
//  @desc    Update contact
//  @access  Private
router.put('/:id', auth, async (req, res) => {

    const { name, email, phone, type } = req.body;

    //Build conctact obj
    const conctactFields = {};
    if (name) conctactFields.name = name;
    if (email) conctactFields.email = email;
    if (phone) conctactFields.phone = phone;
    if (type) conctactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found'});

        //Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'})
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
        { $set: conctactFields},
        { new: true });

        res.status(200).json(contact);

    } catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//  @route   DELETE api/contacts/:id
//  @desc    Delete contact
//  @access  Private
router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        let contact = await Contact.findById(id);

        if(!contact) return res.status(404).json({msg: 'Contact not found'});

        //Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'})
        }

        await Contact.findById.findIdAndRemove(id);

        res.status(200).json({msg: 'Contact removed'});

    } catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;