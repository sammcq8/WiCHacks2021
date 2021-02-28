const outletList = document.querySelector('#outlets-list')

function renderOutletList(doc, i) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let kWh = document.createElement('span');
    let category = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    kWh.textContent = "Power Used this Month: "+ doc.data().kWh + "kWh";
    category.textContent = "Category: " + doc.data().category;

	console.log(category);

    name.setAttribute("id", "device" + i);

    li.appendChild(name);
    li.appendChild(kWh);
    li.appendChild(category);


    outletList.appendChild(li);
    return doc.data().kWh;
}



// getting data
db.collection('electronicDevices').get().then(snapshot => {
    let totalkWh = 0;
    for(i = 0; i < snapshot.docs.length; i++){
        let kWh = renderOutletList(snapshot.docs[i], i);
	totalkWh += kWh;

	if (snapshot.docs[i].data().status == "on"){
		document.getElementById("device" + i).style.color = "green";
	}
    }
    document.getElementById("totalEnergy").innerHTML += totalkWh += " kWh";
});


