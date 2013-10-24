var azureClient = new WindowsAzure.MobileServiceClient('https://aiemobileservice.azure-mobile.net/', 'NYuUVUztAwEXJQZxOFbppximTExpoh26');
var incidentTable = azureClient.getTable('smart_truck_incident');

function deleteItems(jsonData2){
var latitude,longitude;
for(i=0;i<jsonData2.length;++i){
 incidentTable.del({id:jsonData2[i].id});
}
}
function insertIncident(anchorElement) {
    
//incidentTable.where({truck_number: 'T501'}).delete();
var query1 = incidentTable.select('id').where({truck_number: 'T501'}).read().done(function (results) {
            incdntArray=deleteItems(results);
        }, function (err) {
        });
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