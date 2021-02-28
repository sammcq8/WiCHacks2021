const outletList = document.querySelector('#outlets-list')

function renderOutletList(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().current;

    li.appendChild(name);
    li.appendChild(city);

    outletList.appendChild(li);
}

// getting data
db.collection('electronicDevices').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderOutletList(doc);
    });
});