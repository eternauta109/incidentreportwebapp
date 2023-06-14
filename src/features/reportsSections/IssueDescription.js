import { useDispatch } from "react-redux";
import {
  setScreen_with_issue,
  setScreen_with_issue_capacity,
  setCategory,
  setScreen_state,
  setIssue,
} from "../../store/slice/reportSlice";
import {
  Select,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";
import { categoryList } from "../../config/structure";

const IssueDescription = ({ report, user }) => {
  const dispatch = useDispatch();

  const onChangeScreensSelect = (e) => {
    console.log("qui");
    let seatsObj = user.cinemaDet.screens_det.find(
      (el) => el.screen === e.target.value
    );
    console.log("obj", seatsObj);
    dispatch(setScreen_with_issue(e.target.value));
    dispatch(setScreen_with_issue_capacity(seatsObj.seats));
  };
  return (
    <Grid container sx={{ mb: 2 }} rowSpacing={2} columnSpacing={10}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            screen with issue
          </InputLabel>
          <Select
            name="screen_with_issue"
            value={report.screen_with_issue ? report.screen_with_issue : ""}
            label="Screen with issue"
            onChange={(e) => onChangeScreensSelect(e)}
          >
            {user.cinemaDet.screens_det.map((el, key) => (
              <MenuItem key={key} value={el.screen}>
                {el.screen}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          helperText="seats number of closed screen"
          name="screen_with_issue_capacity"
          label="Seats"
          disabled
          value={
            report.screen_with_issue_capacity
              ? report.screen_with_issue_capacity
              : ""
          }
          fullWidth
        />
      </Grid>

      {/* LINE  category */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            name="category"
            value={report.category}
            label="Category"
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            {categoryList.map((el, key) => (
              <MenuItem key={key} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Screen State</InputLabel>
          <Select
            name="screen_state"
            value={report.screen_state}
            label="Screen State"
            onChange={(e) => dispatch(setScreen_state(e.target.value))}
          >
            <MenuItem value={"open"}>open</MenuItem>
            <MenuItem value={"closed"}>closed</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          helperText="explain the issues type"
          id="issue"
          name="issue"
          required={true}
          label="(ob.) Issue description"
          onChange={(e) => dispatch(setIssue(e.target.value))}
          value={report.issue ? report.issue : ""}
          multiline
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default IssueDescription;
