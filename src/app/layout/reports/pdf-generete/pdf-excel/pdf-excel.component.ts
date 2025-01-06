import { Component, ElementRef, ViewChild } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import { PDFDocumentProxy } from 'ngx-extended-pdf-viewer';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

@Component({
  selector: 'app-pdf-excel',
  templateUrl: './pdf-excel.component.html',
  styleUrls: ['./pdf-excel.component.css']
})
export class PdfExcelComponent {
  public data: any[] = [];
  public displayedColumns = [
    'CODIGO_INTERNET',
  //   'Diez',
  //   'Veinte',
    // 'Treinta',
  //   'Cuarenta',
  //   'Cincuenta',
  //   'Sesenta',
  //   'Setenta',
      'N50_I30',
      'PRECIO_CALCULADO'

  ];
  public selectedColumn: string = '';
  public pdfDoc: any  | null = null;
  public pdfjsDoc: any = null;
  public isDownloading: boolean = false;
  public downloadProgress: number = 0;
  public manualPositions: { [key: string]: { x: number; y: number; page: number; price: number } } = {};
  public positionedPrices: { [page: number]: { x: number; y: number }[] } = {};
  public selectedCells: { x: number; y: number; page: number }[] = [];
  public currentPage: number = 1;
  private codeCoordsCache: { [codigo: string]: { x: number; y: number; page: number } } = {};
  private textPositions: { [page: number]: { x: number; y: number; text:string}[] } = {};
  private pageCodeCount: { [page: number]: number } = {};

  @ViewChild('pdfCanvas', { static: false }) pdfCanvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  selectColumn(column: string) {
    this.selectedColumn = column;
  }

  async renderPage(pageNumber: number) {
    if (!this.pdfjsDoc) return;
    const page = await this.pdfjsDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = this.pdfCanvas.nativeElement;
    const context = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    this.drawGrid(context, canvas.width, canvas.height, 50);
    this.renderHighlightedCells(context, canvas.height, 50);
  }

  drawGrid(context: CanvasRenderingContext2D, width: number, height: number, cellSize: number) {
    context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    for (let x = 0; x < width; x += cellSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }
    for (let y = 0; y < height; y += cellSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  }

  renderHighlightedCells(context: CanvasRenderingContext2D, canvasHeight: number, cellSize: number) {
    this.selectedCells
      .filter((cell) => cell.page === this.currentPage)
      .forEach((cell) => {
        context.fillStyle = 'rgba(0, 255, 0, 0.2)';
        context.fillRect(cell.x, canvasHeight - cell.y - cellSize, cellSize, cellSize);
      });
  }

  onCanvasClick(event: MouseEvent) {
    const rect = this.pdfCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = this.pdfCanvas.nativeElement.height - (event.clientY - rect.top);

    const cellSize = 50;
    const snappedX = Math.floor(x / cellSize) * cellSize;
    const snappedY = Math.floor(y / cellSize) * cellSize;

    const codigo = this.selectedColumn;
    const price = this.data.find((row) => row['CODIGO_INTERNET'] === codigo)?.[this.selectedColumn] || 0;

    if (codigo) {
      this.manualPositions[codigo] = { x: snappedX, y: snappedY, page: this.currentPage, price };
      this.positionPrice(this.currentPage, snappedX, snappedY, codigo);
      this.selectedCells.push({ x: snappedX, y: snappedY, page: this.currentPage });

      this.renderPage(this.currentPage);
    }
  }

  positionPrice(page: number, x: number, y: number, codigo: string) {
    if (!this.positionedPrices[page]) {
      this.positionedPrices[page] = [];
    }
    this.positionedPrices[page].push({ x, y });

    const rowIndex = this.data.findIndex((row) => row['CODIGO_INTERNET'] === codigo);
    if (rowIndex !== -1) {
      this.data[rowIndex].Encontrado = true;
    }
  }

  isPositionOccupied(page: number, x: number, y: number, tolerance = 10): boolean {
    if (!this.positionedPrices[page]) return false;
    return this.positionedPrices[page].some(
      (pos) => Math.abs(pos.x - x) < tolerance && Math.abs(pos.y - y) < tolerance
    );
  }

  isTextPositionOccupied(page: number, x: number, y: number, fontSize: number, tolerance = 1): boolean {
    if (!this.textPositions[page]) return false;
    return this.textPositions[page].some((pos) => {
      const xOverlap = Math.abs(pos.x - x) < tolerance;
      const yOverlap = Math.abs(pos.y - y) < fontSize;
      return xOverlap && yOverlap;
    });
  }

  isAreaFree(page: number, x: number, y: number, fontSize: number, tolerance = 5): boolean {
    for (let i = -tolerance; i <= tolerance; i++) {
      for (let j = -tolerance; j <= tolerance; j++) {
        if (this.isTextPositionOccupied(page, x + j, y + i, fontSize, tolerance)) {
          return false;
        }
      }
    }
    return true;
  }

  async drawPrices(
    pdfDoc: PDFDocument,
    foundCoords: { page: number; x: number; y: number },
    valores: number[],
    config: { margenX: number; margenY: number; espacioEntreLineas: number; tamanioFuente: number }
) {
    const pages = pdfDoc.getPages();
    if (foundCoords.page < 1 || foundCoords.page > pages.length) {
        throw new Error(`La página ${foundCoords.page} no existe en el documento PDF.`);
    }

    const page = pages[foundCoords.page - 1];
    let xOffset = config.margenX;
    let yOffset = config.margenY;
    const drawToRight = this.pageCodeCount[foundCoords.page] >= 4;

    console.log('Estos son los valores', valores)
    for (const valor of valores) {
        if (valor === undefined || valor === null) continue;

        let contador = 0;
        const textToAdd = `$${valor}`;
        let xPos = foundCoords.x;
        let yPos = foundCoords.y;
        const step = config.espacioEntreLineas;
        const rectWidth = textToAdd.length * config.tamanioFuente * 0.5;
        const rectHeight = config.tamanioFuente;

        const freePos = this.findFreeRectangle(page,textToAdd,foundCoords.page, { x: xPos, y: yPos }, rectWidth, rectHeight);

        if (freePos) {
            page.drawText(textToAdd, {
                x: freePos.x,
                y: freePos.y,
                size: config.tamanioFuente,
                color: rgb(0, 0, 0),
            });
            break;
        }
    }
}

findFreeRectangle(pageW:any,text:string,page: number, start: { x: number; y: number }, width: number, height: number): { x: number; y: number } {
  let rangoYInicio = Math.floor(start.y);
  let rangoYFin = rangoYInicio + height;
  let xFinal = start.x;
  let yFinal = rangoYInicio;

  while (true) {
      let rangoLibre = true;

      for (let i = 0; i < this.textPositions[page].length; i++) {
          const pos = this.textPositions[page][i];
          const posX = pos.x;
          const posY = pos.y;
          if (posY >= rangoYInicio && posY < rangoYFin && posX < start.x + width) {
              rangoLibre = false;
              break;
          }
      }

      if (rangoLibre) {
          yFinal = rangoYInicio;
          break;
      } else {
          rangoYInicio--;
          rangoYFin--;
      }
  }

  return { x: xFinal, y: yFinal };
}

  async isTextPresent(pageNumber: number) {
    const page = await this.pdfjsDoc.getPage(pageNumber);
    const textContent = await page.getTextContent();

    if (!this.textPositions[pageNumber]) {
        this.textPositions[pageNumber] = [];
    }

    textContent.items.forEach((item: any) => {
        const itemX = item.transform[4];
        const itemY = item.transform[5];
        const itemText = item.str;

        this.textPositions[pageNumber].push({ x: itemX, y: itemY, text: itemText });
    });
  }

  async generateColumnPDF() {
    if (!this.pdfDoc || !this.pdfjsDoc) {
      console.warn('El documento PDF no está cargado.');
      return;
    }

    if (!this.selectedColumn) {
      console.warn('No se ha seleccionado ninguna columna.');
      return;
    }

    this.isDownloading = true;
    this.downloadProgress = 0;
    try {
      await this.findAllCodes(this.pdfjsDoc);

      const total = this.data.length;


      for (let i = 0; i < total; i++) {
        const row = this.data[i];
        const codigo = row['CODIGO_INTERNET'];
        const valores = [row[this.selectedColumn]];

        await this.findWordAndModifyPDF(this.pdfDoc, codigo, valores, {
          margenX: 10,
          margenY: 10,
          espacioEntreLineas: 15,
          tamanioFuente: 12,
        });

        this.downloadProgress = Math.round(((i + 1) / total) * 100);
      }


      const pdfBytes = await this.pdfDoc.save();


      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documento_modificado.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      this.isDownloading = false;
    }
  }

  async findAllCodes(pdfjsDoc: any) {
    const numPages = pdfjsDoc.numPages;
    const validCodes = this.data.map((row) => row['CODIGO_INTERNET'].toString().trim().toUpperCase());
    const foundCodes: { codigo: string, page: number, x: number, y: number }[] = [];

    for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
        const page = await pdfjsDoc.getPage(pageIndex + 1);
        const textContent = await page.getTextContent();

        textContent.items.forEach((item: any) => {
            let codigo = item.str.trim().toUpperCase();

            if (codigo.startsWith("CÓDIGO INTERNET:")) {
                codigo = codigo.replace("CÓDIGO INTERNET:", "").trim();
            }

            if (validCodes.includes(codigo) && !this.codeCoordsCache[codigo]) {
                this.codeCoordsCache[codigo] = {
                    x: item.transform[4],
                    y: item.transform[5],
                    page: pageIndex + 1,
                };

                foundCodes.push({ codigo, page: pageIndex + 1, x: item.transform[4], y: item.transform[5] });
            }
        });
        await this.isTextPresent(pageIndex + 1);
    }

    return foundCodes;
}

  async findWordAndModifyPDF(
    pdfDoc: PDFDocument,
    codigo: string,
    valores: number[],
    config: { margenX: number; margenY: number; espacioEntreLineas: number; tamanioFuente: number }
  ) {

    if (this.codeCoordsCache[codigo] != undefined) {
      const foundCoords = this.codeCoordsCache[codigo];
      await this.drawPrices(pdfDoc, foundCoords, valores, config);
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async (e: any) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdfjsDocument = await pdfjsLib.getDocument({ data: typedArray }).promise;
        this.pdfjsDoc = pdfjsDocument;

        this.pdfDoc = await PDFDocument.load(typedArray);
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  async onExcelFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = jsonData.shift() as string[];
      this.data = jsonData.map((row: any) => {
        const filteredRow: any = {};
        let hasValidData = false;

        this.displayedColumns.forEach((col) => {
          const value = row[headers.indexOf(col)];
          if (value !== undefined && value !== null && value !== '') {
            filteredRow[col] = value;
            hasValidData = true;
          }
        });

        if (hasValidData) {
          filteredRow.Encontrado = false;
          return filteredRow;
        }
        return null;
      }).filter(row => row !== null);
    };
    reader.readAsBinaryString(file);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  nextPage() {
    if (this.pdfjsDoc && this.currentPage < this.pdfjsDoc.numPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }
}





