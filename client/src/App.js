import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AppRoutes from "./routes/routes";

function App() {
  return (
    <div className="App" data-testid="app-component">
      <AppRoutes/>
    </div>
  );
}

export default App;
