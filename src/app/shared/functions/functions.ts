import { InventoryKardex } from 'samples/report-manager/models/report.entity';
import { DateTime } from 'luxon';

export function objectContainsValue(object: any, searchText: string): boolean {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key as keyof any]; // Indicar el tipo de "key"
      if (typeof value === 'string' || typeof value === 'number') {
        if (value.toString().toLowerCase().includes(searchText.toLowerCase())) {
          return true;
        }
      }
    }
  }
  return false;
}
export const ID_DATA_NAME = '__ID__';

export const addIdToData = (data: any) => {
  return data.map((obj: any, index: number) => ({
    ...obj,
    [ID_DATA_NAME]: index + 1,
  }));
};

export function highlightSearchText(searchText: string, value: string): string {
  if (typeof value === 'object' || typeof value === 'undefined') {
    value = '';
  }
  if (typeof value !== 'string') {
    value = String(
      value !== 'null' || value !== null || value !== undefined ? value : ''
    );
  }
  if (searchText.length > 0 && value) {
    const re = new RegExp(searchText, 'gi');
    return value.replace(
      re,
      '<span class="highlight">' + searchText + '</span>'
    );
  } else {
    return value !== 'null' ? value : '';
  }
}

// Tipos de dato específicos para el formato de conversión
type ConvertType = 'string' | 'number' | 'boolean' | 'date';

interface ConversionConfig {
  [key: string]: {
    type: ConvertType;
    format: string;
    prefix?: string;
    suffix?: string;
  };
}

interface ConvertFunctions {
  string: (val: string) => string;
  number: (val: number, format: string) => string;
  boolean: (val: boolean) => string;
  date: (val: string, format: string) => string;
}

interface ConvertFunction<T, U> {
  (val: T, format: string): U;
}

const convertFunctions: ConvertFunctions = {
  string: (val: string) => val,
  number: (val: number, format: string) => {
    let result = '';
    if (val && format === 'currency') {
      result = val.toLocaleString('es-MX', { maximumFractionDigits: 2 });
    }
    if (val && format === 'percent') {
      result = String(val.toFixed(2));
    }
    return result;
  },
  boolean: (val: boolean) => (val ? 'sí' : 'no'),
  date: ((val: string, format: string) =>
    DateTime.fromISO(val).toFormat(format)) as ConvertFunction<string, string>,
};

export function formatArrayValues(
  arr: any[],
  conversionConfig: ConversionConfig
): any[] {
  return arr.map((obj) => {
    Object.keys(obj).forEach((key) => {
      const exist = conversionConfig[key];
      if (exist) {
        switch (exist.type) {
          case 'date':
            obj[key] = convertFunctions.date(obj[key], exist.format);
            break;
          case 'number':
            obj[key] = convertFunctions.number(obj[key], exist.format);
            break;
        }
        if (exist.prefix) {
          obj[key] = `${exist.prefix}${obj[key]}`;
        }
        if (exist.suffix) {
          obj[key] = `${obj[key]}${exist.suffix}`;
        }
      }
    });
    return obj;
  });
}

export function unicodeToChar(text: string) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}
