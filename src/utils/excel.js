import ExcelJS from 'exceljs';
export class ExcelService {
    static async exportToExcel(data, fileName) {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');
            // Add headers
            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                worksheet.addRow(headers);
                // Style headers
                const headerRow = worksheet.getRow(1);
                headerRow.font = { bold: true };
                headerRow.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFE0E0E0' }
                };
            }
            // Add data
            data.forEach(item => {
                worksheet.addRow(Object.values(item));
            });
            // Auto-fit columns
            worksheet.columns.forEach(column => {
                column.width = Math.max(...worksheet.getColumn(column.number).values
                    .map(v => v ? v.toString().length : 10));
            });
            // Generate buffer
            const buffer = await workbook.xlsx.writeBuffer();
            // Create blob and download
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.xlsx`;
            link.click();
            window.URL.revokeObjectURL(url);
            return true;
        }
        catch (error) {
            console.error('Error exporting to Excel:', error);
            throw error;
        }
    }
    static async readExcelFile(file) {
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(await file.arrayBuffer());
            const worksheet = workbook.getWorksheet(1);
            if (!worksheet) {
                throw new Error('No worksheet found');
            }
            const data = [];
            let headers = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) {
                    // Get headers from first row
                    headers = row.values.slice(1).map(header => header ? header.toString() : '');
                }
                else {
                    // Get data from other rows
                    const rowData = {};
                    row.eachCell((cell, colNumber) => {
                        const header = headers[colNumber - 1];
                        if (header) {
                            rowData[header] = cell.value;
                        }
                    });
                    data.push(rowData);
                }
            });
            return data;
        }
        catch (error) {
            console.error('Error reading Excel file:', error);
            throw error;
        }
    }
}
