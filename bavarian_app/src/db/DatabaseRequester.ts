import {
  CategoriesTableManager,
  DialectTableManager,
  LanguagesTableManager, LevelsTableManager,
  TableManager, VocabWordsTableManager
} from "./TableManager";
import {Table, TableFactoryImpl} from "../interactor/Table";
import {ExcelManagerImpl, ExcelManagerRequest} from "../excel/ExcelManager";

/**
 * Handles all requests to the database
 */
export interface DatabaseRequester{

  /**
   * Starts the database and performs the necessary checks.
   * If this method is called after the first app start or after a
   * version change, all tables of the database are refreshed.
   * Before this method can be called, each content of each table
   * must be set.
   * TODO: Excel sheets should not be read at every app start but only when they are needed.
   * @param response Called after the startDatabase request is completed.
   */
  startDatabase(response:(()=>void)):void;

  /**
   * Deletes each table in the database and then calls startDatabase
   * @param response Called after the resetDatabase request is completed
   */
  resetDatabase(response:(()=>void)):void;

  /**
   * Sets the Content for the VocabWordsTable
   * After this method call, either startDatabase or resetDatabase
   * must be called for the change to take effect.
   * @param content All information in the original table
   * @param language Selected language. If empty it gets set to Englisch
   * @param dialect Selected dialect. If empty it gets set to Regensburg_male
   */
  setVocabWordsContent(content:Table,language:string,dialect:string):void;

  /**
   * Sets the Content for the CategoriesTable
   * After this method call, either startDatabase or resetDatabase
   * must be called for the change to take effect.
   * @param content All information in the original table
   */
  setCategoriesContent(content:Table):void;

  /**
   * Sets the Content for the DialectContent
   * After this method call, either startDatabase or resetDatabase
   * must be called for the change to take effect.
   * @param content
   */
  setDialectContent(content:Table):void;

  /**
   * Sets the Content for the LanguageTable
   * After this method call, either startDatabase or resetDatabase
   * must be called for the change to take effect.
   * @param content All information in the original table
   */
  setLanguageContent(content:Table):void;

  /**
   * Sets the Content for the LevelsTable
   * After this method call, either startDatabase or resetDatabase
   * must be called for the change to take effect.
   * @param content All information in the original table
   */
  setLevelsContent(content:Table):void;

}

/**
 * Implementation for the DatabaseRequester
 */
export class DatabaseRequesterImpl implements DatabaseRequester{

  private dbName = "BavarianDB";
  private dbVersion = 1;

  private language:string;
  private dialect:string;

  private upgradeNeeded = false;
  //Set to true if the version number changes or no database existed before.

  private request:IDBOpenDBRequest;
  private db : IDBDatabase;

  private tableInfos : TableManager<any>[];
  private vocabManager : VocabWordsTableManager;
  private vocabWordsContent:Table;
  private categoriesContent:Table;
  private dialectContent:Table;
  private languageContent:Table;
  private levelsContent:Table;



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
      //Tables are only refilled if the version has changed or no database existed before.
      if(this.upgradeNeeded){
        that.vocabManager.clearTable();
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

  /**
   * Resets the TableInfo list, recreates all manager objects
   * and adds them to the list again.
   * @private
   */
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

  /**
   * A store and an associated index are created for each manager.
   * @private
   */
  private createTable(){
    let params : IDBObjectStoreParameters;

    this.tableInfos.forEach((tm:TableManager<any>) => {

      //If no primary key is specified in the tableInfo, it will be set and managed automatically
      if(!tm.tInfo.primaryFieldName || tm.tInfo.primaryFieldName == ""){
        params = {autoIncrement: true};
      }else{
        params = {keyPath: tm.tInfo.primaryFieldName};
      }

      //Table will be created only if none existed before
      if(!this.db.objectStoreNames.contains(tm.tInfo.tableName)) {
        let tbl: IDBObjectStore = this.db.createObjectStore(tm.tInfo.tableName, params);
        tm.createIndex(tbl);
      }
    })
  }

  /**
   * All tables are filled according to the Excel tables
   * @private
   */
  private fillTable(){
    this.tableInfos.forEach((table:TableManager<any>) =>{
      table.fillTable();
    })
  }

  public resetDatabase(response:(()=>void)) {
    this.db.close();
    indexedDB.deleteDatabase(this.dbName);
    this.startDatabase(response);
  }

}
/*
//Test Code for IndexedDb
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
