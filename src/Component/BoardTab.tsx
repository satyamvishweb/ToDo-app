import React from "react";
import DataPad from "../ExtraComponent/DataPad";
import "./BoardTab.css"

const BoardTab: React.FC = () => {
  return (
    <div>
      {" "}
      <div className="conatiner">
       
          <div className="Arragne_dataPad ">
            <DataPad />
          </div>
      </div>
    </div>
  );
};

export default BoardTab;
