import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {

  constructor() { }

  public async generateExcel(data: any[], sheetName: string = 'Datos') {
    const worksheet = XLSX.utils.json_to_sheet([]);

    const cols: Array<any> = [];
    Object.keys(data[0]).forEach(key => {
      const colWidth = this.getMaxColumnWidth(data, key);
      cols.push({ wch: colWidth });
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: cols.length - 1 });
      worksheet[cellRef] = {
        t: "s",
        v: key,
        s: {
          alignment: { wrapText: true },
          font: { bold: true },
        },
      };
    });

    const rows = data.map(item => {
      Object.keys(item).forEach(key => {
        const value = item[key];
        if (Array.isArray(value) || typeof value === 'object') {
          item[key] = JSON.stringify(value);
        }
      });
      return Object.values(item);
    });

    XLSX.utils.sheet_add_aoa(worksheet, [Object.keys(data[0]), ...rows]);

    worksheet["!cols"] = cols;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const content = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const blob = new Blob([content], { type: 'application/octet-stream' });

    return blob;
  }

  private getMaxColumnWidth(data: any[], key: string): number {
    const values: any[] = data.map((item: any) => {
      return item[key];
    });

    const lengths: number[] = values.map(value => {
      if (Array.isArray(value) || typeof value === 'object') {
        value = JSON.stringify(value);
      }

      return String(value).length;
    });

    const maxLength = Math.max(...lengths);
    return maxLength > 30 ? maxLength : 30;
  }
}
