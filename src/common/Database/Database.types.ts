import { Knex } from "knex";
import { Where } from "./WhereQuery";

type ComparisonOperator = '=' | '>' | '>=' | '<' | '<=' | '<>';

interface QueryOptions {
  orderBy?: { column: string; order: "asc" | "desc" }[];
  limit?: number;
}

interface QueryFieldsOptions {
  prefix?: string;
  tableName?: string;
  joins?: boolean;
}

type QueryWhere<T> = ([(keyof T) | string, ComparisonOperator, any] | Where<T | any>);

export { QueryOptions, QueryFieldsOptions, QueryWhere, ComparisonOperator };
