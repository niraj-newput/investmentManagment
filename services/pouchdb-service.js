import PouchDB from 'pouchdb';
import plugin from 'pouchdb-find';
PouchDB.plugin(plugin);
var db = new PouchDB('InvestDB',plugin);

export const dbConfig = {
  putData: function(doc) {
    return db.put(doc);
  },
  getData: function() {
    
  },
  getAllData: function() {
    
  }
}

