const Item = require('../models/Item');

// @desc    Get items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set item
// @route   POST /api/items
// @access  Public
const setItem = async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Please add a name and description field' });
    return;
  }

  try {
    const item = await Item.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  setItem,
};
