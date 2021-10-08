import * as XLSX from 'xlsx';
import {WorkBook, WorkSheet} from "xlsx";
import {Table, TableFactory, TableFactoryImpl} from "../interactor/Table";

//https://github.com/SheetJS/sheetjs

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


export class ExcelManagerImpl implements ExcelManagerRequest{

  //Path where all Excel tables are stored
  private path = "../assets/tables/";
  //Instance of a TableFactory to create new tables.
  private tableFacrory: TableFactory;

  /**
   * Requests a table object from an Excel document.
   * @param fileName Document file name
   * @param sheetIndex
   * @param response Called with the result if the request is successful.
   */
  requestExcelTable(fileName: string, sheetIndex: number, response: (table: Table) => void): void {
      this.readFile(fileName,sheetIndex,response);
  }

  setTableFactory(instance:TableFactory):void{
    this.tableFacrory = instance;
  }

  /**
   * Reads an Excel document
   * @param fileName
   * @param sheetIndex
   * @param response
   * @private
   */
  private readFile(fileName:string, sheetIndex:number,response: (table: Table) => void):void{

    let url = this.path + fileName;
    let that = this;

    /* set up async GET request */
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function(e) {
      let data = new Uint8Array(req.response);
      let workbook = XLSX.read(data, {type:"array"});

      that.convert(workbook,sheetIndex,response);
    }

    req.send();

  }

  /**
   * Converts an Excel document from a workbook to a table object
   * @param workBook Excel document
   * @param sheetIndex
   * @param response
   * @private
   */
  private convert(workBook:WorkBook, sheetIndex:number,response: (table: Table) => void):void {

    let sheetName = workBook.SheetNames[sheetIndex]
    let worksheet = workBook.Sheets[sheetName];

    let table = this.tableFacrory.createTable();

    //Width of the table gets calculated
    let width = this.getSheetWidth(worksheet);

    table.setColumnNames(this.getColumnNameList(worksheet,width));

    table.setTable(this.getStringArray(worksheet,width));

    response(table);

  }

  private getColumnNameList(worksheet:WorkSheet,width:number):string[]{
    let columnNames:string[]=[];

    for(let i = 0;i < width;i++){
      columnNames.push(worksheet[this.numberToLetters(i)+1].v);
    }

    return columnNames;
  }

  private getStringArray(worksheet:WorkSheet,width:number):(string[])[] {

    let result:(string[])[] = [];

    let end = false;
    let y = 2; //First row are the column names and are therefore skipped here.
    while(!end){ //Continues to run until there are no entries in the complete next line
      end = true;

      for(let x = 0;x < width;x++) {
        let cell = worksheet[this.numberToLetters(x) + y]
        if (!cell || cell.v === "") { // If there is no entry in the current cell
          end = end && true;
        }else{
          //If this is the first entry of a new line a new array is created first
          if(!result[y-2]){
            result[y-2] = [];
          }
          result[y-2][x] = cell.v;
          end = false;
        }
      }
      y++;
    }
    return result;
  }

  private getSheetWidth(worksheet:WorkSheet):number {
    let end = false;
    let index = 0;
    while(!end){
      let cell = worksheet[this.numberToLetters(index)+1];
      if( !cell || cell.v === ""){
        end = true;
      }else{
        index++;
      }
    }
    return index;
  }

  /**
   * Converts a number to the corresponding letter identifiers of the X-axis of an Excel spreadsheet
   * @param num number to convert
   * @private
   */
  private numberToLetters(num:number):string{

    num++;

    let valueA = 65;
    let valueZ = 90;
    let length = (valueZ - valueA) + 1;
    let result = "";

    while(num > 0){
      let mod = (num - 1) % length;
      result = String.fromCharCode(mod + valueA) + result;
      num = Math.floor((num -  mod)/ length);
    }

    return result;
  }
}


