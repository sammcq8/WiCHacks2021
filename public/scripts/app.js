class User {
    constructor(password, name) {
        this.password = password;
        this.name = name
    }

}

// Firestore data converter
var userConverter = {
    toFirestore: function (user) {
        return {
            password: user.password,
            name: user.name,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.password, data.name);
    }
};

function addDevice(){
	var name = document.getElementById("device").value;
	var outletNum = document.getElementById("outletNum").value;
	var category = document.getElementById("category").value;

	db.collection("electronicDevices").add({
    name: name,
    id: outletNum,
    category: category,
    status: "off",
    kWh: 0
})

console.log("addDevice ran");
document.getElementById("device_message").innerHTML = "Device Added!"
}

function user_login() {
    console.log("Starting submit function")

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    db.collection("users").doc(username).withConverter(userConverter).get().then((doc) => {
        if (doc.exists) {
            // Convert to City object
            var user = doc.data();
            // Use a user instance method
            console.log(user.toString());

            if (user.password == password) {
                console.log("Login successful");

                var currentUser = db.collection("users").doc("CurrentlyLoggedIn");

                // Set the "capital" field of the city 'DC'
                currentUser.update({
                    name: user.name
                }).then(() => {
                        console.log("Current User");
                })
                setTimeout(function(){
                    window.location.href = "https://wichacks2021.web.app/dashboard.html";
                }, 1000);
                
            }
            else {
                document.getElementById("message").innerHTML = "Thats not the right password!";
            }

        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting user:", error);
        document.getElementById("message").innerHTML = "Thats user does not exist.";
    });;}


function user_signup() {
    console.log("Starting submit function")

    var name = document.getElementById("name").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    db.collection("users").doc(username).set({
        name: name,
        password: password

    }).then(() => {
        console.log("Signup Successful")

        var currentUser = db.collection("users").doc("CurrentlyLoggedIn");

        currentUser.update({
            name: name
        }).then(() => {
            console.log("Current User");
        })
        setTimeout(function () {
            window.location.href = "https://wichacks2021.web.app/dashboard.html";
        }, 1000);

    } ).catch((error) => {
        console.log("Error getting user:", error);
        document.getElementById("message").innerHTML = "Thats user does not exist.";
    });;
}
