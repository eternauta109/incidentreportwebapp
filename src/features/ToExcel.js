import React from "react";
import { Button } from "@mui/material";
const ExcelJS = require("exceljs");

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

    //set header style

    let header = worksheet.getRow(1);
    header.height = 50;
    header.font = {
      name: "Arial Black",
      color: { argb: "FFFFFF" },
      family: 2,

      size: 10,
    };

    header.alignment = { wrapText: true };
    header.border = {
      top: { style: "double", color: { argb: "00000000" } },
      left: { style: "double", color: { argb: "00000000" } },
      bottom: { style: "double", color: { argb: "00000000" } },
      right: { style: "double", color: { argb: "00000000" } },
    };
    header.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "6E6E6E" },
    };
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
    const columns = [
      "ref num",
      "inizio",
      "fine",
      "cienama",
      "schermi tot",
      "posti tot",
      "schermo",
      "posti schermo",
      "categoria",
      "stato dello schermo",
      "show soppressi",
      "rimborsi",
      "omaggi emessi",
      "descrizione del problema",
      "note",
      "risolto?",
      "giorni lavorativi",
    ];
    //add data

    worksheet.addRows(data);

    // set table style

    ws.getCell("A1").font = {
      name: "Comic Sans MS",
      family: 4,
      size: 16,
      underline: true,
      bold: true,
    };

    //write excel file
    workbook.xlsx.writeBuffer().then((el) => {
      const blob = new Blob([el], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "incidentReprot.xlsx";
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
