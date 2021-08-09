import * as XLSX from 'xlsx';


export function excel() {


  var url = "../assets/tables/Welcome_to_Bavaria_V_2_35.xlsx";

  /* set up async GET request */
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "arraybuffer";

  req.onload = function(e) {
    var data = new Uint8Array(req.response);
    var workbook = XLSX.read(data, {type:"array"});

    /* DO SOMETHING WITH workbook HERE */
    console.log(workbook);
  }

  req.send();






}
