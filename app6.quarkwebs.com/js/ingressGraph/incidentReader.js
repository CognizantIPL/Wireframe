var intervalCounter=0;
var incdntArray=new Array();
var auto_refresh=setInterval(readIncident,1000);
//var auto_refresh3=setInterval(updateAllToTrue,1000);
var auto_refresh2;


function readArray(jsonData){
//clearInterval(auto_refresh2);
for(i=0;i<jsonData.length;++i){
 if(jsonData[i].activeIndicator){
 	if(confirm("The Equipment with id " + jsonData[i].id +" is at Critical level, Do you need to resolve this?")){
 		updateIncident(jsonData[i].id);
 	}
 }
}
readIncident();
}

function readIncident()
{
clearInterval(auto_refresh);
var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('equipment_incident');
var query1 = equipTable.read().done(function (results) {
            incdntArray=readArray(results);
			clearInterval(auto_refresh);
			//auto_refresh2=setInterval(readArray,1000);
           //alert(JSON.stringify(results));
        }, function (err) {
            alert("Error: " + err);
        });
}

function updateIncident(equipid){
	//var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
//var testTable= azureClient1.getTable('equipment_incident');
var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('equipment_incident');
equipTable.update({                
                id: parseInt(equipid),
                activeIndicator: false
            });
alert('Sucessfully Resolved');
}

function updateAllToTrue(){
	var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('equipment_incident');
	equipTable.update({                
                id: 1,
                activeIndicator: true
            });
	equipTable.update({                
                id: 2,
                activeIndicator: true
            });
	equipTable.update({                
                id: 3,
                activeIndicator: true
            });
	
}






