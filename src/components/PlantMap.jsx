import React, { useMemo } from "react";
import { getColorFromNormalizedValue, normalizePRValues } from "../utils/colorScale";

export default function PlantMap({ mapData, prData, selectedDate, selectedAsset, onAssetSelect }) {
    const areas = mapData.areas;
    const dayPR = prData[selectedDate];

    const viewBox = useMemo(() => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        areas.forEach(area => {
            area.points.forEach(p => {
                minX = Math.min(minX, p.x);
                minY = Math.min(minY, p.y);
                maxX = Math.max(maxX, p.x);
                maxY = Math.max(maxY, p.y);
            });
        });

        const padding = 20;
        return `${minX - padding} ${minY - padding} ${(maxX - minX) + 2 * padding} ${(maxY - minY) + 2 * padding}`;
    }, [areas]);

    const normalize = useMemo(() => {
        return normalizePRValues(dayPR);
    }, [dayPR]);

    return (
        <div style={{ flex: 1, background: "#0f1629", borderRadius: "12px", padding: "8px" }}>
            <svg
                viewBox={viewBox}
                width="100%"
                height="600"
                style={{ border: "1px solid #1f2a44", borderRadius: "8px" }}
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {areas.map(area => {
                    const pointsString = area.points.map(p => `${p.x},${p.y}`).join(" ");
                    const prValue = dayPR[area.id];

                    let fillColor = "#555"; // default for NaN
                    if (!isNaN(prValue)) {
                        const normalized = normalize(prValue);
                        fillColor = getColorFromNormalizedValue(normalized);
                    }

                    return (
                        <polygon
                            key={area.id}
                            points={pointsString}
                            fill={fillColor}
                            stroke={area.id === selectedAsset ? "#ffffff" : "#4fd1c5"}
                            strokeWidth={area.id === selectedAsset ? 3 : 1}
                            opacity="0.9"
                            onClick={() => onAssetSelect(area.id)}
                            style={{ cursor: "pointer" }}
                            filter={area.id === selectedAsset ? "url(#glow)" : "none"}
                        >
                            <title>
                                {area.id} | PR: {isNaN(prValue) ? "N/A" : prValue.toFixed(5)}
                            </title>
                        </polygon>
                    );
                })}
            </svg>
        </div>
    );
}
