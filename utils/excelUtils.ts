
import type { Feedback } from '../types';

declare const XLSX: any;

export const exportToExcel = (data: Feedback[], fileName: string): void => {
  if (typeof XLSX === 'undefined') {
    console.error("XLSX library is not loaded. Make sure the CDN script is in index.html.");
    alert("Không thể xuất file Excel. Vui lòng thử lại sau.");
    return;
  }

  const worksheetData = data.map(item => ({
    "Mã nhận xét": item.id,
    "Nội dung nhận xét": item.text,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "NhanXet");

  // Set column widths
  worksheet['!cols'] = [{ wch: 20 }, { wch: 80 }];

  XLSX.writeFile(workbook, fileName);
};
