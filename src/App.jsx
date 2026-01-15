import { useState, useMemo } from "react";
import { map_ICR17 } from "./data/map_ICR17";
import { pr_ICR17 } from "./data/pr_ICR17";
import PlantMap from "./components/PlantMap";
import TimeSlider from "./components/TimeSlider";
import AssetInfoPanel from "./components/AssetInfoPanel";
import AIInsightPanel from "./components/AIInsightPanel";

import "./App.css";

function App() {
  const availableDates = useMemo(() => {
    return Object.keys(pr_ICR17.pr_data).sort();
  }, []);
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SuperPower – Solar Asset Observability</h1>
        <p className="subtitle">Performance Map (PR Visualization)</p>
      </header>

      <TimeSlider
        dates={availableDates}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div className="main-layout">
        <PlantMap
          mapData={map_ICR17}
          prData={pr_ICR17.pr_data}
          selectedDate={selectedDate}
          selectedAsset={selectedAsset}
          onAssetSelect={setSelectedAsset}
        />

        <div className="side-panels">
          <AssetInfoPanel
            assetId={selectedAsset}
            prData={pr_ICR17.pr_data}
            selectedDate={selectedDate}
          />

          <AIInsightPanel
            prData={pr_ICR17.pr_data}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
