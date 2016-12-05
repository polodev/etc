####To start MongoDB
``` 
	net start mongodb or mongod
``` 
####To use mongo on shell
``` 
  mongo
``` 
####To show all database
``` 
show dbs 
``` 
local is predifined

####To select a database or create a database(if not present)
``` 
use <dbName> 
```

####To  show all databases
``` 
db 
```

####To create a user 
```
db.createUser({
	user : <polo>,
	pwd : <1234>,
	roles : [":readWrite", "dbAdmin"]
})
```

####To create a collection
```
db.createCollection(<collectionName>)
```

####To  Show  all collection
```
show collections
```

####To insert a entry
```
db.<collectionName>.insert({key : "value"}, {key : "value"})
```

####To show all entry   
``` 
db.<collectionName>.find()
```    

####To show all entry object style
``` 
db.<collectionName>.find().pretty()
```    

####To update collection   
update function is used. It has 2 arguments. first argument for searching 2nd argument for setting value  
``` 
db.<collectionName>.update({firstName : 'john'}, {firstName : 'jane', lastName : 'doe', 'country' : 'India'})
```    

####To update a row when key is not exist    
``` 
db.<collectionName>.update({searching key value},  {$set : {gender : "Male"}})
```   
`$set` variable used for added new property to the entry  

####To Make property incremental    
``` 
db.<collectionName>.update({searching key value},  {$inc : {age : 44}})
```    
`$inc` make property incremental

####To remove a property from entry    
``` 
db.<collectionName>.update({searching key value},  {$unset : {age : 1}})
```   
Here age = 1 I wrote because without value it shows error.  `$unset` remove property for entry

#### `upsert : true` is in third argument of update method. It tells if search is not matched it will be new entry.  
``` 
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```    

####To rename propery name of entries    
``` 
db.<collectionName>.update({searching key value},  {$rename: { <field1>: <newName1>, <field2>: <newName2>, ... } })
```    

####To remove entry from collections    
``` 
db.collection.remove({name : 'john'})
```    

####To delete only first occurrence     
``` 
db.collection.remove({name : 'john'} , {justOne : true})
```    

####To find collections   
``` 
db.<collectionName>.find({firstName : 'john'})
```    

####To find collection by multiple arguments
``` 
db.<collectionName>.find($or : [{firstName : 'john'}, {country : 'india'}])

```    
`$or` for multiple argument. Here array contain all arguments; 

####$lt & $gt
``` 
db.<collectionName>.find( { field: { $gt: value1, $lt: value2 } } );
db.<collectionName>.find( { age: { $lt: 40} } );
```   
gt refer to greater than and lt refer to less than.    

####To sort
``` 
db.<collectionName>.find().sort({lastName : 1});
db.<collectionName>.find().sort({lastName : -1}).pretty();
db.<collectionName>.find({filter}).limit(4).sort({lastName : -1}).pretty();
```    

####To Count
``` 
db.<collectionName>.find().count();

```    

####To iterate 
``` 
db.<collectionName>.find().forEach((doc) => print("collection name is " + doc.firstName + " " + doc.lastName))
```    

####To Delete collection   
``` 
db.<collectionName>.drop();
```    

####To delete current Database
``` 
db.dropDatabase();
```    
