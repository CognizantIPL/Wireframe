var intervalCounter=0;
var incdntArray=new Array();
var auto_refresh=setInterval(readIncident,8000);
//var auto_refresh3=setInterval(updateAllToTrue,1000);
var auto_refresh2;


function readArray(jsonData1){
    var flipFlag=true;
    //alert(jsonData);
//clearInterval(auto_refresh2);
for(i=0;i<jsonData1.length;++i){
    //$(".errId").toggle();
   // $(".normId").toggle();
 if(jsonData1[i].activeIndicator){
    /*if(confirm("The Equipment with id " + jsonData[i].id +" is at Critical level, Do you need to resolve this?")){
        updateIncident(jsonData[i].id);
    }*/
    //alert('hi');
   document.getElementById("errId").style.display="block";
   document.getElementById("errId").focus();
   document.getElementById("alertbox").value=jsonData1[i].id;
   $('.quip').empty();
   $('.quip').append("AIE has estimated potential failure on Equipment with ID: "+jsonData1[i].id +" This may require immediate attention. All other equipment are reporting optimal conditions.");
   document.getElementById("normId").style.display="none";
   flipFlag=false;
   jsonData1='';
   break;
 }
 
}
if(flipFlag){

   readIncident(); 
}
//readIncident();
}

function readIncident()
{
clearInterval(auto_refresh);
var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('equipment_incident');
var query1 = equipTable.read().done(function (results) {
           clearInterval(auto_refresh);
            incdntArray=readArray(results);
            clearInterval(auto_refresh);
            //auto_refresh2=setInterval(readArray,1000);
           //alert(JSON.stringify(results));
        }, function (err) {
           // alert("Error: " + err);
        });
}

function resolveThis(){
    updateIncident(document.getElementById("alertbox").value);
}
function updateIncident(equipid){
   // alert(equipid);
    //var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
//var testTable= azureClient1.getTable('equipment_incident');
var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('equipment_incident');
equipTable.update({                
                id: parseInt(equipid),
                activeIndicator: false, 
                timestamp:new Date().getTime()
            });
document.getElementById("errId").style.display="none";
  
    document.getElementById("normId").style.display="block";
     document.getElementById("normId").focus();
//alert('Sucessfully Resolved');
readIncident();
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






