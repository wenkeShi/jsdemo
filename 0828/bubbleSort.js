function bubbleSort(data,desc){
	for(let i=0;i<data.length-1;i++){
		for(let j=0;j<data.length-1-i;j++){
			let temp;
			if(desc){
				 data[j+1]>data[j]?(temp=data[j+1],data[j+1]=data[j],data[j]=temp):0;
			}else{
				data[j+1]<data[j]?(temp=data[j+1],data[j+1]=data[j],data[j]=temp):0;
			}	
		}
	}
	return data;
}