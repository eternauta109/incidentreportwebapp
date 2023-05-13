import {
  setCinema,
  setScreens_number,
  setSeats_number,
  setArea,
  setRef_num,
  setScreen_with_issue,
  setScreen_with_issue_capacity,
} from "../../store/slice/reportSlice";
import { useDispatch } from "react-redux";
import { setNewCinema } from "../../store/slice/userSlice";
import { getRefNum } from "../../services/reportsServices";
import dayjs from "dayjs";
import "dayjs/locale/it";
dayjs.locale("it");

import {
  Select,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";

const DataCinema = ({ report, cinemaList, user }) => {
  const dispatch = useDispatch();

  const onCinemaChange = (e) => {
    const cinemaFind = cinemaList.find((el) => el.name === e.target.value);
    console.log("cinemaFind", cinemaFind);
    dispatch(setNewCinema({ cinemaFind }));
    dispatch(setCinema(e.target.value));
    dispatch(setScreens_number(cinemaFind.screens));
    dispatch(setSeats_number(cinemaFind.seats));
    dispatch(setArea(cinemaFind.area));
    dispatch(
      setScreen_with_issue(
        cinemaFind.screens_det[cinemaFind.screens_det.length - 1].screen
      )
    );

    dispatch(
      setScreen_with_issue_capacity(
        cinemaFind.screens_det[cinemaFind.screens_det.length - 1].seats
      )
    );

    getRefNum(cinemaFind.name).then((r) => {
      let appo = `${r + 1}/${dayjs().format("YYYY")}`;
      console.log("appo", appo);
      dispatch(setRef_num(`${r + 1}/${dayjs().format("YYYY")}`));
    });
  };

  return (
    <Grid container sx={{ mb: 2 }} rowSpacing={4} columnSpacing={1}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>cinema</InputLabel>
          <Select
            name="cinema"
            disabled={user.is_facility ? false : true}
            value={report?.cinema ? report.cinema : ""}
            label="cinema"
            onChange={(e) => onCinemaChange(e)}
          >
            {user.cinema.map((el, key) => (
              <MenuItem key={key} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextField
          //SCREENS NUMBER

          value={report?.screens_number ? report.screens_number : ""}
          helperText="n° screens"
          name="screens_number"
          disabled
          label="Screens number"
        />
      </Grid>

      <Grid item xs={4} sm={2}>
        <TextField
          //SEATS NUMBER

          value={report.seats_number ? report.seats_number : ""}
          helperText="tot seats"
          name="seats_number"
          disabled
          label="seats number"
        />
      </Grid>

      <Grid item xs={4} sm={2}>
        <TextField
          //SCREENS NUMBER

          helperText="area"
          name="area"
          value={report?.area ? report.area : ""}
          disabled
          label="area"
        />
      </Grid>
    </Grid>
  );
};

export default DataCinema;
