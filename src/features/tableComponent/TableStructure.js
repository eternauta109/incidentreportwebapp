import { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import LineTable from "./LineTable";
import Table from "react-bootstrap/Table";
import {
  AreaSelect,
  DataSorter,
  SelectCinema,
  SelectCategory,
  SelectSolved,
  SelectScreenState,
} from "./Filters";

//setting colore header table
const headerStyle = {
  color: "white",
  fontWeight: "bold",
};

const TableStructure = ({
  filter,
  setFilter,
  listReport,
  listToView,
  loadingReport,
  setListToView,
  user,
}) => {
  const [sortDirection, setSortDirection] = useState(true);

  return (
    <Box
      sx={{
        fontSize: "0.8rem",
        width: "2200px",

        bgcolor: "grey",
      }}
    >
      <Table id="table-to-xls" striped bordered>
        <thead>
          <tr sx={{ bgcolor: "grey" }}>
            <th>
              <Typography
                style={{
                  width: "10px",
                  ...headerStyle,
                }}
              >
                report number{" "}
              </Typography>
            </th>
            <th>
              <Typography style={{ width: "130px", ...headerStyle }}>
                Start Date
                <DataSorter
                  val="startDate"
                  filter={filter}
                  setFilter={setFilter}
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  listReport={listReport}
                  listToView={listToView}
                  setListToView={setListToView}
                />
              </Typography>
            </th>
            <th>
              <Typography style={{ width: "130px", ...headerStyle }}>
                End Date
                <DataSorter
                  val="endDate"
                  filter={filter}
                  listToView={listToView}
                  setFilter={setFilter}
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  listReport={listReport}
                  setListToView={setListToView}
                />
              </Typography>
            </th>
            <th>
              <Typography style={{ width: "130px", ...headerStyle }}>
                res. pred. date
                <DataSorter
                  val="datePrediction"
                  filter={filter}
                  listToView={listToView}
                  setFilter={setFilter}
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                  listReport={listReport}
                  setListToView={setListToView}
                />
              </Typography>
            </th>
            <th>
              <Typography style={{ width: "150px", ...headerStyle }}>
                <SelectCinema
                  user={user}
                  filter={filter}
                  setFilter={setFilter}
                  listReport={listReport}
                  listToView={listToView}
                  setListToView={setListToView}
                />
              </Typography>
            </th>

            <th scope="col">
              <Typography style={{ width: "100px" }}>
                <AreaSelect
                  filter={filter}
                  setFilter={setFilter}
                  listReport={listReport}
                  listToView={listToView}
                  setListToView={setListToView}
                />
              </Typography>
            </th>

            <th>
              <Typography style={{ width: "50px", ...headerStyle }}>
                screens num{" "}
              </Typography>
            </th>
            <th scope="col">
              <Typography style={{ ...headerStyle }}>total seats</Typography>
            </th>
            <th scope="col">
              <Typography style={{ ...headerStyle }}>
                screen with issue
              </Typography>
            </th>
            <th scope="col">
              <Typography style={{ ...headerStyle }}>
                seats screen number
              </Typography>{" "}
            </th>
            <th>
              <Typography style={{ width: "200px", ...headerStyle }}>
                <SelectCategory
                  filter={filter}
                  setFilter={setFilter}
                  listReport={listReport}
                  listToView={listToView}
                  setListToView={setListToView}
                />
              </Typography>
            </th>
            <th scope="col">
              <Typography>
                <SelectScreenState
                  filter={filter}
                  listToView={listToView}
                  setFilter={setFilter}
                  listReport={listReport}
                  setListToView={setListToView}
                />
              </Typography>
            </th>
            <th scope="col">
              <Typography style={{ ...headerStyle }}>show close</Typography>
            </th>
            <th scope="col">
              <Typography style={{ ...headerStyle }}>refounds</Typography>
            </th>
            <th scope="col">
              <Typography style={{ ...headerStyle }}>comps</Typography>
            </th>
            <th>
              <Typography style={{ width: "200px", ...headerStyle }}>
                issues
              </Typography>
            </th>
            <th scope="col">
              <Typography sx={{ ...headerStyle }}>note</Typography>
            </th>
            <th scope="col">
              <SelectSolved
                filter={filter}
                listToView={listToView}
                setFilter={setFilter}
                listReport={listReport}
                setListToView={setListToView}
              />
            </th>
            <th scope="col">
              <Typography sx={{ ...headerStyle }}>work day</Typography>
            </th>
            <th scope="col">
              <Typography sx={{ ...headerStyle }}>action</Typography>
            </th>
          </tr>
        </thead>
        {loadingReport && (
          <tbody>
            <tr>
              <th>loading</th>
            </tr>
          </tbody>
        )}

        {!loadingReport && listToView.length === 0 && (
          <tbody>
            <tr>
              <th>no match found</th>
            </tr>
          </tbody>
        )}

        {!loadingReport && listToView.length > 0 && (
          <tbody sx={{ overflow: "auto", height: "400px" }}>
            {listToView.map((val, key) => (
              <LineTable key={key} report={val} setListToView={setListToView} />
            ))}
          </tbody>
        )}
      </Table>
    </Box>
  );
};

export default TableStructure;
