import React from "react";
import { Button } from "@mui/material";
const ExcelJS = require("exceljs");

const columnsNumber = 8;

export const SecondView = ({ data }) => {
  /*  console.log(data); */
  const onClickHandle = () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "incidentreport webapp";
    workbook.created = new Date();

    // freeze first row and column
    const worksheet = workbook.addWorksheet("report", {
      views: [{ state: "frozen", ySplit: 3 }],
    });

    worksheet.getRow(3).values = [
      "Cinema Name",
      "Screen #",
      "Number of Seats Effected",
      "Reason for clousure",
      "Comments / Owner",
      "ETA / Lead in time for repairs",
      "Date of Original Issue",
      "Date Screen Reopened",
    ];

    //set default height
    worksheet.properties.defaultRowHeight = 30;

    //set header style

    let header = worksheet.getRow(3);
    header.height = 50;
    header.font = {
      name: "Arial Black",
      color: { argb: "FFFFFF" },
      family: 2,
      size: 10,
    };
    for (let i = 1; i <= columnsNumber; i++) {
      header.getCell(i).alignment = {
        wrapText: true,
        vertical: "middle",
        horizontal: "center",
      };
      header.getCell(i).font = {
        name: "IsonormBEFOP-RegularAlt",
        family: 4,
        size: 10,
      };
      header.getCell(i).border = {
        top: { style: "thin", color: { argb: "00000000" } },
        left: { style: "thin", color: { argb: "00000000" } },
        bottom: { style: "thin", color: { argb: "00000000" } },
        right: { style: "thin", color: { argb: "00000000" } },
      };
      header.getCell(i).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CACFD2" },
      };
    }

    //set auto filter
    worksheet.autoFilter = "A3:H3";

    //set columns
    worksheet.columns = [
      { key: "cinema", width: 20, headerRow: 3 },
      { key: "screen_with_issue", width: 10, headerRow: 3 },
      {
        key: "screen_with_issue_capacity",
        width: 15,
        headerRow: 3,
      },
      { key: "issue", width: 30, headerRow: 3 },
      { key: "note", width: 30, headerRow: 3 },
      {
        key: "workDays",
        width: 15,
        headerRow: 3,
      },
      {
        key: "startDate",
        width: 15,
        style: { numFmt: "dd/mm/yyyy" },
        headerRow: 3,
      },
      {
        key: "endDate",
        width: 15,
        style: { numFmt: "dd/mm/yyyy" },
        headerRow: 3,
      },
    ];

    //add data

    worksheet.addRows(data);

    // set table style

    const rowsNumber = worksheet.lastRow._number;
    worksheet.getRows(4, rowsNumber).forEach((row) => {
      row.height = 30;
      for (let i = 1; i <= columnsNumber; i++) {
        row.getCell(i).alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
        };
        row.getCell(i).border = {
          top: { style: "thin", color: { argb: "00000000" } },
          left: { style: "thin", color: { argb: "00000000" } },
          bottom: { style: "thin", color: { argb: "00000000" } },
          right: { style: "thin", color: { argb: "00000000" } },
        };
        row.getCell(i).font = {
          name: "IsonormBEFOP-RegularAlt",
          family: 4,
          size: 10,
        };
      }
    });

    //write excel file
    workbook.xlsx.writeBuffer().then((el) => {
      const blob = new Blob([el], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "Screen Closure Info.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      sx={{ ml: "4px" }}
      variant="contained"
      color="primary"
      onClick={onClickHandle}
    >
      Screen Closure Info
    </Button>
  );
};

export default SecondView;
