function Calendar(parentId) {
	this.parentElement = document.getElementById(parentId);
	this.init();
}
Calendar.prototype = {
	init: function() {
		this.contains = document.createElement("div");
		this.timeInput = document.createElement("input");
		this.timePicker = document.createElement("div");
		this.showTimeBar = document.createElement("div");
		this.timeBox = document.createElement("div");
		this.contains.className = 'timepicker-container';
		this.timeInput.className = 'time-input';
		this.timeInput.readOnly = true;
		this.timeInput.testA = 123;
		var parent = this;
		this.timeInput.onclick = function(event){
			//console.log(parent);
			//parent.onInputClick(event,parent);
			parent.onInputClick(event);
		};
		//this.onInputClick(this);
		this.timePicker.className = 'time-picker';
		this.timePicker.style.display = 'none';
		this.showTimeBar.className = 'show-time';
		this.timeBox.className = 'time-box';
		this.timePicker.appendChild(this.showTimeBar);
		this.timePicker.appendChild(this.timeBox);
		this.contains.appendChild(this.timeInput);
		this.contains.appendChild(this.timePicker);
		this.parentElement.appendChild(this.contains);
		this.drawShowTimeBar(this.showTimeBar);
		//this.drawPicker(this.timeBox);
	},
	drawShowTimeBar: function(parentElement){
		// this.yearInput = document.createElement("input");
		// this.monthInput = document.createElement("input");
		// this.dateInput = document.createElement("input");
		var nowYear = new Date().getFullYear();
		var contentStr ='<div class="year-input">'+nowYear+'年<i class="select-year-btn">^</i><ul class="year-select-box">';
		
		for(var i=0;i<150;i++){
			contentStr+='<li>'+(i+1900)+'年</li>';
		}
		contentStr+='</ul></div>'
					+'<div class="month-input"><i class="prev-month">\<</i><select>'
		for(var i=0;i<12;i++){
			contentStr+='<option>'+(i+1)+'月</option>';
		}
		contentStr+='</select><i class="next-month">\></i></div>'
					+'<div class="day-input"><i class="prev-day">\<</i><span></span>'
					+'<i class="next-day">\></i></div>'
					+'<button class="today-btn">今天</button>'
					+'<div class="days-title">';
					
				
		//this.todayBtn = document.createElement("button");
		//this.daysTitle = document.createElement("div");
		// this.yearInput.name = "year";
		// this.monthInput.name = "month";
		// this.dateInput.name = "date";
		//this.todayBtn.innerText = "今天";
		//this.todayBtn.onclick = function(){};
		// parentElement.appendChild(this.yearInput);
		// parentElement.appendChild(this.monthInput);
		// parentElement.appendChild(this.dateInput);
		//parentElement.appendChild(this.todayBtn);
		//var showTimeStr = '<span name="year"><i></i></span>';
		var weekday = ['日', '一', '二', '三', '四', '五', '六'];
		//var titleStr = '';<span></span>
		for (var i = 0; i < 7; i++) {
			/*var span = document.createElement("span");
			span.className = "day-title";
			span.innerText = weekday[i];*/
	 		contentStr+='<span class="day-title">'+weekday[i]+'</span>';
			//this.daysTitle.appendChild(span);
		}
		contentStr+='</div>';
		//this.daysTitle.innerHTML = titleStr;
		//parentElement.appendChild(this.daysTitle);
		parentElement.innerHTML = contentStr;
		var selectYearBtn = parentElement.firstChild;
		console.log(selectYearBtn);
		selectYearBtn.onclick = function(event){
			var ul = event.target.lastChild;
			console.log(ul);
			ul.style.display==='none' ? ul.style.display='inline-block':ul.style.display='none';
		};
	},
	showYearSelect : function(){
		console.log("showSelect");
	},
	/*
	绘制日期表
	*/
	drawPicker: function(date) {
		//console.log(this);
		//var nowDay = date.getDay();
		var nowMonth = date.getMonth()+1;
		var nowDate = date.getDate();
		var spanContainer = [];
		var timeBox = this.timeBox;
		timeBox.innerHTML = '';
		var time = date.getTime();
		//var days = Calendar.prototype.getDaysOfMonth.call(this,new Date(time));
		var days = this.getDaysOfMonth(new Date(time));
		//console.log(days);
		date.setDate(1);
		var firstDay = date.getDay();
		for (var i = 0; i < firstDay; i++) {
			var tempDate = new Date(date);
			tempDate.setDate(i - firstDay + 1);
			var span = document.createElement("span");
			span.className = "unshow";
			spanContainer.push({span : span, date : tempDate});
		}
		for (var i = 1; i <= days; i++) {
			var span = document.createElement("span");
			span.className = 'show';
			spanContainer.push({span : span, date : new Date(date)});
			date.setDate(i + 1);
		}
		for (var i = date.getDay(); i <= 6; i++) {
			var span = document.createElement("span");
			span.className = "unshow";
			spanContainer.push({span : span, date : new Date(date)});
			date.setDate(date.getDate()+1);
		}
		for(var i=0;i<spanContainer.length;i++){
			var spanBox = spanContainer[i];
			var spa = spanBox.span;
			spa.year = spanBox.date.getFullYear();
			spa.month = spanBox.date.getMonth() + 1;
			spa.date = spanBox.date.getDate();
			spa.innerText = spanBox.date.getDate();
			if(spa.date === nowDate&&spa.month === nowMonth)
				spa.className+=" select";
			var parent = this;
			spa.onclick = function(){
				var target = event.target;
				var selected = document.getElementsByClassName("select");
				for(var i=0 ;i<selected.length;i++){
					selected[i].className = selected[i].className.replace(" select","");
				};
				target.className+=" select";
				//console.log(spanBox.date);   //这已经是闭包问题了
				parent.changeDate(target.year, target.month, target.date); //陷阱 changeDate调用时spanContainer[i].date，i这个变量已经是出界了的
				if(target.className.indexOf("unshow")!==-1){
					parent.drawPicker(new Date(target.year, target.month-1, target.date));
					console.log("unshow");
				}
					
			};
			timeBox.appendChild(spa);
		}
		//console.log(spanContainer);
		return;

	},
	/*
	计算一个月的天数
	*/
	getDaysOfMonth: function(date) {
		// var year = date.getFullYear();
		 var month = date.getMonth();
		// var dateNum = date.getDate();
		var time = date.getTime();
		var newTime = date.setMonth(month + 1);
		return Math.ceil((newTime - time) / (24 * 60 * 60 * 1000));
	},
	/*
	选择框点击处理函数
	*/
	onInputClick: function(event) {  /*parent参数可以不要*/
		//console.log(event);	
		//console.log(parent);
		var target = event.target;
		//console.log(target);
		var value = target.value;
		//var timePicker =this.timePicker;
		var timePicker = this.timePicker;
		//console.log(testA);
		//console.log(timePicker);
		if(timePicker.style.display==='none'){
			timePicker.style.display = 'block';
		}else{
			timePicker.style.display = 'none';
			return; 
		}
		//console.log(this);
		if (!value) {
			var now = new Date();
			//parent.drawPicker(now);
			//Calendar.prototype.drawPicker(now);
			this.drawPicker(now);
			//drawPicker(now);
		} else {
			//var date = parent.parseDateFormat(value);
			//this.drawPicker(date);
			//Calendar.prototype.drawPicker.call(this,date);
		}
	},
	parseDateFormat: function(value) {

	},
	dateFormat: function() {

	},
	changeDate : function(year, month, date){
		//console.log(year+"-"+month+"-"+date);
		// this.yearInput.value = year+"年";
		// this.monthInput.value = month+"月";
		// this.dateInput.value = date+"日";
		this.timeInput.value = year+"-"+(month<10?("0"+month):month)+"-"+(date<10?("0"+date):date);
	},
	testA : 'prototype',
}

var calendar = new Calendar("root");
var testA = 234;