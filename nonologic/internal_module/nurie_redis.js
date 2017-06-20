var Redis =       require('ioredis'),
    db =          new Redis(6379, 'localhost');


var Promise = require("bluebird");

const NURIE_ARTICLE_PREFIX = "nurie:";

function lpushMetadata(prefix, target, object) {
    return db.lpush(prefix + target, object);
}

function lgetMetadata(prefix, target){
  return db.lrange(prefix + target, 0, -1)
}

function getMetadata(prefix, target){
  return db.get(prefix + target)
}

function setMetadata(prefix, target, object){
    return db.set(prefix+target, object);
}

module.exports = {
  "setRelation" : function(id, doc, callback){
    let docID = NURIE_ARTICLE_PREFIX+id+":";
    let promiseList = [];
    promiseList.push(lpushMetadata(docID, "AttractedArticle", doc.Relation.Attracted));
    promiseList.push(lpushMetadata(docID, "LeadingArticle", doc.Relation.Lead));
    promiseList.push(lpushMetadata(docID, "ReferedArticle", doc.Relation.Refer));
    Promise.all(promiseList).then(values => {
      console.log(values);
    }, reason => {
      console.log(reason);
    })
  },
  "getRelation" : function(id, callback){
    let docID = NURIE_ARTICLE_PREFIX+id+":";
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
    let docID = NURIE_ARTICLE_PREFIX+id+":";
    let promiseList = [];
    promiseList.push(setMetadata(docID, "Prev", doc.Series.Prev));
    promiseList.push(setMetadata(docID, "Next", doc.Series.NExt));
    Promise.all(promiseList).then(values => {
      console.log(values);
    }, reason => {
      console.log(reason);
    })
  },
  "getSeries" : function(id, callback){
    let docID = NURIE_ARTICLE_PREFIX+id+":";
    let promiseList = [];
    promiseList.push(lgetMetadata(docID, "Prev"));
    promiseList.push(lgetMetadata(docID, "Next"));
    Promise.all(promiseList).then(values => {
      let series = {
        "Prev" : values[0],
        "Next" : values[1]
      }
    })
  },
  "addArticle" : function(id, doc) {
    setRelation(id, doc);
    setSeries(id, doc);

    let docID = NURIE_ARTICLE_PREFIX+id+":";
    let promiseList = [];
    promiseList.push(lpushMetadata(docID, doc, "Iklim"));
    promiseList.push(setMetadata(docID, doc, "Author"));

    Promise.all(promiseList).then(values => {
      console.log(values);
    }, reason => {
      console.log(reason);
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
    let docID = NURIE_ARTICLE_PREFIX+id+":";

    let promiseList = [];
    promiseList.push(lgetMetadata(docID, "Iklim"));
    promiseList.push(getMetadata(docID, "Author"));
    Promise.all(promiseList).then(values => {
      documentJSON.Iklim = values[0];
      documentJSON.Author = values[1];
      callback(documentJSON);
    })
  },
  "db" : db
}
