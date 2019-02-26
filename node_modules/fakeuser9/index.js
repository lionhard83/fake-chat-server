var users = [];
var COUNTER = 0;

exports.getUsers = function() {
    return users;
}

exports.addUser = function(name, surname) {
    var user = {
        name: name,
        surname: surname,
        id: COUNTER++
    }
    users.push(user);
    /* 
    equivale a quello scritto su
    ma con un passaggio in meno
    users.push({
        name: name,
        surname: surname,
        id: COUNTER++
    }); */
}

exports.deleteUser = function(id) {
    for (var i=0; i< users.length; i++) {
        if (users[i].id === id) {
            users.splice(i ,1);
            return users;
        }
    }
}

exports.findUserByName = function(name) {
    var filteredArray = [];
    for(var user of users){
        // user --> users[i] dell'altro
        // ciclo for
        if (user.name === name) {
            filteredArray.push(user);
        }
    }
    return filteredArray;
}

exports.reset = function() {
    users = [];
    COUNTER = 0;
    return users;
}

exports.findUserById = function(id) {
    for(var user of users) {
        if(user.id === id) {
            return user;
        }
    }
}
exports.count = function() {
    return users.length;
}