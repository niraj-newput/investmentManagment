import PouchDB from 'pouchdb';
import plugin from 'pouchdb-find';
PouchDB.plugin(plugin);
var db = new PouchDB('AppDB',plugin);

db.createIndex({
  index: {
    fields:['obj.email']
  }
},function(err, result) {
  if(err) {
    console.log(err);
  }else {
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
  }
});

db.createIndex({
  index: {
    fields: ['year']
  }
},function(err, result){
  if(err) {
    console.log(err);
  }else {
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
    return  db.find({selector: {'obj.email': email}});
  },
  findByLoggedInUser: function(value) {
    return  db.find({selector: {'obj.loggedIn': {$eq: value}}});
  },
  findByYear: function(year) {
    return db.find({selector: {'year' : {$type: "object"}}});
  },
  getAttachment: function(id, attachment, revision) {
    return(db.getAttachment(id, attachment, { _rev: revision}));
  },
  deleteAttachment: function(id, attachment, revision) {
    return (db.removeAttachment(id, attachment, revision));
  },
  queryData: function(year) {
    return db.query('year', {
      key: year
    });
  }
}
