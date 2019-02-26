var assert = require('assert');
var fake = require('./index');
describe('testiamo i fake users', function() {
    it('testiamo getUsers()', function(){
        fake.reset();
        assert.equal(fake.getUsers().length, 0);
    });
    it("Testiamo l'aggiunta di uno user ed il delete", function(){
        fake.reset();
        fake.addUser("Pippo", "Caio");
        assert.equal(fake.getUsers().length, 1);
        assert.equal(fake.getUsers()[0].id, 0);
        fake.addUser("Sempronio", "Orazio");
        assert.equal(fake.getUsers().length, 2);
        assert.equal(fake.getUsers()[1].id, 1);
        fake.deleteUser(0);
        fake.addUser("Caligola", "Cesare");
        assert.equal(fake.getUsers().length, 2);
        assert.equal(fake.getUsers()[1].id, 2);

    })

    it('Testiamo il find User e Count', function(){
        fake.reset();
        fake.addUser("Pippo", "Caio");
        fake.addUser("Sempronio", "Orazio");
        fake.addUser("Caligola", "Cesare");
        fake.addUser("Sempronio", "Cesare");
        assert(fake.count(), 4);
        var filterUsers = fake.findUserByName("Sempronio");
        assert(filterUsers.length, 2);
        assert(filterUsers[0].name, "Sempronio");
        assert(filterUsers[1].name, "Sempronio");
    })

    it('Testiamo il find by Id', function(){
        fake.reset();
        fake.addUser("Pippo", "Caio");
        fake.addUser("Sempronio", "Orazio");
        fake.addUser("Caligola", "Cesare");
        fake.addUser("Sempronio", "Cesare");
        var user = {
            name: "Caligola",
            surname: "Cesare",
            id: 2
        }
        assert.deepEqual(fake.findUserById(2), user);
    })
})