function readIncidentTable()
{
var vehicleNo = getDetails();
var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('smart_truck_incident');
var query1 = equipTable.read().done(function (results) {
            incdntArray=readArrayItems(results,vehicleNo);
        }, function (err) {
        });
}

function getDetails(){
  var vehicleNo = document.URL.split('vehicleNo=')[1];
  var userdetail = document.URL.split('user=')[1];
  var user = userdetail.split("&")[0];
  if(user=="insured"){
    document.getElementById("complete").style.visibility="hidden";
    document.getElementById("reject").style.visibility="hidden";
  }else{
    document.getElementById("process").style.visibility="hidden";
    document.getElementById("cancel").style.visibility="hidden";
  }
  return vehicleNo;
}

function readArrayItems(jsonData2, vehicleNo){
for(i=0;i<jsonData2.length;++i){
  if(jsonData2[i].truck_number == vehicleNo){
   /* alert(jsonData2[i+1].id);
    alert(!(jsonData2[i].id<jsonData2[i+1].id));
    if(!(jsonData2[i].id<jsonData2[i+1].id))
    {*/
    document.getElementById("veh_id").value = jsonData2[i].id;
    document.getElementById("trucknumber").innerHTML = jsonData2[i].truck_number;
    document.getElementById("latitude").innerHTML = jsonData2[i].latitude;
    document.getElementById("longitude").innerHTML = jsonData2[i].longitude;
    document.getElementById("message").innerHTML = jsonData2[i].message;
    document.getElementById("speed").innerHTML = jsonData2[i].speed + " kmph";
    document.getElementById("address").innerHTML = jsonData2[i].address;
  //alert(JSON.stringify(jsonData2[i]));
/*}*/
  }
}
  //(jsonData2[49].activeIndicator)
}
function handleClaim(action){
  var veh_id = document.getElementById("veh_id").value;
  var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('smart_truck_incident');
if(action=="process"){
    equipTable.update({                
                id: parseInt(veh_id),
                activeIndicator: 1
            });
  }
  if(action=="cancel"){
    equipTable.update({                
                id: parseInt(veh_id),
                activeIndicator: 3
            });

  }
   if(action=="complete"){
      equipTable.update({                
                id: parseInt(veh_id),
                activeIndicator: 2
            });
   }
   if(action=="reject"){
      equipTable.update({                
                id: parseInt(veh_id),
                activeIndicator: 4
            });
   }
}
