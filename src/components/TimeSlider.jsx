export default function TimeSlider({ dates, selectedDate, onDateChange }) {
  const currentIndex = dates.indexOf(selectedDate);

  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ marginBottom: "6px", color: "#a0aec0" }}>
        Selected Date: <strong>{selectedDate}</strong>
      </div>

      <input
        type="range"
        min="0"
        max={dates.length - 1}
        value={currentIndex}
        onChange={(e) => onDateChange(dates[Number(e.target.value)])}
        style={{ width: "100%" }}
      />
    </div>
  );
}
