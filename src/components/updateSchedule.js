import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, DatePicker, Button, TimePicker, Select, message } from "antd";
import moment from "moment";

const host = "http://localhost:5000/";
const UpdateSchedule = (props) => {
  const [form] = Form.useForm();
  const [participantsList, setParticipantsList] = useState([]);
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  };
  const getAllParticipants = () => {
    axios.get(`${host}participant/`).then((res) => {
      if (res?.data) {
        setParticipantsList(res.data);
      }
    });
  };
  const getScheduleDetails = () => {
    axios.get(`${host}exercise/${props?.match?.params.id}`).then((res) => {
      if (res?.data) {
        const initialParticipants = res.data?.participants.filter((id) =>
          participantsList.some(({ _id: id1 }) => id === id1)
        );
        form.setFieldsValue({
          startDate: moment(res.data.startDate, "YYYY-MM-DD"),
          startTime: [
            moment(res.data?.startTime, "HH:mm"),
            moment(res.data?.endTime, "HH:mm"),
          ],
          participants: initialParticipants,
        });
      }
    });
  };
  useEffect(() => {
    getAllParticipants();
    getScheduleDetails();
  }, []);
  const onFinish = (values) => {
    const data = {
      ...values,
      startDate: moment(values.startDate).format("YYYY-MM-DD"),
      endTime: moment(values.startTime[1]).format("HH:mm"),
      startTime: moment(values.startTime[0]).format("HH:mm"),
    };
    if (data.participants.length < 2) {
      message.error("Please select at least two participants");
    } else {
      axios
        .post(`${host}exercise/update/${props?.match?.params.id}`, data)
        .then((res) => {
          if (res.data) {
            props.history.push("/");
            message.success("Schedule updated successfully");
          }
        });
    }
  };
  return (
    <div style={{ padding: 100 }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
          paddingBottom: "0.5rem",
        }}
      >
        Update meeting details
      </div>
      <Form
        form={form}
        name="data"
        colon={false}
        layout="vertical"
        hideRequiredMark
        onFinish={onFinish}
      >
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[
            {
              required: true,
              message: "Please select start date of interview",
            },
          ]}
        >
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Start time"
          rules={[
            {
              required: true,
              message: "Please select start time of interview",
            },
          ]}
        >
          <TimePicker.RangePicker format="HH:mm" />
        </Form.Item>
        <Form.Item
          name="participants"
          label="Select Participants"
          rules={[
            {
              required: true,
              message: "Please select at least two participants",
            },
          ]}
        >
          <Select
            placeholder="Select participants"
            size="large"
            allowClear
            mode="multiple"
          >
            {participantsList.map((participant) => (
              <Select.Option value={participant._id} key={participant._id}>
                {participant.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};
export default UpdateSchedule;
