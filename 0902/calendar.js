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
			parent.onInputClick(event);
		};
		this.contains.onblur = function(){
			parent.timePicker.style.display = 'none';
		}
		this.timePicker.className = 'time-picker';
		this.timePicker.style.display = 'none';
		this.showTimeBar.className = 'show-time';
		this.timeBox.className = 'time-box';
		this.timePicker.appendChild(this.showTimeBar);
		this.timePicker.appendChild(this.timeBox);
		this.contains.appendChild(this.timeInput);
		this.contains.appendChild(this.timePicker);
		this.parentElement.appendChild(this.contains);
		
	},
	drawShowTimeBar: function(parentElement){
		var parent = this;
		var nowDate = new Date();
		parentElement.date = nowDate;
		var nowYear = nowDate.getFullYear();
		var nowMonth = nowDate.getMonth();
		var nowDay = nowDate.getDate();
		var contentStr ='<div class="year-input"><span>'+nowYear+'年</span><i class="select-year-btn">&#xe600;</i><ul class="year-select-box" style="display : none">';
		for(var i=0;i<150;i++){
			contentStr+='<li>'+(i+1900)+'年</li>';
		}
		contentStr+='</ul></div>'
					+'<div class="month-input"><i class="prev-month">&#xe601;</i><select class="months-options">'
		for(var i=0;i<12;i++){
			contentStr+='<option>'+(i+1)+'月</option>';
		}
		contentStr+='</select><i class="next-month">&#xe602;</i></div>'
					+'<div class="day-input"><i class="prev-day">&#xe601;</i><select class="days-options"></select>'
					+'<i class="next-day">&#xe602;</i></div>'
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
		this.changeShowTimeBar(nowDate);




		var yearInput = parentElement.firstChild;
		//年选择框点击显示和隐藏选择列表
		yearInput.onclick = function(){
			//target和this的区别
			var ul = this.lastChild;
			ul.style.display==='none'||ul.style.display==='none'? ul.style.display='inline-block':ul.style.display='none';
		};



		//为年选择下拉框绑定点击事件
		var yearSelectBox = yearInput.lastChild;
		var yearLi = yearSelectBox.children;
		for(var i=0;i<yearLi.length;i++){
			yearLi[i].onclick = function(){
				//console.log(parent.date);
				this.parentElement.parentElement.firstChild.innerText = this.innerText;
				//console.log(parent.showTimeBar.date);
				parent.showTimeBar.date.setFullYear(this.innerText.slice(0,-1));
				//console.log(parent.showTimeBar.date);
				parent.changeShowTimeBar(parent.showTimeBar.date);
			};
		}

		//为month的前后按钮添加点击事件
		var monthInput = yearInput.nextSibling;
		monthInput.firstChild.onclick = function(){
			var monthOptions = this.nextSibling;
			if(monthOptions.selectedIndex>0 ){
				monthOptions.selectedIndex-- ;
				parent.showTimeBar.date.setMonth(monthOptions.selectedIndex);
				parent.changeShowTimeBar(parent.showTimeBar.date);
			}	
		};
		monthInput.lastChild.onclick = function(){
			var monthOptions = this.previousSibling;
			if(monthOptions.selectedIndex<11){
				monthOptions.selectedIndex++
				parent.showTimeBar.date.setMonth(monthOptions.selectedIndex);
				parent.changeShowTimeBar(parent.showTimeBar.date);
			}	
		}
		monthInput.children[1].onchange = function(){
			parent.showTimeBar.date.setMonth(this.selectedIndex);
			parent.changeShowTimeBar(parent.showTimeBar.date)
		};

		//为day的前后按钮添加点击事件
		var dayInput = monthInput.nextSibling;
		dayInput.firstChild.onclick = function(){
			var dayOptions = this.nextSibling;
			if(dayOptions.selectedIndex>0){
				dayOptions.selectedIndex--;
				parent.showTimeBar.date.setDate(dayOptions.selectedIndex+1);
				parent.changeShowTimeBar(parent.showTimeBar.date);
			}
			
		};
		dayInput.lastChild.onclick = function(){
			var dayOptions = this.previousSibling;
			if(dayOptions.selectedIndex< dayOptions.length-1){
				dayOptions.selectedIndex++;
				parent.showTimeBar.date.setDate(dayOptions.selectedIndex+1);
				parent.changeShowTimeBar(parent.showTimeBar.date);
			}
		};
		dayInput.children[1].onchange = function(){
			parent.showTimeBar.date.setMonth(this.selectedIndex);
			parent.changeShowTimeBar(parent.showTimeBar.date)
		};

		//为今天按钮绑定点击事件
		var todayBtn = dayInput.nextSibling;
		todayBtn.onclick = function(){
			parent.drawPicker(new Date());
		}
		
	},
	changeShowTimeBar : function(date){
		console.log(date);
		var yearInput = this.showTimeBar.firstChild;
		var monthInput = yearInput.nextSibling;
		var dayInput = monthInput.nextSibling;

		var monthsOptions = monthInput.firstChild.nextSibling;
		monthsOptions.selectedIndex = date.getMonth();
		var daysOptions = dayInput.firstChild.nextSibling;
		var days = this.getDaysOfMonth(new Date(date));
		var dayStr = '';
		for(var i=1;i<=days;i++){
			dayStr+='<option>'+i+'日</option>';
		}
		daysOptions.innerHTML = dayStr;
		daysOptions.selectedIndex = date.getDate()-1;
		this.drawPicker(date);
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
	时间显示框点击处理函数
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
			this.drawShowTimeBar(this.showTimeBar);
			//this.drawPicker(now);
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