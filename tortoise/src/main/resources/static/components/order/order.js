var order = angular.module('order', []);

// 需要考虑怎么把这些数据存储到本地（浏览器里面），否则刷新之后这些数据就消失了
order.factory('orderService', function(){
	var order = {};
	order.kinds = [ '钢管', '扣件', '碗扣', '套筒', '顶丝' ];
	order.products = {
		'钢管' : {
			total : function(items) {
				var total = 0;
				for (var i = 0; i < items.length; i++) {
					total += items[i].spec * items[i].count;
				}
				return total;
			},
			unit : '米',
			scope : (function() {
				// 生成 0.4 - 6.0 范围的数字
				var values = [];
				for (var value = 0.4; value < 6.05; value += 0.1) {
					values.push(parseFloat(value).toFixed(1));
				}
				return values;
			})(),
			useSelect : false
		},
		'扣件' : {
			total : function(items) {
				var total = 0;
				for (var i = 0; i < items.length; i++) {
					total += Number(items[i].count);
				}
				return total;
			},
			unit : '只',
			scope : [ "十字", "转向", "直接" ],
			useSelect : true
		},
		'碗扣' : {
			total : function(items) {
				var total = 0;
				for (var i = 0; i < items.length; i++) {
					total += Number(items[i].count);
				}
				return total;
			},
			unit : '个'
		},
		'套筒' : {
			total : function(items) {
				var total = 0;
				for (var i = 0; i < items.length; i++) {
					total += Number(items[i].count);
				}
				return total;
			},
			unit : '只',
			scope : [ "10CM", "20CM", "30CM" ],
			useSelect : true
		},
		'顶丝' : {
			total : function(items) {
				var total = 0;
				for (var i = 0; i < items.length; i++) {
					total += Number(items[i].count);
				}
				return total;
			},
			unit : '个'
		}
	};
	
	if (sessionStorage.getItem("head") && sessionStorage.getItem("items")) {
		order.head = JSON.parse(sessionStorage.getItem("head"));
		order.items = JSON.parse(sessionStorage.getItem("items"));
		return order;
	}

	order.head = {};
	order.head.name = '';
	order.head.date = new Date();
	order.head.start = '';
	order.head.end = '';

	order.items = {};
	for (var i = 0; i < order.kinds.length; i++) {
		order.items[order.kinds[i]] = [];
	}

	return order;
});

order.controller('OrderController', OrderController);

// 产品
function Product(name, total, unit) {
	this.name = name;
	this.total = total;
	this.unit = unit;
}

function OrderController($state, orderService) {
	var order = this;
	order.$state = $state;
	
	order.kinds = orderService.kinds;
	order.products = orderService.products;
	order.items = orderService.items;
	order.orderService = orderService;

	order.head = orderService.head;
}

OrderController.prototype.submit = function() {
	order = this;
	sessionStorage.setItem("head", JSON.stringify(order.head));
	sessionStorage.setItem("items", JSON.stringify(order.items))
	order.$state.go('print');
};

OrderController.prototype.addItem = function(kind) {
	var order = this;
	console.log(kind);
	order.items[kind].push({
		spec : '',
		count : 0
	});
};

OrderController.prototype.deleteItem = function(kind, item) {
	var order = this;
	var items = [];
	angular.forEach(order.items[kind], function(i) {
		if (i != item)
			items.push(i);
	});
	order.items[kind] = items;
};