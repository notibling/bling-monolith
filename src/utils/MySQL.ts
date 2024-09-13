class MySQLUtils {

  static returningIds(firstId: number, count: number) {
    const ids = Array.from({ length: count }, (_, i) => firstId + i);

    return ids;
  }
}

export { MySQLUtils }