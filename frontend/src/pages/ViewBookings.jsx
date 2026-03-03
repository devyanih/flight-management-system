// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import OwnerNavbar from "../components/OwnerNavbar";
// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Ensure this is set during login

//       const response = await axios.get("http://localhost:8085/bookings/all", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   return (
//      <>
//     <OwnerNavbar />
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 border">Booking Ref</th>
//               <th className="py-2 px-4 border">Status</th>
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Gender</th>
//               <th className="py-2 px-4 border">Flight No</th>
//               <th className="py-2 px-4 border">Flight Date</th>
//               <th className="py-2 px-4 border">Fare</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.bookingReference} className="text-center">
//                 <td className="py-2 px-4 border">{booking.bookingReference}</td>
//                 <td className="py-2 px-4 border">{booking.status}</td>
//                 <td className="py-2 px-4 border">
//                   {booking.firstName} {booking.lastName}
//                 </td>
//                 <td className="py-2 px-4 border">{booking.gender}</td>
//                 <td className="py-2 px-4 border">{booking.flightNumber}</td>
//                 <td className="py-2 px-4 border">
//                   {new Date(booking.flightDate).toLocaleDateString()}
//                 </td>
//                 <td className="py-2 px-4 border">₹{booking.fare.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//     </>
//   );
// };

// export default ViewBookings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import OwnerNavbar from "../components/OwnerNavbar";
import { format } from "date-fns";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8085/bookings/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedBookings = React.useMemo(() => {
    if (!sortConfig.key) return bookings;

    return [...bookings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [bookings, sortConfig]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? " ↑" : " ↓";
  };

  if (loading) {
    return (
      <>
        <OwnerNavbar />
        <div className="container mt-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <OwnerNavbar />
        <div className="container mt-4">
          <div className="alert alert-danger" role="alert">
            {error}
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={fetchBookings}
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <OwnerNavbar />
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h2 className="h4 mb-0">All Bookings</h2>
          </div>
          <div className="card-body">
            {bookings.length === 0 ? (
              <div className="alert alert-info">No bookings found.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th
                        className="cursor-pointer"
                        onClick={() => requestSort("bookingReference")}
                      >
                        Booking Ref{getSortIndicator("bookingReference")}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => requestSort("status")}
                      >
                        Status{getSortIndicator("status")}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => requestSort("lastName")}
                      >
                        Name{getSortIndicator("lastName")}
                      </th>
                      <th>Gender</th>
                      <th
                        className="cursor-pointer"
                        onClick={() => requestSort("flightNumber")}
                      >
                        Flight No{getSortIndicator("flightNumber")}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => requestSort("flightDate")}
                      >
                        Flight Date{getSortIndicator("flightDate")}
                      </th>
                      <th
                        className="cursor-pointer"
                        onClick={() => requestSort("fare")}
                      >
                        Fare{getSortIndicator("fare")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBookings.map((booking) => (
                      <tr key={booking.bookingReference}>
                        <td className="fw-bold">{booking.bookingReference}</td>
                        <td>
                          <span
                            className={`badge ${
                              booking.status === "CONFIRMED"
                                ? "bg-success"
                                : booking.status === "CANCELLED"
                                ? "bg-danger"
                                : "bg-warning"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          {booking.firstName} {booking.lastName}
                        </td>
                        <td>{booking.gender}</td>
                        <td>{booking.flightNumber}</td>
                        <td>
                          {format(new Date(booking.flightDate), "dd MMM yyyy")}
                        </td>
                        <td className="text-end">
                          {formatCurrency(booking.fare)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="card-footer text-muted">
            Showing {bookings.length} bookings
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBookings;
