import Link from "next/link";
import Layout from "../components/Layout";
import Input from "../components/Input";
import ResultsList from "../components/ResultsList";
import DayRangePicker from "../components/DayRangePicker";
import { useEffect, useState } from "react";
import MeetDurationSelect from "../components/MeetDurationSelect";
import axios from "axios";
import { getSession, signIn } from "next-auth/client";

interface Range {
  from: any;
  to: any;
}

const ResultsPage = () => {
  const session: any = getSession();
  useEffect(() => {
    session.then((data: any) => {
      if (!data) {
        signIn("google");
      }
    });
  }, [session]);

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
      <ResultsList users={participants} positions={timeslots} />
    </Layout>
  );
};

export default ResultsPage;
