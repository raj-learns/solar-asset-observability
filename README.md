Solar Asset Observability ; Performance Map

SDE Internship Case Study – SuperPower

This project is a frontend based prototype to visualize performance of solar inverters on a physical layout. The idea is to correlate where the asset is located in plant and how it is performing on a given day, so that an operator can quickly identify problem areas.

The system uses SVG for spatial rendering and time-series PR data for coloring and insights. Backend is not added in this version, but the structure is kept data driven so it can be extended later.

1. How to Run the Project

Clone the repository

Go inside the project folder

Install dependencies

Start the dev server

npm install
npm run dev


The application will start on http://localhost:5173 (default Vite port).
Open it in browser and you will see the performance map with date slider and panels.

2. Assumptions

Some assumptions were made while building this prototype. The PR values provided are already cleaned and mapped with inverter IDs, so it is assumed that asset IDs in geometry file and performance file always match. It is also assumed that one PR value per inverter per day is enough to judge relative health for visualization, even though in real plants many more parameters like temperature, irradiance, downtime, etc. are also used.

Another assumption is that missing values (NaN) indicate either communication issue or offline inverter, so they are shown in grey on the map and excluded from normalization. Backend and real-time streaming is not implemented here, so the system works with static JS data files, but the logic is written in a way that new dates can be added without changing the UI code.

The “AI Insight” part is rule based and not a real machine learning model. It is assumed that simple statistical comparison like best, worst and average performance is enough to demonstrate how an AI agent could be integrated in such a dashboard.

3. How the System Works

When the application loads, it reads the plant geometry from map_ICR17.js and the time series PR data from pr_ICR17.js. All inverter polygons are rendered using SVG and scaled automatically using the computed bounding box, so the layout fits any screen size.

For a selected date (controlled by the slider), the PR values of all inverters are normalized between the minimum and maximum of that day. Based on this normalized value, a color is assigned from red to green, where red represents lower relative performance and green represents higher performance. Inverters with missing data are shown in grey.

When the user hovers on an inverter, its ID and PR value for that day are visible. On clicking an inverter, the right side panel shows detailed information such as the exact PR, health status (good, normal, underperforming) and a small trend line of last few days. This helps in understanding whether the issue is temporary or consistent.

The insight panel analyzes the same daily data and identifies the best and worst performing inverters and compares them with plant average. These insights are shown in natural language so that an operator does not need to manually scan numbers.

4. Design Choices

React was chosen for building the UI because of its component based structure and easy state management. SVG was used instead of canvas because it allows precise interaction with each inverter polygon, like hover, click and dynamic styling.

The color scale is normalized per day instead of using absolute thresholds. This makes relative underperformance clearly visible even when all inverters are operating in a narrow PR range, which is common in real solar plants.

The architecture is kept modular with separate components for map rendering, time control, asset details and insight generation. Even though backend is not part of this submission, the data flow is designed such that PR data can later be fetched from an API and the same components will continue to work.

Overall, the focus was on clarity for an operator, smooth interaction while changing dates, and a structure that looks close to how an actual energy observability system could be built.
