import { QueryWhere } from "@/common/Database/Database.types";
import { IRawProduct } from "./Product";

interface FetchProductsQueryOptions {
  page?: number;
  pageSize?: number;
  where: QueryWhere<IRawProduct>[];
}

export { FetchProductsQueryOptions }