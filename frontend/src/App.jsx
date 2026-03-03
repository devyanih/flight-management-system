import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import SearchFlight from "./pages/SearchFlights";
import BookFlight from "./pages/BookFlight";
import CheckIn from "./pages/Checkin";
import ProtectedRoute from "./components/ProtectedRoute";
import CancelBooking from "./pages/CancelBooking";
import ManageFlights from "./pages/ManageFlight";
import ManageFare from "./pages/ManageFare";
import ViewBookings from "./pages/ViewBookings";

// import ManageUsers from "./pages/ManageUsers";
// import Announcements from "./pages/Announcements";
//
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* Protected USER Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="USER">
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route index element={<SearchFlight />} />
          <Route path="search-flight" element={<SearchFlight />} />
          <Route path="book-flight/:flightId" element={<BookFlight />} />
          <Route path="check-in" element={<CheckIn />} />
          <Route path="cancel-booking" element={<CancelBooking />} />
        </Route>

        {/* /* Protected OWNER Routes *cd/ */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="OWNER">
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<OwnerDashboard />} />
          <Route path="manage-flights" element={<ManageFlights />} />
          <Route path="manage-fare" element={<ManageFare />} />
          <Route path="bookings" element={<ViewBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
