//Inspiriert von https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx
import {
  CategoriesTableModel,
  DialectTableModel,
  LanguagesTableModel,
  LevelsTableModel,
  VocabWordsTableModel
} from "./TableModels";

export class TableManager<T>{

  constructor(public tInfo:TableInfo,public db: IDBDatabase) {
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

  private categoriesIndexName;
  private categoriesName;


  constructor(db:IDBDatabase) {
    let x = new TableInfo();
    x.primaryFieldName = "id";
    x.tableName = "VocabWordsTable";
    x.primaryIndexName = "idIndex";
    super(x,db);

    this.categoriesIndexName  = "categoriesIndex";
    this.categoriesName = "categories";

    this.createCategoryIndex();
  }

  private createCategoryIndex(){
    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName],"readwrite");
    let tbl : IDBObjectStore = trans.objectStore(this.tInfo.tableName);
    tbl.createIndex(this.categoriesIndexName,this.categoriesName);
  }

  public readRows(category:number,response: (obs : VocabWordsTableModel[]) => void){
    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");
    let tbl : IDBObjectStore= trans.objectStore(this.tInfo.tableName);
    let idx : IDBIndex= tbl.index(this.categoriesIndexName);
    let request : IDBRequest = idx.getAll(category);

    request.onsuccess = function(ev:any){
      let obs : VocabWordsTableModel[] = ev.target.result;
      response(obs);
    }
    request.onerror = function (ev:any){
      alert(ev.target.result);
    }
  }
}

export class CategoriesTableManager extends TableManager<CategoriesTableModel>{
  constructor(db:IDBDatabase) {
    let tInfo = new TableInfo();
    tInfo.tableName = "CategoriesTable";
    tInfo.primaryFieldName = "id";
    tInfo.primaryIndexName = "idIndex"
    super(tInfo,db);
  }
}

export class DialectTableManager extends TableManager<DialectTableModel>{
  constructor(db:IDBDatabase) {
    let tInfo = new TableInfo();
    tInfo.tableName = "DialectTable";
    tInfo.primaryFieldName = "id";
    tInfo.primaryIndexName = "idIndex";
    super(tInfo,db);
  }
}

export class LanguagesTableManager extends TableManager<LanguagesTableModel>{
  constructor(db:IDBDatabase) {
    let tInfo = new TableInfo();
    tInfo.tableName = "LanguagesTable";
    tInfo.primaryFieldName = "id";
    tInfo.primaryIndexName = "idIndex";
    super(tInfo,db);
  }
}

export class LevelsTableManager extends TableManager<LevelsTableModel>{
  constructor(db:IDBDatabase) {
    let tInfo = new TableInfo();
    tInfo.tableName = "LevelsTable";
    tInfo.primaryFieldName = "id";
    tInfo.primaryIndexName = "idIndex";
    super(tInfo,db);
  }
}

export class TableInfo {
  tableName: string;
  primaryFieldName: string;
  primaryIndexName: string;
}
