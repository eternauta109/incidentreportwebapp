import React from "react";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";

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
  "workDays",
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

function ExportToExcel({ data }) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });
    XLSX.utils.sheet_add_aoa(worksheet, [columns]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "reports");
    XLSX.writeFile(workbook, "incident_report.xlsx");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleExport}>
      Export to excel
    </Button>
  );
}

export default ExportToExcel;
