import { Knex } from "knex";
import { QueryWhere, ComparisonOperator } from "./Database.types";


class Where<T> {
  constructor(
    private column: (keyof T) | string,
    private operator: ComparisonOperator | 'in' | 'not in' | 'like' | 'raw' | 'builder',
    private value: any,
    private replacements?: any[]
  ) { }

  register(queryBuilder: Knex.QueryBuilder) {
    switch (this.operator) {
      case 'in':
        queryBuilder.whereIn(this.column, this.value);
        break;
      case 'not in':
        queryBuilder.whereNotIn(this.column, this.value);
        break;

      case 'like':
        queryBuilder.whereRaw(`${this.column as string} LIKE '${this.value}'`);
        break;
      case 'raw':
        queryBuilder.whereRaw(this.value, this.replacements ?? []);
        break;
      case 'builder': {
        queryBuilder.where(this.value);
      }
      default:
        queryBuilder.where(this.column as string, this.operator, this.value);
    }
  }
}


class WhereQuery<T> {
  private _where: QueryWhere<T>[] = [];

  constructor(private queryBuilder: Knex.QueryBuilder) { }


  where(...wheres: QueryWhere<T>[]) {
    this._where = wheres;
    return this;
  }

  run() {
    this._where.forEach((where) => {
      if (where instanceof Where) {
        where.register(this.queryBuilder);
      } else {
        const [column, alias, value] = where;
        this.queryBuilder.where(column, alias, value);
      }
    })

    return this.queryBuilder;
  }


}

export { WhereQuery, Where };