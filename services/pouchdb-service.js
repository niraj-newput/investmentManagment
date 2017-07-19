import PouchDB from 'pouchdb';
import plugin from 'pouchdb-find';
PouchDB.plugin(plugin);
var db = new PouchDB('AppDB2',plugin);

db.createIndex({
  index: {
    fields:['email']
  }
},function(err, result) {
  if(err) {
    console.log(err);
  }else {
    console.log(result);
  }
});
db.createIndex( {
  index: {
    fields: ['obj.loggedIn']
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
  },
  findByLoggedInUser: function(value) {
    return  db.find({selector: {'obj.loggedIn': {$eq: value}}});
  },
  getAttachment: function(id, attachment, revision) {
    return(db.getAttachment(id, attachment, { _rev: revision}));
  },
  deleteAttachment: function(id, attachment, revision) {
    return (db.removeAttachment(id, attachment, revision));
  }
}
