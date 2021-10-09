import {
  CategoriesTableManager,
  DialectTableManager,
  LanguagesTableManager,
  LevelsTableManager,
  TableManager,
  VocabWordsTableManager
} from "./TableManager";
import {Table, TableFactoryImpl} from "../interactor/Table";
import {DatabaseRequester} from "../interactor/DatabaseRequester";
import {Dialect, Gender} from "../entities/Dialect";
import {Language} from "../entities/Language";
import {Level} from "../entities/Level";
import {VocabularyWord} from "../entities/VocabularyWord";
import {
  CategoriesTableModel,
  DialectTableModel,
  LanguagesTableModel,
  LevelsTableModel,
  VocabWordsTableModel
} from "./TableModels";
import {DialectFactory} from "../entities/factory/DialectFactory";
import {LanguageFactory} from "../entities/factory/LanguageFactory";
import {LevelFactory} from "../entities/factory/LevelFactory";
import {CategoryFactory} from "../entities/factory/CategoryFactory";
import {VocabularyWordFactory} from "../entities/factory/VocabularyWordFactory";
import {Category, CategoryMutable} from "../entities/Category";
import {ExcelManagerImpl} from "../excel/ExcelManager";

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
  private categoriesManager: CategoriesTableManager;
  private dialectsManager: DialectTableManager;
  private languagesManager:LanguagesTableManager;
  private levelsManager:LevelsTableManager;

  private vocabWordsContent:Table;
  private categoriesContent:Table;
  private dialectContent:Table;
  private languageContent:Table;
  private levelsContent:Table;

  private dialectFactory:DialectFactory;
  private languageFactory:LanguageFactory;
  private levelFactory:LevelFactory;
  private categoryFactory:CategoryFactory;
  private vocabFactory:VocabularyWordFactory;



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
    let that = this;

    //Hilfsmethode
    let setManager = function(manager:TableManager<any>,content:Table):TableManager<any>{
      manager.setContent(content);
      that.tableInfos.push(manager);
      return manager;
    }

    this.vocabManager = <VocabWordsTableManager>setManager(
      new VocabWordsTableManager(this.dialect, this.language, this.db),
      this.vocabWordsContent);

    this.categoriesManager = <CategoriesTableManager>setManager(
      new CategoriesTableManager(this.db),
      this.categoriesContent);


    this.dialectsManager = <DialectTableManager>setManager(
      new DialectTableManager(this.db),
      this.dialectContent);

    this.languagesManager = <LanguagesTableManager>setManager(
      new LanguagesTableManager(this.db),
      this.languageContent);

    this.levelsManager = <LevelsTableManager>setManager(
      new LevelsTableManager(this.db),
      this.levelsContent);
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

  requestAllDialects(response: (dialects: Dialect[]) => void): void {
    this.dialectsManager.readAllRows((objects: DialectTableModel[]) => {
      let result:Dialect[] = [];
      objects.forEach((obj:DialectTableModel) =>{
        let dialect = this.dialectFactory.create(
          obj.name,
          obj.id,
          obj.gender === "w" ? Gender.FEMALE : Gender.MALE,
          obj.info
        );
        result.push(dialect);
      });
      response(result);
    });
  }

  requestAllLanguages(response: (langs: Language[]) => void): void {
    this.languagesManager.readAllRows((objects:LanguagesTableModel[]) =>{
      response(this.buildLanguages(objects));
    });
  }

  private buildLanguages(langM:LanguagesTableModel[]):Language[] {
    let result:Language[] = [];
    langM.forEach((obj:LanguagesTableModel) => {
      let language = this.languageFactory.createLanguage(
        obj.language,
        obj.pictureName
      );
      result.push(language);
    });
    return result;
  }



  requestAllLevels(response: (levels: Level[]) => void): void {
    this.levelsManager.readAllRows((levelModels:LevelsTableModel[])=>{
      this.categoriesManager.readAllRows((catModels:CategoriesTableModel[]) => {
        response(this.buildLevels(levelModels,catModels));
      });
    });
  }

  private buildLevels(levelModels:LevelsTableModel[],catModels:CategoriesTableModel[]):Level[]{
    let result:Level[] = [];
    levelModels.forEach((levelM:LevelsTableModel) =>{
      result.push(this.levelFactory.createLevel(
        levelM.id,
        levelM.pictureName,
        this.buildCategories(
          catModels.filter((value:CategoriesTableModel) => value.level === levelM.id)
        )
      ));
    });
    return result;
  }

  private buildCategories(catModels:CategoriesTableModel[]):CategoryMutable[]{
    let result:CategoryMutable[] = [];
    catModels.forEach((value:CategoriesTableModel) =>{
      result.push(this.categoryFactory.createCategory(
        value.name,
        value.pictureName
      ));
    })
    return result;
  }

  requestVocabularyWords(cat: number, response: (words: VocabularyWord[]) => void): void {
    this.vocabManager.readRows(cat,(vocabs:VocabWordsTableModel[])=> {
      response(this.buildVocabularyWords(vocabs));
    });
  }

  buildVocabularyWords(vocabs:VocabWordsTableModel[]):VocabularyWord[]{
    let result:VocabularyWord[] = [];
    vocabs.forEach((value :VocabWordsTableModel) => {
      let word = this.vocabFactory.createVocabularyWord(
        value.dialect,
        value.german,
        value.translation
      );
      word.setDialectWordLiterally(value.dialectLiterally);
      word.setAnnotation(value.comment);
      word.setPicturePath(value.pictureName);
      word.setPronunciationPath(value.audioName);
      result.push(word);
    })
    return result;
  }
}

//Test Code for IndexedDb
export function db():void{
  let em : ExcelManagerImpl= new ExcelManagerImpl();
  em.setTableFactory(new TableFactoryImpl());
  let dr : DatabaseRequesterImpl = new DatabaseRequesterImpl();
  let counter = 0;
  let start = function (){
    counter++;
    if(counter > 4){
      dr.startDatabase(()=>{
        dr.requestAllDialects(dialects => {
          console.log(dialects);
        })
      })
    }
  }

  em.requestExcelTable("Welcome_to_Bavaria_V_2_35.xlsx",0,(table:Table)=>{
    dr.setVocabWordsContent(table,"Englisch","Regensburg_male");
    start();
  })
  em.requestExcelTable("Categories_V_1_5.xlsx",0,(table:Table)=>{
    dr.setCategoriesContent(table)
    start();
  })
  em.requestExcelTable("Dialects_V_1_17.xlsx",0,(table:Table)=>{
    dr.setDialectContent(table)
    start();
  })
  em.requestExcelTable("Languages_V_1_8.xlsx",0,(table:Table)=>{
    dr.setLanguageContent(table)
    start();
  })
  em.requestExcelTable("Levels_V_1_5.xlsx",0,(table:Table)=>{
    dr.setLevelsContent(table)
    start();
  })



}


