import {Table} from "./Table";
import {Language} from "../entities/Language";
import {Dialect} from "../entities/Dialect";
import {Level} from "../entities/Level";
import {VocabularyWord} from "../entities/VocabularyWord";

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

  requestAllLanguages(response:((langs:Language[])=>void)):void;

  requestAllDialects(response:((dialects:Dialect[]) =>void)):void;

  requestAllLevels(response:((levels:Level[]) => void)):void;

  requestVocabularyWords(cat:number,response:((words:VocabularyWord[]) => void)):void;


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
