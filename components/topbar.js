import { useState } from "react";

const TopBar = (props) => {
  const { refreshEvent, toggleClearVisible, selectedAlarm } = props;
  return (
    <header className="toolbar toolbar-header">
      <h1 className="title">Spindle NMS</h1>
      <div className="toolbar-actions">
        <div className="btn-group">
          <button className="btn btn-default" onClick={toggleClearVisible} title="Toggle visibility of cleared items">
            <span className="icon icon-eye"></span>
          </button>
        </div>
        <button className="btn btn-default pull-right" onClick={refreshEvent}>
          <span className="icon icon-retweet"></span>
        </button>
        <button className="btn btn-default pull-right">
          <span className="icon icon-plus"></span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
