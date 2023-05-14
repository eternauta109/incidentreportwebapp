import React from "react";
import dayjs from "dayjs";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/it";
import { deleteReport } from "../../services/reportsServices";
import { useDispatch } from "react-redux";
import { deleteReportRedux } from "./../../store/slice/reportsSlice";

dayjs.locale("it");

const thStyle = {
  textAlign: "center",
  verticalAlign: "middle",
};

export const LineFound = ({ report, setListToView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* console.log("linet report", report); */
  const manageUpdateClick = async (e) => {
    e.preventDefault();
    await navigate("../reports", { state: { ...report } });
  };

  const manageDeleteClick = async (id) => {
    console.log(id);
    deleteReport(id);
    dispatch(deleteReportRedux(id)).then(
      setListToView((prev) => prev.filter((el) => el.idDoc !== id))
    );
    /*  await navigate("../reports", { state: { ...report } }); */
  };

  return (
    <>
      {report && (
        <tr>
          <th style={thStyle} scope="row">
            {report.ref_num}
          </th>
          <th style={thStyle} scope="row">
            {report.startDate}
          </th>
          <th style={thStyle} scope="row">
            {report.endDate ? report.endDate : "run"}
          </th>
          <th style={thStyle} scope="row">
            {report.datePrediction}
          </th>
          <th style={thStyle} scope="row">
            {report.cinema}
          </th>
          <th style={thStyle} scope="row">
            {report.area}
          </th>
          <th style={thStyle} scope="row">
            {report.screens_number}
          </th>
          <th style={thStyle} scope="row">
            {report.seats_number}
          </th>
          <th style={thStyle} scope="row">
            {report.screen_with_issue}
          </th>
          <th style={thStyle} scope="row">
            {report.screen_with_issue_capacity}
          </th>
          <th style={thStyle} scope="row">
            {report.category}
          </th>
          <th style={thStyle} scope="row">
            {report.screen_state}
          </th>
          <th style={thStyle} scope="row">
            {report.show_stopped}
          </th>
          <th style={thStyle} scope="row">
            {report.refounds}
          </th>
          <th style={thStyle} scope="row">
            {report.comps}
          </th>
          <th style={thStyle} scope="row">
            {report.issue}
          </th>
          <th style={thStyle} scope="row">
            {report.note}
          </th>
          <th style={thStyle} scope="row">
            {report.resolved ? "solved" : "in progress"}
          </th>
          <th style={thStyle} scope="row">
            {report.workDays}
          </th>
          <th style={thStyle} scope="row">
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                onClick={(e) => manageUpdateClick(e)}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
              <Button
                onClick={() => manageDeleteClick(report.idDoc)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Box>
          </th>
        </tr>
      )}
    </>
  );
};

export default LineFound;
