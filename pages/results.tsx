import Link from "next/link";
import Layout from "../components/Layout";
import Input from "../components/Input";
import ResultsList from "../components/ResultsList";
import DayRangePicker from "../components/DayRangePicker";
import { useState } from "react";
import MeetDurationSelect from "../components/MeetDurationSelect";
import axios from "axios";

interface Range {
  from: any;
  to: any;
}

const ResultsPage = () => {
  const [timeslots, setTimeslots] = useState(null);
  const [participants, setParticipants] = useState(null);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [duration, setDuration] = useState({
    id: 4,
    name: "1h",
    value: `${60 * 60}`,
  });
  const [rangeState, setRangeState] = useState<Range>({
    from: undefined,
    to: undefined,
  });

  function onButtonClicked(participants: any) {
    setParticipants(participants);
    axios({
      method: "post",
      url: "http://localhost:3000/api/calendar",
      data: {
        participants,
        rangeState,
        duration,
      },
    }).then((res) => {
      setTimeslots(res.data);
    });
  }

  function onDurationChanged(duration: any) {
    setDuration(duration);
  }

  const onRangeChange = (range: Range) => {
    if (range.from != undefined && range.from != null) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
    setRangeState(range);
  };
  return (
    <Layout title="Possible Meetings">
      <DayRangePicker handleRangeChange={onRangeChange} />
      <MeetDurationSelect handleDurationChange={onDurationChanged} />
      <Input
        handleButtonClicked={onButtonClicked}
        buttonEnabled={buttonEnabled}
      />
      <ResultsList positions={timeslots} />
    </Layout>
  );
};

export default ResultsPage;
