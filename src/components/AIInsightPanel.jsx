export default function AIInsightPanel({ prData, selectedDate }) {
  const todayData = prData[selectedDate];

  // Collect valid PR values
  const validEntries = Object.entries(todayData).filter(
    ([, value]) => !isNaN(value)
  );

  if (validEntries.length === 0) {
    return (
      <div style={{ background: "#111827", padding: "12px", borderRadius: "8px" }}>
        <h3 style={{ marginTop: 0 }}>AI Insights</h3>
        <p style={{ color: "#9ca3af" }}>No valid data available for this date.</p>
      </div>
    );
  }

  // Find worst and best performers
  let worst = validEntries[0];
  let best = validEntries[0];
  let sum = 0;

  validEntries.forEach(([id, value]) => {
    sum += value;
    if (value < worst[1]) worst = [id, value];
    if (value > best[1]) best = [id, value];
  });

  const average = sum / validEntries.length;
  const dropPercent = ((average - worst[1]) / average) * 100;

  return (
    <div style={{ background: "#111827", padding: "12px", borderRadius: "8px" }}>
      <h3 style={{ marginTop: 0 }}>AI Insights</h3>

      <p>
        🔻 <strong>Lowest Performer:</strong> {worst[0]}  
        <br />
        PR = {worst[1].toFixed(6)} (
        {dropPercent.toFixed(2)}% below plant average)
      </p>

      <p>
        🔺 <strong>Top Performer:</strong> {best[0]}  
        <br />
        PR = {best[1].toFixed(6)}
      </p>

      <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
        Insight generated using rule-based performance comparison.  
        (Architecture ready for LLM-based reasoning in future.)
      </p>
    </div>
  );
}
