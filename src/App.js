import {
  Route,
  Routes,
} from "react-router-dom";
import { FullLayouts } from "./layout/FullLayout.tsx";
import DriverLogin from "./auth/Login.tsx";
// import Registration from "./view/driver/registration/index.tsx";
// import Qualification from "./view/driver/registration/Qualiication.tsx";
// import MotorVehicleRecord from "./view/driver/registration/MotorVehicleRecord.tsx";
// import MovingViolations from "./view/driver/registration/MovingViolations.tsx";
// import Accidents from "./view/driver/registration/Accidents.tsx";
// import PreviousEmployer from "./view/driver/registration/PreviousEmployer.tsx";
// import UnEmployeMent from "./view/driver/registration/Unemployement.tsx";
// import DrivingSchool from "./view/driver/registration/DrivingSchool.tsx";
// import Military from "./view/driver/registration/Military.tsx";
// import Authorization from "./view/driver/registration/AuthorizationAndDisclosure.tsx";
// import PreviewDriver from "./view/driver/registration/Preview.tsx";
// import { ProtectedRoute } from "./routes/ProtectedRoute.tsx";
// import ProductManagement from "./view/dashboard/index.tsx";
import ProductManager from './view/Product/ProductList.tsx';
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<DriverLogin />} />
      <Route
        path="/*"
        element={
          // <ProtectedRoute>
            <FullLayouts>
              <Routes>
                <Route
                  path="/admin/product"
                  exact={true}
                  element={<ProductManager />}
                />
                {/* <Route
                  path="/driver/qualification-information"
                  exact={true}
                  element={<Qualification />}
                />
                <Route
                  path="/driver/vehicle-record"
                  exact={true}
                  element={<MotorVehicleRecord />}
                />
                <Route
                  path="/driver/moving-violations"
                  exact={true}
                  element={<MovingViolations />}
                />
                <Route
                  path="/driver/previous-employer"
                  exact={true}
                  element={<PreviousEmployer />}
                />
                <Route
                  path="/driver/unemployement"
                  exact={true}
                  element={<UnEmployeMent />}
                />
                <Route
                  path="/driver/driving-school"
                  exact={true}
                  element={<DrivingSchool />}
                />
                <Route
                  path="/driver/accidents"
                  exact={true}
                  element={<Accidents />}
                /> */}
                {/* <Route
                  path="/driver/military"
                  exact={true}
                  element={<Military />}
                /> */}

                {/* <Route
                  path="/driver/authorization"
                  exact={true}
                  element={<Authorization />}
                />
                <Route
                  path="/preview"
                  exact={true}
                  element={<PreviewDriver />}
                /> */}
              </Routes>
            </FullLayouts>
          // </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
