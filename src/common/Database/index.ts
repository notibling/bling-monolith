import { Knex } from "knex";
import { isEmpty } from "lodash";

import { knex } from "@/common/Knex";
import { QueryOptions, QueryFieldsOptions } from "./Database.types";

// * Features
import { Column } from "./Column";
import { PaginateQuery } from "./PaginateQuery";
import { WhereQuery } from "./WhereQuery";

class QueryModel {
  static Column = Column;
  static PaginateQuery = PaginateQuery;
  static WhereQuery = WhereQuery;

  protected columns: Record<string, Column> = {};
  protected db = knex;

  protected hiddenColumns: string[] = [];

  constructor(public tableName: string) { }

  protected get columnsMap() {
    let columnsMap: Record<string, string> = {};
    Object.keys(this.columns).forEach((key) => {
      const column = this.columns[key].withTable(this.tableName);
      columnsMap[key] = column.columnName;
    });
    return columnsMap;
  }

  protected joins(): Record<string, string | Knex.Raw> {
    return {};
  }
  /**
   * It takes an object and returns a new object with the keys renamed to match the column names in the
   * database
   * @param obj - The object to be formatted
   * @returns An object with the keys of the object passed in as the argument, but with the values of
   * the keys in the fields object.
   */
  protected objectToColumns(obj: Record<string, any>) {
    const result: Record<string, string> = {};

    Object.keys(obj).forEach((key) => {
      if (key in this.columnsMap) {
        const columnName = this.columnsMap[key]
          .toString()
          .split(".")
          .slice(1)
          .join("")
          // ? Removing quotes
          .split('"')
          .join("");
        result[columnName] = obj[key];
      } else {
        result[key] = obj[key];
      }
    });

    return result;
  }
  /**
   * It takes the columns object, and returns an array of strings, where each string is a
   * key-value pair of the column name and the column's formattedColumn property
   * @param {string} [prefix] - This is the prefix of the column. For example, if you have a column
   * called "name" in a table called "users", the prefix would be "users".
   * @returns An array of strings.
   */
  fields(opt: QueryFieldsOptions = {}) {
    const { prefix, tableName, joins } = opt;
    const { hiddenColumns, columns } = this;

    const columnJoins = this.joins();

    const _fields = Object.entries(columns)
      .flatMap(([key, column]) => {
        if (joins && key in columnJoins) return;
        if (!hiddenColumns.includes(key)) {
          const col = column.withTable(tableName ?? this.tableName);
          return [`'${prefix ? prefix + "." : ""}${key}'`, col.formattedColumn];
        }
      })
      .filter((val) => val);

    if (joins) {
      const _joins = Object.entries(columnJoins).flatMap(([key, value]) => [`'${key}'`, value]);
      _fields.push(..._joins);
    }

    return _fields.join(", ");
  }

  protected chainOptions(query: Knex.QueryBuilder, options: QueryOptions) {
    if (!isEmpty(options?.orderBy) && options.orderBy) query.orderBy(options.orderBy);

    return query;
  }

  public knex(tableName?: string) {
    return knex(tableName || this.tableName);
  }

  /**
   * It takes the columns object, which is a map of column names to column objects, and
   * returns a new object with the same keys, but with the column objects replaced with their
   * formattedColumn property
   * @returns An object with the column names as keys and the formatted column as the value.
   */
  public get columnsForSelect(): any {
    return this.columnsForSelectTableAlias(this.tableName);
  }

  public columnsForSelectTableAlias(tableName: string) {
    const columns: Record<string, Knex.Raw> = {};
    Object.keys(this.columns)
      .filter((key) => !this.hiddenColumns.includes(key))
      .map((key) => {
        const column = this.columns[key].withTable(tableName);
        columns[key] = knex.raw(column.formattedColumn);
      });
    return columns;
  }
}
export { QueryModel };
