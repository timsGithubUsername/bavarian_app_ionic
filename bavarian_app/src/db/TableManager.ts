//Inspiriert von https://visualstudiomagazine.com/articles/2016/09/01/working-with-indexeddb.aspx
import {
  CategoriesTableModel,
  DialectTableModel,
  LanguagesTableModel,
  LevelsTableModel,
  VocabWordsTableModel
} from "./TableModels";
import {Table} from "../interactor/Table";

export abstract class TableManager<T>{

  protected content:Table;

  constructor(public tInfo:TableInfo,public db: IDBDatabase) {
  }

  public setContent(table:Table):void{
    this.content = table;
  }

  public createIndex(tbl:IDBObjectStore):void{
    tbl.createIndex(this.tInfo.primaryIndexName,this.tInfo.primaryFieldName);
  }

  public createRow(ob:T):void{
    console.log(ob)
    console.log(this.tInfo.tableName)
    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");

    let tbl : IDBObjectStore = trans.objectStore(this.tInfo.tableName);
    tbl.add(ob);
  }

  public deleteRow(id:string):void{
    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");
    let tbl : IDBObjectStore = trans.objectStore(this.tInfo.tableName);
    tbl.delete(id);
  }

  public clearTable():void{
    let trans : IDBTransaction = this.db.transaction([this.tInfo.tableName], "readwrite");
    let tbl : IDBObjectStore = trans.objectStore(this.tInfo.tableName);
    tbl.clear();
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


  public updateRow(obj: T):void {

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

  public abstract fillTable():void;
}

export class VocabWordsTableManager extends TableManager<VocabWordsTableModel>{

  private categoriesIndexName;
  private categoriesName;
  private dialect:string;
  private language:string;


  constructor(dialect:string,language:string,db:IDBDatabase) {
    let x = new TableInfo();
    x.primaryFieldName = "";
    x.tableName = "VocabWordsTable";
    x.primaryIndexName = "idIndex";
    super(x,db);

    this.categoriesIndexName  = "categoriesIndex";
    this.categoriesName = "categories";

    this.language = language;
    this.dialect = dialect;
  }

  public createIndex(tbl:IDBObjectStore):void{
    tbl.createIndex(this.categoriesIndexName,this.categoriesName);
  }

  public readRows(category:number,response: (obs : VocabWordsTableModel[]) => void):void{
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

  public fillTable(): void {
    let dialectColumn = this.content.getColumnIndex(this.dialect);
    let languageColumn = this.content.getColumnIndex(this.language);
    this.content.getTable().forEach((row:string[]) => {
      let rowObj = new VocabWordsTableModel();
      rowObj.categories = parseInt(row[0]);
      rowObj.german = row[1];
      rowObj.pictureName = row[2];
      rowObj.comment = row[3]
      rowObj.dialect = row[dialectColumn];
      rowObj.dialectLiterally = row[dialectColumn+1];
      rowObj.audioName = row[dialectColumn+2];
      rowObj.translation = row[languageColumn];
      this.createRow(rowObj);
    })
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

  public fillTable(): void {
    this.content.getTable().forEach((row:string[]) => {
      let rowObj = new CategoriesTableModel();
      rowObj.id = parseInt(row[0]);
      rowObj.name = row[1];
      rowObj.level = parseInt(row[2]);
      rowObj.pictureName = row[3];
      this.createRow(rowObj)
    })
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

  public fillTable(): void {
    this.content.getTable().forEach((row:string[]) => {
      let rowObj = new DialectTableModel();
      rowObj.id = parseInt(row[0]);
      rowObj.name = row[1];
      rowObj.gender = row[2];
      rowObj.color = row[3];
      rowObj.info = row[4];
      this.createRow(rowObj)
    })
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

  public fillTable(): void {
    this.content.getTable().forEach((row:string[]) => {
      let rowObj = new LanguagesTableModel();
      rowObj.id = parseInt(row[0]);
      rowObj.language = row[1];
      rowObj.pictureName = row[2];
      this.createRow(rowObj)
    })
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

  public fillTable(): void {
    this.content.getTable().forEach((row:string[]) => {
      let rowObj = new LevelsTableModel();
      rowObj.id = parseInt(row[0]);
      rowObj.pictureName = row[1];
      this.createRow(rowObj)
    })
  }
}

export class TableInfo {
  tableName: string;
  primaryFieldName: string;
  primaryIndexName: string;
}
