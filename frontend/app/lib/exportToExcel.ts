import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export type ExcelData = {
  username: string;
  fname: string;
  lname: string;
} 

export function exportToExcel(data: ExcelData[], filename = 'list-of-admins') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'ListOfAdmins');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  saveAs(blob, `${filename}.xlsx`);
}
