import React from "react";
import { readFile, writeFile, utils } from "xlsx";
import { Button } from "@mui/material";

function ExportToExcel({ data }) {
  const handleExport = () => {
    const headers = [
      "ref_num",
      "startDate",
      "endDate",
      "cinema",
      "screens_number",
      "seats_number",
      "screen_with_issue",
      "screen_with_issue_capacity",
      "category",
      "screen_state",
      "show_stopped",
      "refounds",
      "comps",
      "issue",
      "note",
      "resolved",
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
    const worksheet = utils.json_to_sheet(data, { header: headers });
    utils.sheet_add_aoa(worksheet, [columns]);
    // Definisci uno stile per la prima riga del foglio di lavoro
    const headerStyle = {
      font: { bold: true },
      fill: {
        type: "pattern",
        patternType: "solid",
        fgColor: { rgb: "CCCCCC" },
      },
    };

    // Cicla tutte le celle della prima riga e applica lo stile
    Object.keys(worksheet).forEach((cell) => {
      if (cell[0] === "1") {
        // Prima riga

        worksheet[cell].s = headerStyle;
      }
    });

    // Aggiunta del filtro
    /* worksheet["!autofilter"] = { ref: utils.encode_range(headerRange) }; */

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, "incident_report.xlsx");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Export to excel
    </Button>
  );
}

export default ExportToExcel;
