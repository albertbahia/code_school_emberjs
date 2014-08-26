var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

// Router (1 Router, multiple routes)
App.Router.map(function() {
	console.log(this);
	this.route('about'); //url path is overwritten with #/aboutus 
	//this.route('about',  { path: '/aboutus' } )
	
	// App.AboutController = Ember.Controller.extend({}); already created behind this scenes.  No need to explicity write it out.

	this.route('credits');
	this.resource('products');
	this.resource('product', { path: '/products/:productName' });
});

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return App.PRODUCTS;
	}
});

App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		return App.PRODUCTS.findBy('productName', params.productName);
	}
});

// Controller(s)
App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: '/images/logo.png',
	time: function() {
		return (new Date()).toDateString()
	}.property()
});

App.AboutController = Ember.Controller.extend({
	contactName: 'Wolfgang',
	open: function() {
		return (new Date()).getDay()
	}.property()
});

// App.ProductsController = Ember.Controller.extend({
// 	m
// });

App.PRODUCTS = [
	{
		productName: 'toaster',
		productType: 'kitchen'
	},
	{
		productName: 'blender',
		productType: 'kitchen'
	}
]