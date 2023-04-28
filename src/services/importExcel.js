import ExcelJS from "exceljs";

function importExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const workbook = new ExcelJS.Workbook();
      try {
        await workbook.xlsx.load(reader.result);
        const worksheet = workbook.getWorksheet("Segnalazione");

        if (!worksheet) {
          reject(new Error("Worksheet not found"));
          return;
        }
        const rows = worksheet.getRows(2, 184);

        const data = [];
        rows.forEach((row) => {
          const rowData = {};
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rowData[`col${colNumber}`] = cell.value;
          });

          data.push(rowData);
        });

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
  });
}

export default importExcel;
