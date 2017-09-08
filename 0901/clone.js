console.log('loaded');
function WorkerB(){
	this.constructor = WorkerB;
}
function WTF(){

}
var wtf = new WTF();
WorkerB.prototype = wtf;
var worker = new WorkerB();

console.log(worker.constructor);
console.log(wtf.constructor);
var nativeObj={
	name : 'swk',
	age : 22,
	face : 79,
	skills : {
		html : 7,
		css : 7,
		ES5 : 7,
		ES6 : 3,
		react : 5,
		redux : 3,
	},
	//indentify : worker,
	array : [1,2,3,4,5],
	coding : function(){
		console.log('he is coding')
	},
}
//实现对象深复制
function deepClone(obj){
	var cloneObj=obj instanceof Array?[]:{};
	if(typeof obj !== 'object'){
		 cloneObj=obj;
	} else{
		for(var attr in obj){
			cloneObj[attr]=deepClone(obj[attr]);
		}
	}
	return cloneObj;
}

var copyObj = deepClone(nativeObj);
console.log(copyObj);

