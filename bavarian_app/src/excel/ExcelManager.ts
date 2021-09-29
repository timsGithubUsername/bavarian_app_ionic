import * as XLSX from 'xlsx';
import {WorkBook, WorkSheet} from "xlsx";
import {Table, TableFactory, TableFactoryImpl} from "../interactor/Table";

//https://github.com/SheetJS/sheetjs

export interface ExcelManagerRequest{

  requestExcelTable(fileName:string,sheetIndex:number,response:((table:Table) => void)):void;

}


export class ExcelManagerImpl implements ExcelManagerRequest{


  private path = "../assets/tables/";
  private tableFacrory: TableFactory;
  private width: number;
  private response:(table: Table) => void;

  requestExcelTable(fileName: string, sheetIndex: number, response: (table: Table) => void): void {

      this.response = response;

      this.readFile(fileName,sheetIndex);

  }

  setTableFactory(instance:TableFactory):void{
    this.tableFacrory = instance;
  }


  private readFile(fileName:string, sheetIndex:number):void{

    let url = this.path + fileName;
    let that = this;

    /* set up async GET request */
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function(e) {
      let data = new Uint8Array(req.response);
      let workbook = XLSX.read(data, {type:"array"});

      that.convert(workbook,sheetIndex);
    }

    req.send();

  }

  private convert(workBook:WorkBook, sheetIndex:number):void {
    let sheetName = workBook.SheetNames[sheetIndex]
    let worksheet = workBook.Sheets[sheetName];
    let table = this.tableFacrory.createTable();


    this.width = this.getSheetWidth(worksheet);

    table.setColumnNames(this.getColumnNameList(worksheet));

    table.setTable(this.getStringArray(worksheet));

    this.response(table);

  }

  private getColumnNameList(worksheet:WorkSheet):string[]{
    let columnNames:string[]=[];

    for(let i = 0;i < this.width;i++){
      columnNames.push(worksheet[this.numberToLetters(i)+1].v);
    }

    return columnNames;
  }

  private getStringArray(worksheet:WorkSheet):(string[])[] {

    let result:(string[])[] = [];

    let end = false;
    let y = 2; //First row are the column names and are therefore skipped here.
    while(!end){
      end = true;

      for(let x = 0;x < this.width;x++) {
        let cell = worksheet[this.numberToLetters(x) + y]
        if (!cell || cell.v === "") {
          end = end && true;
        }else{
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

  private numberToLetters(num:number):string{
    num = num + 1;

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


