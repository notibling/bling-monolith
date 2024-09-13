import { QueryWhere } from "@/common/Database/Database.types";
import { IRawProductDisplay } from "./ProductDisplay";

interface FetchProductDisplaysQueryOptions {
  page?: number;
  pageSize?: number;
  where: QueryWhere<IRawProductDisplay>[];
}

export { FetchProductDisplaysQueryOptions }