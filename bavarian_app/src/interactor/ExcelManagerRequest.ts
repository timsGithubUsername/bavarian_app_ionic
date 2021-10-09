import {Table} from "./Table";
import {Language} from "../entities/Language";
import {Dialect} from "../entities/Dialect";
import {Level} from "../entities/Level";
import {VocabularyWord} from "../entities/VocabularyWord";

/**
 * Handles all requests on a Excel document
 */
export interface ExcelManagerRequest{

  /**
   * Requests a table object from an Excel document.
   * @param fileName Document file name
   * @param sheetIndex
   * @param response Called with the result if the request is successful.
   */
  requestExcelTable(fileName:string,sheetIndex:number,response:((table:Table) => void)):void;
}
