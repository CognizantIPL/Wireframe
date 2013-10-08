

$(document).ready(function(){
	var liveData = [$.gchart.series('Temp', [], 'red', 'ffffff')]; 
	 var liveAxis = $.gchart.axis('bottom', [], 'black');
var liveAxisY = $.gchart.axis('left', ['20','30','40','50','60','70'],'black');
	function liveUpdate() { 
		
	    var rotate = function(arr) { 	
	        var value = arr.shift(); 
	        arr.push(value); 
	        return arr; 
	    }; 
	    for (var i = 0; i < 1; i++) { 
	        liveData[i].data = rotate(liveData[i].data); 
	    } 
	    liveAxis.labels(rotate(liveAxis.labels())); 
	    $('#typedChart').gchart('option', {series: liveData, axes: [liveAxis,liveAxisY]}); 
	}
var myArray=new Array();
var myArray1=new Array();	
var myYaxisArray= new Array();
var k;
var l;
 var myRotate = function(data1) { 	
	    if(myArray.length>4){
       myArray.splice(0,1);
}    
//var value = arr.shift(); 
	        myArray.push(data1); 
	        return myArray; 
	    }; 
var myRotate1 = function(data1) { 	
	    if(myArray1.length>4){
       myArray1.splice(0,1);
} 
 
//var value = arr.shift(); 
	        myArray1.push(data1); 
	        return myArray1; 
	    }; 
var myRotateYaxis = function(data1) { 	
	    if(myYaxisArray.length>4){
       myYaxisArray.splice(0,1);}

myYaxisArray.push(data1);

            
	       return myYaxisArray; 
} ;      
function myLiveStream(jsnData){
                                //alert('hui');
                                var temp = jsnData.body[0].params.temperature.value;
//alert('h12ui'+temp);
                                var timestamp=jsnData.body[0].timestamp;
                                liveData[0].data=myRotate(temp);
                                liveAxis.labels(myRotate1 (timestamp));
//liveAxisY.labels(myRotateYaxis(temp));

//alert('hu12i'+timestamp);

                                $('#typedChart').gchart('option', {series: liveData, axes: [liveAxis,liveAxisY]});
                }

                $('#typedChart').gchart({type: 'line', maxValue: 70, 
	    series: liveData, axes: [liveAxis], legend: 'right'});

initialize({key: "2d80af65-896a-4b6d-9a77-b939a309d402"
           , secret: "3834f777-c66f-4afd-bcd6-aa2b64ad7fe6"
           , aToken: "null" 
           , apiHost: "foresight-demo-21591536.us-east-1.elb.amazonaws.com"}, function(err, streams){
		  if(streams){
		    streaming({id: "ipl_insurance::1::1::*", reconnect: true}, function(err, sData){
		      if(!err){
		      	//alert(JSON.stringify(sData));
myLiveStream(sData);
		      }
		       // $('#sample').append("<br>"+JSON.stringify(sData)+"</br>");
		      else alert(JSON.stringify(err))
		    });
 			}else $('#sample').append(JSON.stringify(err));


	});

//Stop
					

					$('.showhistory').live('click', function(){
			historyData({sid:'1', from:$('.startTime').val(), to:$('.endTime').val(), columns: "nodeid,lat,lng,temperature",constraint:""}, function(hdata){
			     // $('#sample').append(JSON.stringify(hdata));
var hisData = [$.gchart.series('Temp', [], 'red', 'ffffff')]; 
	 
var histYAxis = $.gchart.axis('left', ['20','30','40','50','60','70'],'black');
var strTime=$('.startTime').val();
var edTime=$('.endTime').val();
var histXAxis = $.gchart.axis('bottom', [], 'black');

			     //alert(JSON.stringify(hdata));
	var hisArray=new Array();
$.each(hdata.data, function(i, object) {
    $.each(object, function(property, value) {
    	if(property==3){
    		hisArray.push(value);
    	}
       
    });
});

hisData[0].data=hisArray;
//histXAxis[0].labels=hisArray;
//alert(hisArray);
$('#hisChart').gchart({type: 'line', maxValue: 70, 
	    series: hisData, axes: [histXAxis], legend: 'right'});
			$('#hisChart').gchart('option', {series: hisData, axes: [histXAxis,histYAxis]});      
			});
});
	function getMinute(unixTimestamp) {
    var dt = new Date(unixTimestamp * 1000);

    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    if (minutes < 10) 
     minutes = '0' + minutes;

 return minutes;
}

});

