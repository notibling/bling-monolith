import { Knex } from "knex";

class PaginateQuery {
  private _pageSize: number = 100;
  private _page: number = 0;

  constructor(private queryBuilder: Knex.QueryBuilder) { }


  pageSize(_pageSize: number = 100) {
    this._pageSize = _pageSize;
    return this;
  }

  page(_page: number = 0) {
    this._page = _page <= 1 ? 0 : _page;
    return this;
  }

  run() {
    const query = this.queryBuilder

    if (this._pageSize && this._page !== undefined)
      query.offset(this._pageSize * this._page).limit(this._pageSize);

    return query;
  }
}

export { PaginateQuery };