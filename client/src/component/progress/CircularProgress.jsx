import CircularProgress from "@mui/material/CircularProgress";
import "./CircularProgress.css";

export default function CircularIndeterminate() {
  return (
    <div id="circular-progress" className="circular-progress">
      <div className="circular-progress--content">
        <CircularProgress thickness={2.0} />
      </div>
      <div className="circular-progress--overlay"></div>
    </div>
  );
}
