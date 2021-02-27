class User {
    constructor( password) {
        this.password = password;
    }

}

// Firestore data converter
var userConverter = {
    toFirestore: function (user) {
        return {
            username: city.username,
        };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new City(data.password, );
    }
};