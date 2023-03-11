import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/it";
import { Typography } from "@mui/material";

dayjs.locale("it");

export const LineFound = ({ report }) => {
  const navigate = useNavigate();

  const manageClick = async (e) => {
    e.preventDefault();
    navigate("../reports", { state: { ...report } });
    const dd = dayjs().diff(
      dayjs(report.startDate).format("DD/MM/YYYY"),
      "day"
    );
  };

  return (
    <>
      {report && (
        <tr onClick={(e) => manageClick(e)}>
          <th scope="row">{report.startDate}</th>
          <th scope="row">{report.endDate ? report.endDate : "run"}</th>
          <th scope="row">{report.cinema}</th>
          <th scope="row">{report.screens_number}</th>
          <th scope="row">{report.seats_number}</th>
          <th scope="row">{report.screen_with_issues}</th>
          <th scope="row">{report.seats_numeber_closed_screen}</th>
          <th scope="row">{report.category}</th>
          <th scope="row">{report.screen_state}</th>
          <th scope="row">{report.show_stopped}</th>
          <th scope="row">{report.refounds}</th>
          <th scope="row">{report.comps}</th>
          <th scope="row">{report.issue}</th>
          <th scope="row">{report.note}</th>
          <th scope="row">{report.resolved ? "solved" : "in progress"}</th>
          <th scope="row">
            {report.resolved
              ? dayjs(report.endDate, "DD/MM/YYYY").diff(
                  dayjs(report.startDate).format("DD/MM/YYYY"),
                  "day"
                )
              : dayjs().diff(dayjs(report.startDate, "DD/MM/YYYY"), "day")}
          </th>
        </tr>
      )}
    </>
  );
};

export default LineFound;
