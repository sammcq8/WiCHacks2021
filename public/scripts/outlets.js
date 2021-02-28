const outletList = document.querySelector('#outlets-list')
var totalkWh = 0;

function renderOutletList(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let kWh = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    kWh.textContent = "Power Usage: "+ doc.data().kWh + "kWh";

    li.appendChild(name);
    li.appendChild(kWh);

    totalkWh = kWh + totalkWh;
    outletList.appendChild(li);
}

// getting data
db.collection('electronicDevices').get().then(snapshot => {
    
    snapshot.docs.forEach(doc => {
        
        //if (doc.data().user == db.collection("users").doc("CurrentlyLoggedIn").data().name){
            renderOutletList(doc);
        //}
        
    });
});

