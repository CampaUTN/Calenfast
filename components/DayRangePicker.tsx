import React, { useEffect, useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

interface Range {
  from: any;
  to: any;
}
interface DayRangePickerProps{
    handleRangeChange: any
}

export default function DayRangePicker(props: DayRangePickerProps) {
  const [range, setRange] = useState<Range>({ from: undefined, to: undefined });
  const modifiers = { start: range.from, end: range.to };

  const handleDayClick = (day: any) => {
    const result = DateUtils.addDayToRange(day, range);
    setRange(result);
  };

  useEffect(() => {
    props.handleRangeChange(range)
  }, [range])

  return (
      <div style={{
        display: "flex",
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: '25%'
      }}>
    <h1 className="text-2xl mb-3 font-bold leading-tight text-gray-900">
    Select range
  </h1>
    <div>
      <DayPicker
        className="Selectable"
        numberOfMonths={2}
        selectedDays={[range.from, range]}
        modifiers={modifiers}
        onDayClick={handleDayClick}
      />

      <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
    </div>
    </div>
  );
}


