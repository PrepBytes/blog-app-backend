require('dotenv').config();
const express = require('express');

const serverless = require('serverless-http');

const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const articles = require('./articles');
const mastheadInfo = require('./mastheadInfo');
const LatestArticles = require('./LatestArticles');
const TheLatestArticles = require('./TheLatestArticles');
const TopPosts = require('./TopPosts');
const LatestStories = require('./LatestStories');
 
router.use(cors());

router.post('/get-articles-by-category', bodyParser.json(), (req, res) => {
	let category = req.body.category;
	category = typeof category === "string" ? category.toLowerCase() : "";

	let result = articles.filter(item => item.category.toLowerCase() === category);

	res.json(result);
});

router.post('/get-article-by-id', bodyParser.json(), (req, res) => {
	let id = req.body.id;
	id = typeof id === "string" ? id.toLowerCase() : "";

	let result = articles.filter(item => item.id.toLowerCase() === id);

	res.json(result.length > 0 ? result[0] : undefined);
});

router.get('/get-masthead-info', bodyParser.json(), (req, res) => {
	res.json(mastheadInfo);
});

router.get('/get-the-latest-articles', bodyParser.json(), (req, res) => {
	res.json(TheLatestArticles);
});

router.get('/get-latest-articles', bodyParser.json(), (req, res) => {
	res.json(LatestArticles);
});

router.get('/get-top-posts', bodyParser.json(), (req, res) => {
	res.json(TopPosts);
});

router.get('/get-latest-stories', bodyParser.json(), (req, res) => {
	res.json(LatestStories);
});

router.post('/get-similar-articles', bodyParser.json(), (req, res) => {
	res.json(LatestStories);
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);