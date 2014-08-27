var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

// Router (1 Router, multiple routes)
App.Router.map(function() {
	console.log(this);
	this.route('about'); //url path is overwritten with #/aboutus 
	
	// App.AboutController = Ember.Controller.extend({}); already created behind this scenes.  No need to explicity write it out.

	this.route('credits');
	this.resource('products');
	this.resource('product', { path: '/products/:productName' });
	this.resource('editProduct', { path: 'products/:productName/edit'});
});

// ----Shows Product List in index.html (navbar) for Two Way Data Binding demo only----------
App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.PRODUCTS;
  }
});
// ----------------------------------

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

App.EditProductRoute = Ember.Route.extend({
	model: function(params) {
		return App.PRODUCTS[params.productName];
	},

	events: {
		save: function() {
			var product = this.modelFor('editProduct');
			this.transitionTo('product', product);
		}
	}
});

// Controller(s)
App.IndexController = Ember.Controller.extend({
	productsCount: 2,
	logo: '/images/logo.png',
	time: function() {
		return (new Date()).toDateString();
	}.property()
});

App.AboutController = Ember.Controller.extend({
	contactName: 'Wolfgang',
	photo: 'http://www.petbattlearena.com/img/pic521.png',
	open: function() {
		return (new Date()).getDay();
	}.property()
});

App.PRODUCTS = [
	{
		productName: 'toaster',
		productType: 'kitchen',
		photo: 'http://www.placekitten.com/300/300'
	},
	{
		productName: 'blender',
		productType: 'kitchen',
		photo: 'http://www.placekitten.com/300/300'
	}
];