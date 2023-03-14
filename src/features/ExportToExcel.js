/* import XLSX from "xlsx";

// Definisco la funzione che riceve un array e lo esporta in un file excel con i nomi della riga headers personalizzati
function exportToExcel(array) {
  // Creo un nuovo workbook (libro di lavoro)
  const workbook = XLSX.utils.book_new();
  // Definisco i nomi della riga headers
  const headers = ["Nome", "Cognome", "Età", "Professione"];
  // Converto l'array in una tabella (worksheet) passando l'opzione header
  const worksheet = XLSX.utils.json_to_sheet(array, { header: headers });
  // Aggiungo la tabella al workbook con il nome "Data"
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  // Esporto il workbook in formato xlsx e lo salvo con il nome "export.xlsx"
  XLSX.writeFile(workbook, "export.xlsx");
}

export default exportToExcel; */
