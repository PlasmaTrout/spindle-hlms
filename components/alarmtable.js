import styles from './alarmtable.module.css';

const AlarmTable = (props) => {
  const { data } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <td>
            <abbr title="Id">Id</abbr>
          </td>
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
          ?.filter((alarm) => alarm.state === "active")
          .map((alarm) => (
            <tr
              className={styles[alarm.severity]}
              title={alarm.description}
              key={alarm.id}
            >
              <td>{alarm.id}</td>
              <td>{alarm.date}</td>
              <td>{alarm.tid}</td>
              <td>{alarm.aid}</td>
              <td>{alarm.severity}</td>
              <td>{alarm.message}</td>
              <td>{alarm.state}</td>
              <td>{alarm.group}</td>
              <td>
                <a href={alarm.link} target='blank'>Link</a>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AlarmTable;
