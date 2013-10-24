var intervalCounter=0;
var incdntArray=new Array();
var auto_refresh=setInterval(readIncident,5000);
//var auto_refresh3=setInterval(updateAllToTrue,1000);
var auto_refresh2;


function readArray(jsonData1,callfrm){
    var flipFlag=true;
    //alert(jsonData);
//clearInterval(auto_refresh2);
for(i=0;i<jsonData1.length;++i){
   
 if(jsonData1[i].activeIndicator && callfrm){
  
   document.getElementById("errId").style.display="block";
   document.getElementById("errId").focus();
   document.getElementById("alertbox").value = jsonData1[i].equipmentId;

   var tempInFahrenheit = Math.round((((212 - 32) / 100) * jsonData1[i].temperature + 32) * 100) / 100;
   $("#lastReading").html("Last Reading: " + tempInFahrenheit + " &deg;F as of " + jsonData1[i].incidentTimestamp);

   $('.quip').empty();
   $('.quip').append("AIE has estimated potential failure on Equipment with Equip-ID: "+jsonData1[i].equipmentId +" This may require immediate attention. All other equipment are reporting optimal conditions.");
   document.getElementById("normId").style.display="none";
   flipFlag=false;
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
/*var equipTableTest= azureClient1.getTable('equipment_incident').where({activeIndicator: true}).read().done(function (results1) {
            
            alert(JSON.stringify(results1));
        }, function (err) {
            alert("Error: " + err);
        });*/
var query1 = equipTable.read().done(function (results) {
           clearInterval(auto_refresh);
           clearInterval(auto_refresh);
           clearInterval(auto_refresh);
            readArray(results,true);
                                 
        }, function (err) {
           // alert("Error: " + err);
        });

}

function updateIncident(equipid){
 //alert('1111 '+equipid);
 var temp123= function(){
 var r = $.Deferred();
 var updated=false;
 var strTime=Math.round((new Date()).getTime() / 1000)*1000;
var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('equipment_incident');
var equipTableTest= azureClient1.getTable('equipment_incident').where({equipmentId: parseInt(equipid)}).read().done(function (results) {
  //alert(JSON.stringify(results));
            for(i=0;i<results.length;++i){
              if(results[i].activeIndicator){
               updated=true;
            equipTable.update({  
                id: parseInt(results[i].id),              
               // equipmentId: parseInt(equipid),
                activeIndicator: false,
                resolvedTimestamp:formatDateHour(new Date(strTime))
            });
            //updated=true;
          }
          }//for end
            //alert(JSON.stringify(results));
             //updated=true;
             if(updated){
document.getElementById("errId").style.display="none";
  
    document.getElementById("normId").style.display="block";
     document.getElementById("normId").focus();
       }
        }, function (err) {
            alert("Error: " + err);
        });
  setTimeout(function () {
    // and call `resolve` on the deferred object, once you're done
    r.resolve();
  }, 2500);
  return r;
  }; 
  var funtion2=function(){
    readIncident();
  };
  temp123().done(funtion2);
//alert('Sucessfully Resolved');

}
function resolveThis(){
  clearInterval(auto_refresh);
    updateIncident(document.getElementById("alertbox").value);
    clearInterval(auto_refresh);
}

function formatDateHour(timestamps) {
  Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
    return this.getMonthName().substr(0, 3);
};
  var hrs=timestamps.getHours();
  var month= timestamps.getShortMonthName();
  //++month;
  suffex = (hrs >= 12)? 'pm' : 'am';

    //only -12 from hours if it is greater than 12 (if not back at mid night)
    hrs = (hrs > 12)? hrs -12 : hrs;

    //if 00 then it is 12 am
    hrs = (hrs == '00')? 12 : hrs;

    var minut=(timestamps.getMinutes()<10) ? "0"+timestamps.getMinutes():timestamps.getMinutes();
    var secnd=(timestamps.getSeconds()<10) ? "0"+timestamps.getSeconds():timestamps.getSeconds();
//alert(timestamps.getDate()+"-"+month+"-"+timestamps.getFullYear()+" "+hrs+":"+minut+":"+secnd+suffex);
    return timestamps.getDate()+"/"+month+"/"+timestamps.getFullYear()+" "+hrs+":"+minut+":"+secnd+suffex;
}
function updateAllToTrue(){
    var azureClient1 = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var equipTable= azureClient1.getTable('equipment_incident');
    equipTable.update({                
                id: 1,
                activeIndicator: true
            });
    equipTable.update({                
                id: 5,
                activeIndicator: true
            });
    equipTable.update({                
                equipmentId: 3,
                activeIndicator: true
            });
    
}


function insertIncident(anchorElement) {
    var azureClient = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
    var incidentTable = azureClient.getTable('smart_truck_incident');

    var dataToInsert = {
        latitude: 12.822716,
        longitude: 80.230838,
        speed: 0.0106854487743271,
        message: "Truck Incident Notification from iOS MapApp",
        channel: "APA91bH-WHA4tKltOpZ6gQWyxETwD7zpmQNB7TP-4qtspVWiWGl6tF7z6vO_pSny71uaU1cLU0NyM3jAJcZ63307TyG0C9TIjDgU7xtp8Pl_3jjM2Z3mke3IvmSWWAP6HUQacduARmm9l7dNXfKcbaXDPbFp9BAo1w",
        truck_number: "T501",
        address: "IT Corridor, Old Mahabalipuram Rd, Siruseri, TN 603103, India",
        DateTime: getISODateTime(new Date())
};

    incidentTable.insert(dataToInsert);

    dataToInsert.channel = "APA91bHRRVhWnSkBuzEVYxOgdU7-MVj2jh_CLOi_zB1K9NoRaOUNSYDJtAYj0lo5YPkUtKvr36_VSMaVC86TwSR9rMbpj882n7fyjWimxyViTxcOEsVlIVOFViOr16oBy-rQZvps6Y5T";
    incidentTable.insert(dataToInsert);

    dataToInsert.channel = "APA91bETFrep5JD9qCng7tmYP864kTUKNkWl0B2glnKkQ40Ps34uWW_VbPxmcfR2csc55PqfL6uqR1F42XSXjSe7l_jZtJ2U1NsJwylgDkaP2sOTlo7DkiKglxMvmIRG1C7vahOAyL0l";
    incidentTable.insert(dataToInsert);

    dataToInsert.channel = "APA91bEttJBtAJcNLkBBFw6UZT52ZmO4ENZwIBOj4lxEtqM6hozLMh4x0puI4-wf6qEZO8uhOCWBuqDPqTdkFw51XcktvxjFBbcSAZnspH28QmMBE5TE_z0atztrJW7FgHV1hnGHYnjNs";
    incidentTable.insert(dataToInsert);

    dataToInsert.channel = "APA91bHGAxj0BbprNNrJrPHjtUH1Frg4hdAqC6HmoFwnmOS0fFBtBye8c-mePBRAXWXYvFmZx-tnC1UAvspRCjYB7S9fWS7GgsimZvzDG2GMk5M9qXU_CpBY7vky9Mog_OSSHkAyi3UQ";
    incidentTable.insert(dataToInsert).done(function (result) {
        //success
    }, function (err) {
        //error
    });;
}

function getISODateTime(d) {
    // padding function
    var s = function (a, b) { return (1e15 + a + "").slice(-b); };

    // default date parameter
    if (typeof d === 'undefined') {
        d = new Date();
    };

    // return ISO datetime
    return d.getFullYear() + '-' +
        s(d.getMonth() + 1, 2) + '-' +
        s(d.getDate(), 2) + ' ' +
        s(d.getHours(), 2) + ':' +
        s(d.getMinutes(), 2) + ':' +
        s(d.getSeconds(), 2);
}