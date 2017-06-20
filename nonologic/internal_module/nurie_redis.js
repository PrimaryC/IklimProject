var Redis =       require('ioredis'),
    db =          new Redis(6379, 'localhost');


var Promise = require("bluebird");

const NURIE_ARTICLE_PREFIX = "nurie:";

function lpushMetadata(prefix, doc, target) {
    return db.lpush(prefix + target,doc[target]);
}

function lgetMetadata(prefix, target){
  return db.lrange(prefix + target)
}

function getMetadata(prefix, target){
  return db.get(prefix + target)
}
function setMetadata(prefix, doc, target){
    return db.set(prefix+target, doc[target]);
}

module.exports = {
  "getIklim" : function(id) {
    let iklimDBID = NURIE_ARTICLE_PREFIX + id + ":iklim"
    db.exists(iklimDBID, function(err, result){
      if(err) return err;
      if(result == 1){

      }
    })
  },
  "setRelation" : function(id, doc, callback){
    let docID = NURIE_ARTICLE_PREFIX+id+":";
    let promiseList = [];
    promiseList.push(lpushMetadata(docID, doc, "AttractedArticle"));
    promiseList.push(lpushMetadata(docID, doc, "LeadingArticle"));
    promiseList.push(lpushMetadata(docID, doc, "ReferedArticle"));
    Promise.all(promiseList).then(values => {
      console.log(values);
    }, reason => {
      console.log(reason);
    })
  },
  "getRelation" : function(id, callback){
    let docID = "nurie:"+id+":";
    let promiseList = [];
    promiseList.push(lgetMetadata(docID, "AttractedArticle"));
    promiseList.push(lgetMetadata(docID, "LeadingArticle"));
    promiseList.push(lgetMetadata(docID, "ReferedArticle"));
    Promise.all(promiseList).then(values => {
      let relation = {
        "Attracted" : values[0],
        "Lead" : values[1],
        "Refer" : values[2]
      };
      callback(relation);
    })
  },
  "setSeries" : function(id, doc){
    let docID = "nurie:"+id+":";
    let promiseList = [];
    promiseList.push(setMetadata(docID, doc, "Prev"));
    promiseList.push(setMetadata(docID, doc, "Next"));
    Promise.all(promiseList).then(values => {
      console.log(values);
    }, reason => {
      console.log(reason);
    })
  },
  "getSeries" : function(id, callback){
    let docID = "nurie:"+id+":";
    let promiseList = [];
    promiseList.push(lgetMetadata(docID, ))
    Promise.all(promiseList).then(values => {

    })
  }
  "addArticle" : function(id, doc) {
    setRelation(id, doc);
    setSeries(id, doc);

    let docID = "nurie:"+id+":";
    let promiseList = [];
    promiseList.push(lpushMetadata(docID, doc, "Iklim"));
    promiseList.push(setMetadata(docID, doc, "Author"));

    Promise.all(promiseList).then(values => {
      console.log(values);
    }, reason => {
      console.log(reason);
      return reason;
    });

    return "ok";
  },
  "getArticle": function(id, callback){
    let documentJSON = {};
    getRelation(id, function(relation){
      documentJSON.Relation = relation;
    });
    getSeries(id, function(series){
      documentJSON.series = series;
    });
    let docID = "nurie:"+id+":";

    let promiseList = [];
    promiseList.push(lgetMetadata(docID, "Iklim"));
    promiseList.push(getMetadata(docID, "Author"));
    Promise.all(promiseList).then(values => {
      documentJSON.Iklim = values[0];
      documentJSON.Author = values[1];
      callback(documentJSON);
    })
  }
  "db" : db
}
