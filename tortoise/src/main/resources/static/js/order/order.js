var order = angular.module('order', []);
order.controller('OrderController', OrderController);

function OrderController() {
	order = this;
	order.kinds = ['钢管', '扣件', '碗扣'];
	
	order.name = '';
	order.date = new Date();
	order.date.setYear(2000);
	order.items = [ {
		kind : '钢管',
		count : 10
	}, {
		kind : '扣件',
		count : 12
	} ];
}

OrderController.prototype.addItem = function() {
	order = this;
	order.items.push({
		kind : '钢管',
		count : 0
	});
}