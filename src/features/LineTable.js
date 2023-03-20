import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

dayjs.locale("it");

export const LineFound = ({ report }) => {
  const navigate = useNavigate();
  console.log("linet report", report);
  const manageClick = async (e) => {
    e.preventDefault();
    navigate("../reports", { state: { ...report } });
  };

  return (
    <>
      {report && (
        <tr onClick={(e) => manageClick(e)}>
          <th scope="row">{report.ref_num}</th>
          <th scope="row">{report.startDate}</th>
          <th scope="row">{report.endDate ? report.endDate : "run"}</th>
          <th scope="row">{report.cinema}</th>
          <th scope="row">{report.screens_number}</th>
          <th scope="row">{report.seats_number}</th>
          <th scope="row">{report.screen_with_issue}</th>
          <th scope="row">{report.screen_with_issue_capacity}</th>
          <th scope="row">{report.category}</th>
          <th scope="row">{report.screen_state}</th>
          <th scope="row">{report.show_stopped}</th>
          <th scope="row">{report.refounds}</th>
          <th scope="row">{report.comps}</th>
          <th scope="row">{report.issue}</th>
          <th scope="row">{report.note}</th>
          <th scope="row">{report.resolved ? "solved" : "in progress"}</th>
          <th scope="row">{report.workDays}</th>
        </tr>
      )}
    </>
  );
};

export default LineFound;
