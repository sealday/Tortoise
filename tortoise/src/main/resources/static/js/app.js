var tortoise = angular.module('tortoise',
		[ 'order', 'ui.router', 'ngMessages' ]);

tortoise.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider

	.state('home', {
		url : '/',
		templateUrl : "components/order/order.html",
		controller : OrderController,
		controllerAs : "order"
	})
	
	.state('print', {
		url : '/print',
		templateUrl: "components/order/order_print.html",
		controller: OrderController,
		controllerAs: "order"
	})

});