import { useState } from "react";
import { Container, Box } from "@mui/material";
import Plotly from "react-plotly.js";
import {
  PivotTableUI,
  createPlotlyRenderers,
  TableRenderers,
} from "@imc-trading/react-pivottable";
import "@imc-trading/react-pivottable/pivottable.css";

const PlotlyRenderers = createPlotlyRenderers(Plotly);

const Chart = ({ data }) => {
  const [pivottableState, setPivottableState] = useState({});

  return (
    <Container sx={{ overflow: "auto", maxHeight: "1000px" }}>
      <PivotTableUI
        data={data}
        onChange={(s) => setPivottableState(s)}
        renderers={{ ...TableRenderers, ...PlotlyRenderers }}
        {...pivottableState}
      />
    </Container>
  );
};
export default Chart;
