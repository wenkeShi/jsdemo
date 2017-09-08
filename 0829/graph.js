//class :12
//homework : 1-8
//输出三角形
var row=6;
for(let i=0;i<row;i++){
	for(let j=0;j<row;j++){
		j<=i?document.write("<span>*</span>"):document.write('<span>&nbsp;</span>');
	}
	document.write("<br>");
}
document.write("1"+"<br>");
document.write("<br>");


for(let i=0;i<row;i++){
	for(let j=0;j<row;j++){
		j>=i?document.write("<span>*</span>"):document.write('<span>&nbsp;</span>');
	}
	document.write("<br>");
}
document.write("2"+"<br>");
document.write("<br>");


for(let i=0;i<row;i++){
	for(let j=0;j<row;j++){
		j<row-i?document.write("<span>*</span>"):document.write('<span>&nbsp;</span>');
	}
	document.write("<br>");
}
document.write("3"+"<br>");
document.write("<br>");


for(let i=0;i<row;i++){
	for(let j=0;j<row;j++){
		j>=row-i-1?document.write("<span>*</span>"):document.write('<span>&nbsp;</span>');
	}
	document.write("<br>");
}
document.write("4"+"<br>");
document.write("<br>");

//输出等腰三角形
for(let i=0;i<row;i++){
	for(let j=0;j<2*row-1;j++){
		j>=row-i-1&&j<=row+i-1?document.write("<span>*</span>"):document.write("<span>&nbsp</span>");
	}
	document.write("<br>");
}
document.write("5"+"<br>");
document.write("<br>");
//输出菱形
for(let i=0,k=0;i<2*row-1;i++){
	for(let j=0;j<row+k;j++){
		j>=row-k-1&&j<=row+k-1?document.write("<span>*</span>"):document.write("<span>&nbsp</span>");
	}
	i<row-1?k++:k--;
	document.write("<br>");
}
document.write("6"+"<br>");
document.write("<br>");
//输出空心菱形
for(let i=0,k=0;i<2*row-1;i++){
	for(let j=0;j<2*row-1;j++){
		j==row-k-1||j==row+k-1?document.write("<span>*</span>"):document.write("<span>&nbsp</span>");
	}
	i<row-1?k++:k--;
	document.write("<br>");
}
document.write("7"+"<br>");

//倒等腰三角形
for(var i=1;i<=row;i++){
	for(var j=1;j<=row*2-i;j++){
		if(j<i){
			document.write("<span>&nbsp</span>");
		}else{
				document.write("<span>*</span>");
			}
		}
	document.write("<br>");
}

//空心菱形
for(var i=0,k=0;i<row*2-1;i++){
	i>=row?k--:k++;
	for(var j=0;j<row+k-1;j++){
		document.write((j<row-k || (j>row-k && j<row+k-2))?"<span>&nbsp</span>":"<span>*</span>");
		}
	document.write("<br>");
}