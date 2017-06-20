var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	ID: String,
	Title : String,
	Content: String,
});

module.exports = mongoose.model('articles', articleSchema, 'articles');