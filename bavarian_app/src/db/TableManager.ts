//Inspiriert von https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx
import {VocabWordsTableModel} from "./TableModels";

export class TableManager<T>{

  public db: IDBDatabase;

  constructor(public tInfo:TableInfo) {
  }

  public createRow(ob:T):void{
    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");
    let tbl : IDBObjectStore = trans.objectStore(this.tInfo.tableName);
    tbl.add(ob);
  }

  public deleteRow(id:string):void{
    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");
    let tbl : IDBObjectStore = trans.objectStore(this.tInfo.tableName);
    tbl.delete(id);
  }

  public readRow(id:string,response: ((ob:T) => void)):void{

    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");
    let tbl : IDBObjectStore= trans.objectStore(this.tInfo.tableName);
    let idx : IDBIndex= tbl.index(this.tInfo.primaryIndexName);
    let req : IDBRequest= idx.get(id);

    req.onsuccess = function (e: any) {
      let obj : T = e.target.result;
      response(obj);
    };
    req.onerror = function (e: any) {
      alert(e.target.result);
    }
  }


  updateRow(obj: T) {

    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");
    let tbl : IDBObjectStore= trans.objectStore(this.tInfo.tableName);
    let idx : IDBIndex= tbl.index(this.tInfo.primaryIndexName);
    let req : IDBRequest = idx.get(obj[this.tInfo.primaryFieldName]);

    req.onsuccess = function (e: any) {
      tbl.put(obj);
    };
    req.onerror = function (e: any) {
      alert(e.target.result);
    }
  }
}

export class VocabWordsTableManager extends TableManager<VocabWordsTableModel>{
  constructor() {
    super();
  }
}

export class TableInfo {
  tableName: string;
  primaryFieldName: string;
  primaryIndexName: string;
}
