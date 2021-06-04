import { useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { GET_BORDER_DEVICES } from "./components/DevicesList/schema";
import Home from "./route-components/Home";
import { Device } from "./components/DevicesList/index";
import DevicesTable from "./route-components/DevicesTable";
import StatisticsComponent from "./route-components/Statistics";
import Header from "./components/Header";

export const DeviceContext = createContext({
  deviceState: {
    data: [],
    hoveredId: "",
  },
  setDeviceState: (() => {}) as any,
});

function App() {
  const { data } = useQuery(GET_BORDER_DEVICES, {
    pollInterval: 10000,
  });
  const [deviceState, setDeviceState] = useState({
    data: [],
    hoveredId: "",
  });

  useEffect(() => {
    const updateData = data?.getBorderDevices.map((device: Device) => ({
      ...device,
      highlight: false,
    }));
    console.log(updateData);
    setDeviceState({
      data: updateData,
      hoveredId: "",
    });
  }, [data]);

  return (
    <DeviceContext.Provider value={{ deviceState, setDeviceState }}>
      <div className="App">
        <div className="vh-100 mvw-100 m-0 flex-column flex no-wrap">
          <main className="flex-grow">
            <BrowserRouter>
              <Header/>
              <Switch>
                <Route path="/devices">
                  <DevicesTable/>
                </Route>
                <Route path="/statistics">
                  <StatisticsComponent/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </BrowserRouter>
          </main>
        </div>
      </div>
    </DeviceContext.Provider>
  );
}

export default App;
