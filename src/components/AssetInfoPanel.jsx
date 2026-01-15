function getLastNDaysHistory(prData, assetId, currentDate, N = 7) {
    const dates = Object.keys(prData).sort();
    const index = dates.indexOf(currentDate);
    const slice = dates.slice(Math.max(0, index - N + 1), index + 1);

    return slice.map(date => ({
        date,
        value: prData[date][assetId]
    }));
}


export default function AssetInfoPanel({ assetId, prData, selectedDate }) {
    if (!assetId) {
        return (
            <div style={{ background: "#111827", padding: "12px", borderRadius: "8px" }}>
                <h3 style={{ marginTop: 0 }}>Asset Details</h3>
                <p style={{ color: "#9ca3af" }}>Click on an inverter to see details.</p>
            </div>
        );
    }

    const prValue = prData[selectedDate][assetId];
    const history = getLastNDaysHistory(prData, assetId, selectedDate, 7);


    let status = "No Data";
    let statusColor = "#9ca3af";

    if (!isNaN(prValue)) {
        if (prValue < 0.0096) {
            status = "Underperforming";
            statusColor = "#ef4444";
        } else if (prValue < 0.00975) {
            status = "Normal";
            statusColor = "#f59e0b";
        } else {
            status = "Good";
            statusColor = "#22c55e";
        }
    }

    return (
        <div style={{ background: "#111827", padding: "12px", borderRadius: "8px" }}>
            <h3 style={{ marginTop: 0 }}>Asset Details</h3>
            <p><strong>ID:</strong> {assetId}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p>
                <strong>PR:</strong>{" "}
                {isNaN(prValue) ? "N/A" : prValue.toFixed(6)}
            </p>
            <p>
                <strong>Status:</strong>{" "}
                <span style={{ color: statusColor }}>{status}</span>
            </p>
            <div style={{ marginTop: "10px" }}>
                <strong>Last 7 Days Trend</strong>
                <svg width="100%" height="60" viewBox="0 0 100 40">
                    {history.every(h => !isNaN(h.value)) && (
                        <polyline
                            fill="none"
                            stroke="#4fd1c5"
                            strokeWidth="2"
                            points={history.map((h, i) => {
                                const x = (i / (history.length - 1)) * 100;
                                const y = 40 - ((h.value - Math.min(...history.map(d => d.value))) /
                                    (Math.max(...history.map(d => d.value)) - Math.min(...history.map(d => d.value)) || 1)) * 40;
                                return `${x},${y}`;
                            }).join(" ")}
                        />
                    )}
                </svg>
            </div>

        </div>
    );
}
