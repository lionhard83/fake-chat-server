# fakeuser9
## to install
```
npm install fakeuser9
```

### A simple use of Fake Users

```javascript
var fake = require('fakeuser9');
fake.addUser('Caio', 'Sempronio');
fake.addUser('Orazio', 'Caligola');
fake.deleteUser(1);
fake.findUserByName('Caio');
fake.getUsers(); // array of Users
fake.findUserById(0);
fake.reset();
```
