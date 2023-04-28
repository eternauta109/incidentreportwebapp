import React, { useState } from "react";
import importExcel from "../services/importExcel";

function ExcelImport() {
  const [data, setData] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    importExcel(file)
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default ExcelImport;
