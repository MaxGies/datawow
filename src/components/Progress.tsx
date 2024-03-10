import { useState, useEffect, ReactElement } from "react";
import "./Progress.scss";

interface Progress {
  completeList: number;
  totalList: number;
}

const Progress = ({ totalList, completeList }: Progress): ReactElement => {
  const [percent, setPercen] = useState<number>(0);

  useEffect(() => {
    if (totalList && completeList) {
      setPercen((completeList / totalList) * 100);
    } else {
      setPercen(0);
    }
  }, [totalList, completeList]);

  return (
    <div className="progress-container">
      <div className="head-text">Progress</div>
      <div className="progress-bar">
        <div
          className="percent-complete"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="progress-complete">{completeList} completed</div>
    </div>
  );
};

export default Progress;
