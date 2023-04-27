import React from "react";
import { Button } from "@mui/material";
const ExcelJS = require("exceljs");

const columnsNumber = 18;

export const ToExcel = ({ data }) => {
  /*  console.log(data); */
  const onClickHandle = () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "incidentreport webapp";
    workbook.created = new Date();

    // freeze first row and column
    const worksheet = workbook.addWorksheet("report", {
      views: [{ state: "frozen", ySplit: 1 }],
    });

    //set default height
    worksheet.properties.defaultRowHeight = 30;
    worksheet.properties;

    //set header style

    /*   const rowsNumber = worksheet.lastRow._number;
    worksheet.getRows(2, rowsNumber).forEach((row) => {
      row.height = 30;
      for (let i = 1; i <= 18; i++) {
        row.getCell(i).alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
        };
      }
    }); */

    let header = worksheet.getRow(1);
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
      header.getCell(i).border = {
        top: { style: "double", color: { argb: "00000000" } },
        left: { style: "double", color: { argb: "00000000" } },
        bottom: { style: "double", color: { argb: "00000000" } },
        right: { style: "double", color: { argb: "00000000" } },
      };
      header.getCell(i).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6E6E6E" },
      };
    }

    //set auto filter
    worksheet.autoFilter = "A1:Q1";

    //set columns
    worksheet.columns = [
      { header: "ref", key: "ref_num", width: 10 },
      {
        header: "start",
        key: "startDate",
        width: 15,
        style: { numFmt: "dd/mm/yyyy" },
      },
      {
        header: "end",
        key: "endDate",
        width: 15,
        style: { numFmt: "dd/mm/yyyy" },
      },
      {
        header: "prediction",
        key: "datePrediction",
        width: 15,
        style: { numFmt: "dd/mm/yyyy" },
      },
      { header: "cinema", key: "cinema", width: 10 },
      { header: "screens", key: "screens_number", width: 10 },
      { header: "seats", key: "seats_number", width: 15 },
      { header: "screen_with_issue", key: "screen_with_issue", width: 10 },
      {
        header: "screen_with_issue_capacity",
        key: "screen_with_issue_capacity",
        width: 15,
      },
      { header: "category", key: "category", width: 20 },
      { header: "screen_state", key: "screen_state", width: 13 },
      { header: "show blocked", key: "show_stopped", width: 15 },
      {
        header: "refounds",
        key: "refounds",
        width: 10,
        style: { numFmt: '"€"#,##0.00;[Red]-"€"#,##0.00' },
      },
      { header: "comps", key: "comps", width: 10 },
      { header: "issue", key: "issue", width: 30 },
      { header: "note", key: "note", width: 30 },
      { header: "resolved", key: "resolved", width: 15 },
      { header: "workDays", key: "workDays", width: 15 },
    ];

    //add data

    worksheet.addRows(data);

    // set table style

    const rowsNumber = worksheet.lastRow._number;
    worksheet.getRows(2, rowsNumber).forEach((row) => {
      row.height = 30;
      for (let i = 1; i <= columnsNumber; i++) {
        row.getCell(i).alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
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
      anchor.download = "incidentReport.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={onClickHandle}>
      Export to excel
    </Button>
  );
};

export default ToExcel;
