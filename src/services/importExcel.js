import ExcelJS from "exceljs";
import dayjs from "dayjs";
import { addReport } from "./reportsServices";
import { cinemaList } from "../config/structure";
import "dayjs/locale/it";

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

        const titleColumn = [];

        worksheet.getRow(1).eachCell((cell) => {
          titleColumn.push(cell.value);
        });
        console.log(titleColumn);
        const data = [];
        rows.forEach((row) => {
          const rowData = {};
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (colNumber === 1 || colNumber === 2) {
              rowData[titleColumn[colNumber - 1]] = dayjs(cell.value).format(
                "DD/MM/YYYY"
              );
            } else if (colNumber === 3) {
              const cinemaDet = cinemaList.find((e) => e.name === cell.value);
              rowData[titleColumn[colNumber - 1]] = cell.value;
              rowData["seats_number"] = cinemaDet.seats;
            } else {
              rowData[titleColumn[colNumber - 1]] = cell.value;
            }
          });
          if (rowData.endDate === "Invalid Date") {
            rowData["endDate"] = null;
            rowData["resolved"] = false;
          } else {
            rowData["resolved"] = true;
          }
          console.log(rowData);
          addReport(rowData);
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
