import Link from "next/link";
import Layout from "../components/Layout";
import Input from "../components/Input";
import ResultsList from "../components/ResultsList";
import DayRangePicker from "../components/DayRangePicker";
import { useState } from "react";
import MeetDurationSelect from '../components/MeetDurationSelect';

interface Range {
  from: any;
  to: any;
}

const positions = [
  {
    id: 1,
    time: "14:00",
    date: "January 7, 2020",
  },
  {
    id: 2,
    time: "16:00",
    date: "January 7, 2020",
  },
  {
    id: 3,
    time: "17:30",
    date: "January 14, 2020",
  },
];

const ResultsPage = () => {

  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [rangeState, setRangeState] = useState<Range>({
    from: undefined,
    to: undefined,
  });
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
      <Input buttonEnabled={buttonEnabled} />      
      <MeetDurationSelect/>
      <ResultsList positions={positions} />
    </Layout>
  );
};

export default ResultsPage;
