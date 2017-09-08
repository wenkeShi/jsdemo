//class : 12
//homework : 9
function init(parentElement){
	var containerElement = document.createElement("div");
	containerElement.id = "map";
	parentElement.appendChild(containerElement);
	drawControlBar(parentElement);
}
function drawMap(row, col, counter, parentElement){
	var box = document.createElement("div");
	box.className = 'mine-box';
	for(var i=0;i<row;i++){
		data[i] = [];
		var rowDiv = document.createElement("div");
		rowDiv.className = "row";
		for(var j=0;j<col;j++){
			var grid = document.createElement("span");
			//grid.value = 0;
			data[i][j] = 0;
			grid.i = i;
			grid.j = j;
			grid.onclick = bindGridLeftClick;
			rowDiv.appendChild(grid);
		}
		box.appendChild(rowDiv);
	}
	parentElement.appendChild(box);
	randomMine(counter, row, col);
}

function randomMine(counter,row, col){
	for(var k=0;k<counter;k++){
		var i = Math.floor(Math.random()*row);
		var j = Math.floor(Math.random()*col);
		while(data[i][j]===1){
			i = Math.floor(Math.random()*row);
			j = Math.floor(Math.random()*col);
		}
		data[i][j] = 1;
	}
}

function drawControlBar(parentElement){
	var controlBar = document.createElement("div");
	var rowInput = document.createElement("input");
	var colInput = document.createElement("input");
	var counter = document.createElement("input");
	var submitBtn = document.createElement("button");
	controlBar.id = "control-bar";
	rowInput.id = "row-num";
	rowInput.placeholder = "row";
	colInput.id = "col-num";
	colInput.placeholder = "col";
	counter.id = "counter";
	counter.placeholder = "mine"
	submitBtn.id = "submit-btn";
	submitBtn.innerText = "OK";
	controlBar.appendChild(rowInput);
	controlBar.appendChild(colInput);
	controlBar.appendChild(counter);
	controlBar.appendChild(submitBtn);
	parentElement.appendChild(controlBar);
	// var row = +rowInput.value;
	// var col = +colInput.value;
	// isNaN(row)|| isNaN(col) ? showError() :drawMap(row,col,parentElement);
}


function mine(){
	var map = document.getElementById("map");
	var rowInput = document.getElementById('row-num').value;
	var colInput = document.getElementById('col-num').value;
	var counter = document.getElementById('counter').value;
	if(isNaN(rowInput)||isNaN(colInput)||isNaN(counter)){
		showError();
	}else if(rowInput>20||rowInput<10||colInput>20||colInput<10){
		showError("行和列必须在10到20之间");
	}else{
		map.innerHTML = '';
		drawMap(rowInput, colInput, counter, map);

	}
}

function showError(msg){
	alert(msg);
}
function gameOver(){
	alert("Over");
}
function bindGridLeftClick(event){
	var target = event.target;
	var row = target.i;
	var col = target.j;
	console.log(row+""+col);
	var mineNum = 0;
	if(data[row][col] == 1){
		target.className = "boom";
		gameOver();
		return;
	}else{
		for(var i=row-1;i<=row+1;i++){
			if(typeof data[i] === "undefined"){
				continue;
			}else{
				for(var j=col-1;j<=col+1;j++){
					!isNaN(data[i][j]) ? mineNum+=(+data[i][j]) : '';
				}
			}
		}
	}
	target.innerText = mineNum;
	target.className = "opened";
}
var data=[];
var parentElement = document.getElementById('root');
init(parentElement);
var map = document.getElementById("map");
drawMap(10,10,10,map);
document.getElementById("submit-btn").onclick = mine;