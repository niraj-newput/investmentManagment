import PouchDB from 'pouchdb';
import plugin from 'pouchdb-find';
PouchDB.plugin(plugin);
var db = new PouchDB('InvestDB',plugin);

db.createIndex({
  index: {
    field:['email']
  }
},function(err, result) {
  if(err) {
    console.log(err);
  }else {
    console.log(result);
  }
});

export const dbConfig = {
  putData: function(doc) {
    return db.put(doc);
  },
  getData: function(id) {
    return db.get(id);
  },
  findByEmail: function(email) {
  return  db.find({selector: {'email': email}});
  }
}

