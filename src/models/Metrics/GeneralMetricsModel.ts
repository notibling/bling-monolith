import { knex } from "@/common/Knex";

class GeneralMetricsModelClass {

  async fetchAccountsMetrics() {
    return knex.select({
      today: knex.raw('IFNULL(createdAccountsToday.count, 0)'),
      thisWeek: knex.raw('IFNULL(createdAccountsThisWeek.count, 0)'),
      thisMonth: knex.raw('IFNULL(createdAccountsThisMonth.count, 0)'),
      thisYear: knex.raw('COUNT(DISTINCT mainQuery.id)')

    })
      .from({ mainQuery: 'users' })
      .leftJoin(
        knex.select({
          count: knex.raw('COUNT(DISTINCT users.id)'),
          id: 'users.id'
        })
          .from('users')
          .whereRaw('date(users.createdAt) = date(now())')
          .groupBy('users.id')
          .as('createdAccountsToday'),
        'mainQuery.id', '=', 'createdAccountsToday.id'
      )
      .leftJoin(
        knex.select({
          count: knex.raw('COUNT(DISTINCT users.id)'),
          id: 'users.id'
        })
          .from('users')
          .whereRaw('WEEK(users.createdAt) = WEEK(now())')
          .groupBy('users.id')
          .as('createdAccountsThisWeek'),
        'mainQuery.id', '=', 'createdAccountsThisWeek.id'
      )
      .leftJoin(
        knex.select({
          count: knex.raw('COUNT(DISTINCT users.id)'),
          id: 'users.id'
        })
          .from('users')
          .whereRaw('MONTH(users.createdAt) = MONTH(now()) AND YEAR(users.createdAt) = YEAR(now())')
          .groupBy('users.id')
          .as('createdAccountsThisMonth'),
        'mainQuery.id', '=', 'createdAccountsThisMonth.id'
      )
      .whereRaw('YEAR(mainQuery.createdAt) = YEAR(now())')
      .groupByRaw('YEAR(mainQuery.createdAt)')
      .first();
  }

  async fetchSalesMetrics() {
    const query = knex.select({
      today: knex.raw('IFNULL(salesToday.count, 0)'),
      thisWeek: knex.raw('IFNULL(salesThisWeek.count, 0)'),
      thisMonth: knex.raw('IFNULL(salesThisMonth.count, 0)'),
      thisYear: knex.raw('COUNT(DISTINCT mainQuery.id)')

    })
      .from({ mainQuery: 'product_sales' })

      .leftJoin(
        knex.select({
          count: knex.raw('COUNT(DISTINCT product_sales.id)'),
          id: 'product_sales.id'
        })
          .from('product_sales')
          .whereRaw('date(product_sales.createdAt) = date(now())')
          .groupBy('product_sales.id')
          .as('salesToday'),
        'mainQuery.id', '=', 'salesToday.id'
      )
      .leftJoin(
        knex.select({
          count: knex.raw('COUNT(DISTINCT product_sales.id)'),
          id: 'product_sales.id'
        })
          .from('product_sales')
          .whereRaw('WEEK(product_sales.createdAt) = WEEK(now())')
          .groupBy('product_sales.id')
          .as('salesThisWeek'),
        'mainQuery.id', '=', 'salesThisWeek.id'
      )
      .leftJoin(
        knex.select({
          count: knex.raw('COUNT(DISTINCT product_sales.id)'),
          id: 'product_sales.id'
        })
          .from('product_sales')
          .whereRaw('MONTH(product_sales.createdAt) = MONTH(now()) AND YEAR(product_sales.createdAt) = YEAR(now())')
          .groupBy('product_sales.id')
          .as('salesThisMonth'),
        'mainQuery.id', '=', 'salesThisMonth.id'
      )
      .whereRaw('YEAR(mainQuery.createdAt) = YEAR(now())')
      .groupByRaw('YEAR(mainQuery.createdAt)')
      .first();

    console.log(query.toString());
    return query;
  }
}


const GeneralMetricsModel = new GeneralMetricsModelClass();

export { GeneralMetricsModel };