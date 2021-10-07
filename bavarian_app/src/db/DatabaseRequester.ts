import {
  CategoriesTableManager,
  DialectTableManager,
  LanguagesTableManager, LevelsTableManager,
  TableManager, VocabWordsTableManager
} from "./TableManager";
import {Table, TableFactoryImpl} from "../interactor/Table";
import {ExcelManagerImpl, ExcelManagerRequest} from "../excel/ExcelManager";

export class DatabaseRequesterImpl{

  private dbName = "BavarianDB";
  private dbVersion = 1;

  private upgradeNeeded = false;

  private request:IDBOpenDBRequest;
  private db : IDBDatabase;

  private tableInfos : TableManager<any>[];
  private vocabManager : VocabWordsTableManager;
  private vocabWordsContent:Table;
  private categoriesContent:Table;
  private dialectContent:Table;
  private languageContent:Table;
  private levelsContent:Table;
  private language:string;
  private dialect:string;

  public setVocabWordsContent(content:Table,language:string,dialect:string):void{
    this.vocabWordsContent = content;
    this.language = language;
    this.dialect = dialect;
  }

  public setCategoriesContent(content:Table):void{
    this.categoriesContent = content;
  }

  public setDialectContent(content:Table):void{
    this.dialectContent = content;
  }

  public setLanguageContent(content:Table):void{
    this.languageContent = content;
  }

  public setLevelsContent(content:Table):void{
    this.levelsContent = content;
  }

  public startDatabase(response:(()=>void)):void{
    this.request = indexedDB.open(this.dbName,this.dbVersion);
    let that = this;
    this.request.onupgradeneeded = (event:any) => {
      that.create(event);

    }

    this.request.onsuccess = (event:any) => {
      that.db = event.target.result;
      that.createTableManagers();
      if(this.upgradeNeeded){
        that.vocabManager.clearTable();
        that.fillTable();
      }

      response();
    }

    this.request.onerror = (event : any) =>  {
      alert(event.target.error.message)
    }
  }

  private create(event : any):void{
    this.db = event.target.result;

    this.upgradeNeeded = true;

    this.createTableManagers();

    this.createTable();


  }

  private createTableManagers(){

    this.tableInfos = [];
    let vocabWordsTableManager = new VocabWordsTableManager(this.dialect,this.language,this.db);
    vocabWordsTableManager.setContent(this.vocabWordsContent);
    this.vocabManager = vocabWordsTableManager;
    this.tableInfos.push(vocabWordsTableManager);

    let categoriesTableManager = new CategoriesTableManager(this.db);
    categoriesTableManager.setContent(this.categoriesContent);
    this.tableInfos.push(categoriesTableManager);

    let dialectTableManager = new DialectTableManager(this.db);
    dialectTableManager.setContent(this.dialectContent);
    this.tableInfos.push(dialectTableManager);

    let languagesTableManager = new LanguagesTableManager(this.db);
    languagesTableManager.setContent(this.languageContent);
    this.tableInfos.push(languagesTableManager);

    let levelsTableManager = new LevelsTableManager(this.db);
    levelsTableManager.setContent(this.levelsContent);
    this.tableInfos.push(levelsTableManager);
  }

  private createTable(){
    let params : IDBObjectStoreParameters;
    this.tableInfos.forEach((tm:TableManager<any>) => {
      if(!tm.tInfo.primaryFieldName || tm.tInfo.primaryFieldName == ""){
        params = {autoIncrement: true};
      }else{
        params = {keyPath: tm.tInfo.primaryFieldName};
      }
      if(!this.db.objectStoreNames.contains(tm.tInfo.tableName)) {
        let tbl: IDBObjectStore = this.db.createObjectStore(tm.tInfo.tableName, params);
        tm.createIndex(tbl);
      }
    })
  }

  private fillTable(){
    this.tableInfos.forEach((table:TableManager<any>) =>{
      table.fillTable();
    })
  }

  public resetDB(response:(()=>void)) {
    this.db.close();
    indexedDB.deleteDatabase(this.dbName);
    this.startDatabase(response);
  }



}
/*
export function db():void{
  let em : ExcelManagerImpl= new ExcelManagerImpl();
  em.setTableFactory(new TableFactoryImpl());
  let dr : DatabaseRequesterImpl = new DatabaseRequesterImpl();
  let counter = 0;
  let start = function (){
    counter++;
    if(counter > 4){
      dr.startDatabase(()=>{})
    }
  }

  em.requestExcelTable("Welcome_to_Bavaria_V_2_35.xlsx","VocabWords",0,(table:Table)=>{
    dr.setVocabWordsContent(table,"Englisch","Regensburg_male");
    start();
  })
  em.requestExcelTable("Categories_V_1_5.xlsx","Categories",0,(table:Table)=>{
    dr.setCategoriesContent(table)
    start();
  })
  em.requestExcelTable("Dialects_V_1_17.xlsx","Dialects",0,(table:Table)=>{
    dr.setDialectContent(table)
    start();
  })
  em.requestExcelTable("Languages_V_1_8.xlsx","Languages",0,(table:Table)=>{
    dr.setLanguageContent(table)
    start();
  })
  em.requestExcelTable("Levels_V_1_5.xlsx","Levels",0,(table:Table)=>{
    dr.setLevelsContent(table)
    start();
  })



}

*/
