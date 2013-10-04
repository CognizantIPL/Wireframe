

$(document).ready(function(){
	var liveData = [$.gchart.series('Temp', [], 'red', 'ffffff')]; 
	 var liveAxis = $.gchart.axis('bottom', [], 'black');
var liveAxisY = $.gchart.axis('left', ['20','30','40','50'],'black');
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
                                var temp = jsnData.body[0].params.Temperature.value;
//alert('h12ui'+temp);
                                var timestamp=jsnData.body[0].timestamp;
                                liveData[0].data=myRotate(temp);
                                liveAxis.labels(myRotate1 (timestamp));
//liveAxisY.labels(myRotateYaxis(temp));

//alert('hu12i'+timestamp);

                                $('#typedChart').gchart('option', {series: liveData, axes: [liveAxis,liveAxisY]});
                }

$('.startscreaming').live('click', function(){
	$('#typedChart').gchart({type: 'line', maxValue: 40, 
	    series: liveData, axes: [liveAxis], legend: 'right'});
	 //setInterval(liveUpdate, 1000);
	initialize({key: "6ef50172-05b4-4308-80af-8d6681f4733e"
        , secret: "0b342390-c5b1-47c2-a72a-58bd97589635"
        , aToken: "null" 
        , apiHost: "foresight-api-721608207.us-east-1.elb.amazonaws.com"}, function(err, streams){
		  if(streams){
		    streaming({id: "ipl_insurance::3::6::*", reconnect: true}, function(err, sData){
if(!err)
    {//$('#sample').append("<br>"+JSON.stringify(sData)+"</br>");
myLiveStream(sData);
}
		      else alert(JSON.stringify(err));
		    });
			}else $('#sample').append(JSON.stringify(err));
});
	
});
//Stop
					$('.stopstreaming').live('click', function() {
						var id = $('.deviceid').val();
						stopStreaming(id);
						$('#typedChart').gchart('destroy');
					});

});

