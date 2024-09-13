import _ from 'lodash';
class GeneralUtils {

  static recursiveObjectify<T = any>(data: string): T | undefined {
    try {
      const parsedData = JSON.parse(data);
      return GeneralUtils.recursiveObjectifyProps(parsedData);
    } catch (error) {
      return undefined;
    }
  }

  static recursiveObjectifyProps<T = any>(data: T): T {
    if (_.isObject(data) && !_.isArray(data)) {
      return _.mapValues(data, (value) => {
        if (_.isString(value)) {
          return GeneralUtils.recursiveObjectify(value) ?? value;
        }
        return GeneralUtils.recursiveObjectifyProps(value);
      });
    }
    return data;
  }

  static toObject<T = any>(data: string): T | undefined {
    try {
      return JSON.parse(data);
    }
    catch (error) {
      return undefined;
    }
  }


  static stringToObject<T = any>(data: any): T {
    if (typeof data == 'string') return GeneralUtils.toObject(data) as T

    return data;
  }


  static generateVerticalTable(data: Record<string, any>[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const table: string[] = [];
    const columnsWidths = Math.max(...headers.map(header => header.length));
    const valueMax = Math.max(...data.flatMap((obj) => Object.values(obj).map((el) => String(el).length)));

    data.forEach((el) => {
      Object.keys(el).forEach((header, i) => {
        const value = `${el[header]}`.padEnd(valueMax, " ");
        const label = header.padEnd(columnsWidths, " ");
        const row = `| ${label} | ${value} |`;
        table.push(row);
      });
    })

    return table.join('\n');
  }

  static generateTable(data: Record<string, any>[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const table: string[] = [];

    // Calculate the maximum width for each column
    const columnWidths = headers.map(header => {
      return Math.max(header.length, ...data.map(row => row[header]?.toString().length || 0));
    });

    // Function to pad strings to the required width
    const padString = (str: string, width: number): string => {
      return str + ' '.repeat(width - str.length);
    };

    // Create the header row
    const headerRow = '| ' + headers.map((header, i) => padString(header, columnWidths[i])).join(' | ') + ' |';
    table.push(headerRow);

    // Create a separator row
    const separatorRow = '|-' + columnWidths.map(width => '-'.repeat(width)).join('-|-') + '-|';
    table.push(separatorRow);

    // Create data rows
    data.forEach(row => {
      const dataRow = '| ' + headers.map((header, i) => padString(row[header]?.toString() || '', columnWidths[i])).join(' | ') + ' |';
      table.push(dataRow);
    });

    return table.join('\n');
  }
}

export { GeneralUtils }