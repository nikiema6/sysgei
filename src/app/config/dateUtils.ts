// TODO: figure out way to import momment global
import * as moment  from 'moment';

export class DateUtils {

  public static toFormatFromDate(date: Date, pattern: string = 'DD/MM/YYYY'): string {
    return moment(date).locale('fr').format(pattern);
  }

  public static toFormatFromString(dateString: string, dateStringPattern: string, toPattern: string = 'DD/MM/YYYY'): string {
    const dateTmp = moment(dateString, dateStringPattern).toDate();
    return DateUtils.toFormatFromDate(dateTmp, toPattern);
  }

  public static patternToDate(dateString: string, pattern: string): Date {
    const date = moment(dateString, pattern).toDate();
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  }

  public static unixToDate(unixStamp: number): Date {
    return moment(Number(unixStamp)).toDate();
  }

  public static sortArray(objectList: Array<any>, field: string, direction: 'asc' | 'desc', isNumber = false): Array<any> {
    let array: Array<any> = objectList.map(item => ({...item}));
    switch (direction) {
      case 'desc': {
        array = array.sort((a, b) => String(a[field]).localeCompare(String(b[field]), undefined,
            {numeric: isNumber}) > 0 ? -1 : 1);
        break;
      }
      case 'asc': {
        array = array.sort((a, b) => String(a[field]).localeCompare(String(b[field]), undefined,
            {numeric: isNumber}) < 0 ? -1 : 1);
        break;
      }
    }
    return array;
  }

  /**
   * Ordonner une liste selon plusieurs critères.
   *
   * @param dataList liste à ordonner.
   * @param fields liste des champs
   * @param direction le sens d'ordonnancement
   * @param isNumber true si les critères sont des nombres et false sinon
   *
   * @return la liste ordonnée
   */
  public static sortWithMultipleCriteria<T>(dataList: Array<T>, fields: Array<string>,
                                            direction: 'asc' | 'desc', isNumber: boolean): Array<T> {
    let sortedData: Array<T> = dataList;
    if (direction === 'desc') {
      fields.forEach((field, index) => {
        sortedData = sortedData.sort((a: T, b: T) => {
          if (index === 0) {
            return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
          } else {
            if (a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) === 0) {
              return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
            } else {
              return a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) > 0 ? -1 : 1;
            }
          }
        });
      });
    } else if (direction === 'asc') {
      fields.forEach((field, index) => {
        sortedData = sortedData.sort((a: T, b: T) => {
          if (index === 0) {
            return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
          } else {
            if (a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) === 0) {
              return a[field].localeCompare(b[field], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
            } else {
              return a[fields[index - 1]].localeCompare(b[fields[index - 1]], undefined, {numeric: isNumber}) < 0 ? -1 : 1;
            }
          }
        });
      });
    }

    return sortedData;
  }
}
