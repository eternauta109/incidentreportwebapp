export function sortDescDateStartDate(a, b) {
  let dataA = new Date();
  let dataB = new Date();
  /*  console.log(dataA, dataB); */
  dataA = new Date(a.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  dataB = new Date(b.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  if (dataA > dataB) {
    return -1;
  }
  if (dataA < dataB) {
    return 1;
  }
  return 0;
}

export function sortAscDateStartDate(a, b) {
  let dataA = new Date();
  let dataB = new Date();
  dataA = new Date(a.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  dataB = new Date(b.startDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  if (dataA || dataB) {
    if (dataA <= dataB) {
      return -1;
    }
    if (dataA >= dataB) {
      return 1;
    }
  }
  return 0;
}

export function sortDescDateEndDate(a, b) {
  let dataA = new Date();
  let dataB = new Date();
  if (!a.endDate) {
    dataA = new Date("2100/12/31");
  } else if (!b.endDate) {
    dataB = new Date("2100/12/31");
  } else {
    dataA = new Date(a.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
    dataB = new Date(b.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  }
  if (dataA > dataB) {
    return -1;
  }
  if (dataA < dataB) {
    return 1;
  }
  return 0;
}

export function sortAscDateEndDate(a, b) {
  let dataA = new Date();
  let dataB = new Date();
  if (!a.endDate) {
    dataA = new Date("2100/12/31");
  } else if (!b.endDate) {
    dataB = new Date("2100/12/31");
  } else {
    dataA = new Date(a.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
    dataB = new Date(b.endDate.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  }

  if (dataA || dataB) {
    if (dataA <= dataB) {
      return -1;
    }
    if (dataA >= dataB) {
      return 1;
    }
  }
  return 0;
}

export function sortDescPredEndDate(a, b) {
  let dataA = new Date();
  let dataB = new Date();
  if (!a.datePrediction) {
    dataA = new Date("2100/12/31");
  } else if (!b.datePrediction) {
    dataB = new Date("2100/12/31");
  } else {
    dataA = new Date(a.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
    dataB = new Date(b.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  }
  if (dataA > dataB) {
    return -1;
  }
  if (dataA < dataB) {
    return 1;
  }
  return 0;
}

export function sortAscPredEndDate(a, b) {
  let dataA = new Date();
  let dataB = new Date();
  console.log(a, b);
  if (!a.datePrediction) {
    dataA = new Date("2100/12/31");
  } else if (!b.datePrediction) {
    dataB = new Date("2100/12/31");
  } else {
    dataA = new Date(a.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
    dataB = new Date(b.datePrediction.split("/").reverse().join("-")); // converte la data nel formato "YYYY-MM-DD"
  }

  if (dataA || dataB) {
    if (dataA <= dataB) {
      return -1;
    }
    if (dataA >= dataB) {
      return 1;
    }
  }
  return 0;
}
