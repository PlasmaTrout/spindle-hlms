import styles from "./alarmtable.module.css";

const AlarmTable = (props) => {
  const { data, hideClear, rowSelect } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <td>
            <abbr title="Date">Date</abbr>
          </td>
          <td>
            <abbr title="TID">TID</abbr>
          </td>
          <td>
            <abbr title="AID">AID</abbr>
          </td>
          <td>
            <abbr title="Severity">Severity</abbr>
          </td>
          <td>
            <abbr title="Message">Message</abbr>
          </td>
          <td>
            <abbr title="State">State</abbr>
          </td>
          <td>
            <abbr title="Group">Group</abbr>
          </td>
          <td>
            <abbr title="Link">Link</abbr>
          </td>
        </tr>
      </thead>
      <tbody>
        {data
          ?.filter((alarm) => {
            //console.log(hideClear);
            if (hideClear) {
              if (alarm.state === "active") {
                return true;
              } else {
                return false;
              }
            }
            return true;
          })
          .map((alarm) => (
            <tr
              className={styles[alarm.state === "inactive" ? "clear" : alarm.severity]}
              title={alarm.description}
              id="alarm-{alarm.id}"
              key={alarm.id}
              onDoubleClick={(e) => rowSelect(e, alarm)}
            >
              <td>{alarm.date}</td>
              <td>{alarm.tid}</td>
              <td>{alarm.aid}</td>
              <td>{alarm.severity}</td>
              <td>{alarm.message}</td>
              <td>{alarm.state}</td>
              <td>{alarm.group}</td>
              <td>
                {alarm.link &&
                <a className="btn btn-default" href={alarm?.link} target="blank">
                  <span className="icon icon-link"></span>
                </a>
                }
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AlarmTable;
