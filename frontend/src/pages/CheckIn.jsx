// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// const CheckIn = () => {
//   const [referenceId, setReferenceId] = useState("");
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state

//   const handleCheckin = async () => {
//     const token = localStorage.getItem("token");
//     if (!referenceId) {
//       setError("Please enter a booking reference ID.");
//       setResponse(null);
//       return;
//     }

//     setLoading(true); // Set loading to true when the request starts
//     try {
//       const res = await axios.post(
//         `http://localhost:8085/checkin/${referenceId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setResponse(res.data);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Check-in failed. Please try again."
//       );
//       setResponse(null);
//     } finally {
//       setLoading(false); // Set loading to false when the request is done
//     }
//   };

//   return (
//     <>
//      <Navbar />
//     <div className="container mt-4">
//       <h2>Flight Check-In</h2>

//       <div className="form-group">
//         <label>Booking Reference ID:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={referenceId}
//           onChange={(e) => setReferenceId(e.target.value)}
//         />
//         <button className="btn btn-primary mt-2" onClick={handleCheckin} disabled={loading}>
//           {loading ? "Checking In..." : "Check-In"}
//         </button>
//       </div>

//       {error && <div className="alert alert-danger mt-3">{error}</div>}

//       {response && (
//         <div className="alert alert-success mt-3">
//           <h5>{response.message}</h5>
//           <p><strong>Seat Number:</strong> {response.seatNumber}</p>
//           <p><strong>Check-In ID:</strong> {response.checkInId}</p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default CheckIn;
import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const CheckIn = () => {
  const [referenceId, setReferenceId] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const boardingRef = useRef();

  const handleCheckin = async () => {
    if (!referenceId) {
      setError("Please enter a booking reference ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8085/checkin/${referenceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Check-in failed. Please try again.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = boardingRef.current.innerHTML;
    const win = window.open("", "", "width=600,height=600");
    win.document.write("<html><head><title>Boarding Pass</title></head><body>");
    win.document.write(printContents);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">
              <i className="bi bi-clipboard-check me-2"></i>Flight Check-In
            </h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <label className="form-label">Booking Reference ID</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                    placeholder="Enter your booking reference"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleCheckin}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="bi bi-check-circle me-2"></i>
                    )}
                    Check-In
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {response && (
              <div className="card border-success mt-4" ref={boardingRef}>
                <div className="card-header bg-success text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Check-In Successful!
                  </h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Boarding Pass</h5>
                      <ul className="list-group list-group-flush">
                       
                       
                       
                       
                       
                        
                        <li className="list-group-item">
                          <strong>Seat:</strong> {response.seatNumber}
                        </li>
                        <li className="list-group-item">
                          <strong>Check-In ID:</strong> {response.checkInId}
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <div className="text-center">
                        <button className="btn btn-outline-primary" onClick={handlePrint}>
                          <i className="bi bi-printer me-2"></i>Print Boarding Pass
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckIn;
