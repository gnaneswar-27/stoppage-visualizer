import { useState } from "react";
import * as XLSX from "xlsx";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { calculateStoppages } from "./utils/helper.js";



function App() {
  const [data, setData] = useState([]);
  const [threshold, setThreshold] = useState(0);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const stoppages = calculateStoppages(data, threshold);

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  return (
    <div className="App">
      <h1 className="poppins-bold">Stoppage Visualizer</h1>
      <Nav
        handleFileUpload={handleFileUpload}
        handleThresholdChange={handleThresholdChange}
      />
      <MapContainer
        center={[12.91723, 74.85603]}
        zoom={12}
        style={{ height: "65vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline
          positions={data.map((item) => [item.latitude, item.longitude])}
          color="blue"
        />
        {stoppages
          .filter((stop) => stop.duration >= threshold)
          .map((stop, index) => (
            <Marker key={index} position={[stop.latitude, stop.longitude]}>
              <Popup>
                <div>
                  <p>
                    Reach Time: {stop.reachTime.format('YYYY-MM-DD HH:mm:ss')}
                  </p>
                  <p>End Time: {stop.endTime.format('YYYY-MM-DD HH:mm:ss')}</p>
                  <p>Duration: {stop.duration.toFixed(0)} minutes</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <Footer />
    </div>
  );
}

export default App;
