import { Knex } from "knex";

class Column {
  columnName: string;
  formattedColumn: string | Knex.Raw;
  hasFormat: boolean = false;

  constructor(columnName: string, formattedColumnName: string | Knex.Raw | undefined = undefined) {
    this.columnName = columnName;
    this.formattedColumn = formattedColumnName || columnName;
    this.hasFormat = !(this.columnName === this.formattedColumn);
  }

  withTable(tableName: string): Column {
    const withoutFormat = this.columnName === this.formattedColumn;
    return new Column(
      `${tableName}.${this.columnName}`,
      withoutFormat ? `${tableName}.${this.columnName}` : this.formattedColumn
    );
  }
}

export { Column }