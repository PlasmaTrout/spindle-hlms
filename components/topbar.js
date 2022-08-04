const TopBar = (props) => {
  const { refreshEvent } = props;
  return (
    <header className="toolbar toolbar-header">
      <h1 className="title">Spindle NMS</h1>
      <div className="toolbar-actions">
        <div className="btn-group"></div>
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
