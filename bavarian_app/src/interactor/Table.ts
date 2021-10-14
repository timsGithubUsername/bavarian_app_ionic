export interface Table{

  /**
   * Overrides the content of the Table
   * @param table
   */
  setTable(table : (string[])[]):void;

  /**
   * Returns the whole table
   */
  getTable():(string[])[];

  /**
   * Returns the contents of a cell in the table
   * @param column
   * @param row
   */
  getCell(column:number,row:number):string;

  /**
   * Returns the contents of a cell in the table. Uses the name of the column instead of the index.
   * @param columnName
   * @param row
   */
  getCellByName(columnName:string,row:number):string;

  /**
   * Sets the content of a specific cell.
   * @param column
   * @param row
   * @param content
   */
  setCell(column:number,row:number,content:string):void;

  /**
   * Sets the content of a specific cell. Uses the name of the column instead of the index.
   * @param columnName
   * @param row
   * @param content
   */
  setCellByName(columnName:string,row:number,content:string):void;

  /**
   * Returns a whole row of the table.
   * @param row
   */
  getRow(row:number):string[];

  /**
   * Sets all column names at once
   * @param names
   */
  setColumnNames(names:string[]):void;

  /**
   * Returns all column names
   */
  getColumnNames():string[];

  /**
   * Returns the column name of a specific column
   * @param index
   */
  getColumnName(index:number):string;

  /**
   * Returns the index of a column name
   * @param columnName
   */
  getColumnIndex(columnName:string):number;
}

export interface TableFactory{
  createTable():Table;
}

export class TableFactoryImpl implements TableFactory{

  createTable(): Table {
    return new TableImpl();
  }

}

class TableImpl implements Table{

  //[row][column]
  private table: string[][];
  private name:string;
  private columnNames: string[];

  /**
   * Returns the contents of a cell in the table
   * @param column
   * @param row
   */
  getCell(column: number, row: number): string {
    return this.table[row][column];
  }

  /**
   * Returns the contents of a cell in the table. Uses the name of the column instead of the index.
   * @param columnName
   * @param row
   */
  getCellByName(columnName: string, row: number): string {
    return this.table[row][this.columnNames.indexOf(columnName)];
  }

  /**
   * Returns a whole row of the table.
   * @param row
   */
  getRow(row: number): string[] {
    return this.table[row];
  }

  /**
   * Returns the whole table
   */
  getTable(): string[][] {
    return this.table;
  }

  /**
   * Sets the content of a specific cell.
   * @param column
   * @param row
   * @param content
   */
  setCell(column: number, row: number, content: string): void {
    this.table[row][column] = content;
  }

  /**
   * Sets the content of a specific cell. Uses the name of the column instead of the index.
   * @param columnName
   * @param row
   * @param content
   */
  setCellByName(columnName: string, row: number, content: string): void {
    this.table[row][this.columnNames.indexOf(columnName)] = content;
  }

  /**
   * Overrides the content of the Table
   * @param table
   */
  setTable(table: string[][]): void {
    this.table = table;
  }

  /**
   * Sets all column names at once
   * @param names
   */
  setColumnNames(names: string[]): void {
    this.columnNames = names;
  }

  /**
   * Returns all column names
   */
  getColumnNames(): string[] {
    return this.columnNames;
  }

  /**
   * Returns the column name of a specific column
   * @param index
   */
  getColumnName(index: number): string {
    return this.columnNames[index];
  }

  /**
   * Returns the index of a column name
   * @param columnName
   */
  getColumnIndex(columnName: string): number {
    return this.columnNames.indexOf(columnName);
  }
}

