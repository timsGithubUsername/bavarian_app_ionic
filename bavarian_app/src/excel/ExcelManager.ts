import * as XLSX from 'xlsx';
import {WorkBook} from "xlsx";


export class ExcelManager{

  private path = "../assets/tables/";

  readFile(fileName:string):void{

    let url = this.path + fileName;
    let that = this;

    /* set up async GET request */
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function(e) {
      let data = new Uint8Array(req.response);
      let workbook = XLSX.read(data, {type:"array"});

      that.convert(workbook);
    }

    req.send();

  }

  convert(workBook:WorkBook):void {

  }
}



export function excel() {



  let em = new ExcelManager();
  em.readFile("Welcome_to_Bavaria_V_2_35.xlsx")





}
