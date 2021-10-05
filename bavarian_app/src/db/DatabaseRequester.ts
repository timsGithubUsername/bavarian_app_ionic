export class DatabaseRequesterImpl{

  private dbName = "BavarianDB";
  private dbVersion = 1.0;

  private request:IDBOpenDBRequest;
  private db : IDBDatabase;

  private start():void{
    this.request = indexedDB.open(this.dbName,this.dbVersion);

    this.request.onupgradeneeded = this.create;

    this.request.onsuccess = ev => {

    }

    this.request.onerror = (ev : any) =>  {
      alert(ev.target.error.message)
    }
  }

  private create(event : any):void{
    this.db = event.target.result;
    this.db.createObjectStore("VocabWords")
    let param : IDBObjectStoreParameters = { autoIncrement : true}
  }

  private resetDB() {
    this.db.close();
    indexedDB.deleteDatabase(this.dbName);
    this.start();
  }


}

export function db():void{
  this.indexedDB.get
}


