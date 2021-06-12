import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const host = "http://localhost:5000/";

const Homepage = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const getScheduleList = () => {
    axios.get(`${host}exercise/`).then((res) => {
      if (res?.data) {
        setScheduleList(res.data);
      }
    });
  };
  useEffect(() => {
    getScheduleList();
  }, []);
  const columns = [
    {
      title: "Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <Link to={`/edit/${record?._id}`}>Update</Link>,
    },
  ];
  return (
    <div className="p-3">
      <div
        style={{
          fontWeight: 600,
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          paddingBottom: "0.5rem",
        }}
      >
        Meeting Schedule
      </div>
      <Table columns={columns} dataSource={scheduleList} />
    </div>
  );
};
export default Homepage;
