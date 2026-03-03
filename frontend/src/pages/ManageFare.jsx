// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import OwnerNavbar from '../components/OwnerNavbar';

// // const ManageFare = () => {
// //   const [flightNumber, setFlightNumber] = useState('');
// //   const [amount, setAmount] = useState('');
// //   const [fares, setFares] = useState([]);
// //   const [error, setError] = useState('');
// //   const [editingFare, setEditingFare] = useState(null);
// //   const [editedFareData, setEditedFareData] = useState({});
// //   const token = localStorage.getItem('token');

// //   // Fetch fares on component mount
// //   useEffect(() => {
// //     fetchFares();
// //   }, []);

// //   // Fetch fares function
// //   const fetchFares = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:8085/api/fares', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setFares(response.data);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to load fares');
// //       setFares([]);
// //     }
// //   };

// //   // Add fare function
// //   const addFare = async () => {
// //     if (!flightNumber || !amount) {
// //       setError('Flight Number and Amount are required');
// //       return;
// //     }
// //     try {
// //       const newFare = { flightNumber, fare: parseFloat(amount) };
// //       await axios.post('http://localhost:8085/api/fares', newFare, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setFares([...fares, newFare]);
// //       setFlightNumber('');
// //       setAmount('');
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to add fare');
// //     }
// //   };

// //   // Delete fare function
// //   const deleteFare = async (flightNumber) => {
// //     try {
// //       await axios.delete(`http://localhost:8085/api/fares/${flightNumber}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setFares(fares.filter((fare) => fare.flightNumber !== flightNumber));
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to delete fare');
// //     }
// //   };

// //   // Start editing fare
// //   const startEditing = (fare) => {
// //     setEditingFare(fare.flightNumber);
// //     setEditedFareData({ ...fare });
// //   };

// //   // Cancel editing
// //   const cancelEditing = () => {
// //     setEditingFare(null);
// //     setEditedFareData({});
// //   };

// //   // Save edited fare
// //   const saveEdit = async () => {
// //     if (!editedFareData.flightNumber || !editedFareData.amount) {
// //       setError('Flight Number and Amount are required');
// //       return;
// //     }
// //     try {
// //     //   await axios.put(`http://localhost:8085/api/fares/${editingFare}`, editedFareData, {
// //         // headers: { Authorization: `Bearer ${token}` },
// //     //   });
// //     await axios.put(`http://localhost:8085/api/fares/${editingFare}`, {
// //   flightNumber: editedFareData.flightNumber,
// //   fare: editedFareData.amount
// // });

// //       setFares(
// //         fares.map((fare) =>
// //           fare.flightNumber === editingFare ? editedFareData : fare
// //         )
// //       );
// //       setEditingFare(null);
// //       setEditedFareData({});
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to update fare');
// //     }
// //   };

// //   // Handle input change while editing
// //   const handleEditChange = (field, value) => {
// //     setEditedFareData((prev) => ({
// //       ...prev,
// //       [field]: field === 'amount' ? parseFloat(value) || '' : value,
// //     }));
// //   };

// //   return (
// //     <>
// //       <OwnerNavbar />
// //       <div>
// //         <h2>Manage Fares</h2>

// //         {/* Add Fare Form */}
// //         <div style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
// //           <h3>AddA Fare</h3>
// //           <input
// //             type="text"
// //             placeholder="Flight Number"
// //             value={flightNumber}
// //             onChange={(e) => setFlightNumber(e.target.value)}
// //           />
// //           <input
// //             type="number"
// //             placeholder="Amount"
// //             value={amount}
// //             onChange={(e) => setAmount(e.target.value)}
// //           />
// //           <button onClick={addFare}>Add Fare</button>
// //         </div>

// //         {error && <p style={{ color: 'red' }}>{error}</p>}

// //         {/* Fares Table */}
// //         {fares.length > 0 ? (
// //           <table border="1" cellPadding="8">
// //             <thead>
// //               <tr>
// //                 <th>Flight Number</th>
// //                 <th>Amount</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {fares.map((fare) => (
// //                 <tr key={fare.flightNumber}>
// //                   <td>
// //                     {editingFare === fare.flightNumber ? (
// //                       <input
// //                         type="text"
// //                         value={editedFareData.flightNumber}
// //                         onChange={(e) => handleEditChange('flightNumber', e.target.value)}
// //                         disabled // Usually flightNumber is key, so disable editing if needed
// //                       />
// //                     ) : (
// //                       fare.flightNumber
// //                     )}
// //                   </td>
// //                   <td>
// //                     {editingFare === fare.flightNumber ? (
// //                       <input
// //                         type="number"
// //                         value={editedFareData.amount}
// //                         onChange={(e) => handleEditChange('amount', e.target.value)}
// //                       />
// //                     ) : (
// //                       fare.amount
// //                     )}
// //                   </td>
// //                   <td>
// //                     {editingFare === fare.flightNumber ? (
// //                       <>
// //                         <button onClick={saveEdit}>Save</button>
// //                         <button onClick={cancelEditing}>Cancel</button>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <button onClick={() => startEditing(fare)}>Edit</button>
// //                         <button onClick={() => deleteFare(fare.flightNumber)}>Delete</button>
// //                       </>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           !error && <p>No fares to show</p>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default ManageFare;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import OwnerNavbar from "../components/OwnerNavbar";

// const ManageFare = () => {
//   const [flightNumber, setFlightNumber] = useState("");
//   const [amount, setAmount] = useState("");
//   const [fares, setFares] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [editingFare, setEditingFare] = useState(null);
//   const [editedFareData, setEditedFareData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   // Fetch fares on component mount
//   useEffect(() => {
//     fetchFares();
//   }, []);

//   // Fetch fares function
//   const fetchFares = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get("http://localhost:8085/api/fares", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFares(response.data);
//       setError("");
//       setSuccess("Fares loaded successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load fares");
//       setFares([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Add fare function
//   const addFare = async () => {
//     if (!flightNumber || !amount) {
//       setError("Flight Number and Amount are required");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const newFare = { flightNumber, fare: parseFloat(amount) };
//       await axios.post("http://localhost:8085/api/fares", newFare, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFares([...fares, newFare]);
//       setFlightNumber("");
//       setAmount("");
//       setError("");
//       setSuccess("Fare added successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to add fare");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Delete fare function
//   const deleteFare = async (flightNumber) => {
//     if (!window.confirm("Are you sure you want to delete this fare?")) return;

//     setIsLoading(true);
//     try {
//       await axios.delete(`http://localhost:8085/api/fares/${flightNumber}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFares(fares.filter((fare) => fare.flightNumber !== flightNumber));
//       setError("");
//       setSuccess("Fare deleted successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete fare");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Start editing fare
//   const startEditing = (fare) => {
//     setEditingFare(fare.flightNumber);
//     setEditedFareData({
//       flightNumber: fare.flightNumber,
//       amount: fare.fare,
//     });
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingFare(null);
//     setEditedFareData({});
//   };

//   // Save edited fare
//   const saveEdit = async () => {
//     if (!editedFareData.flightNumber || !editedFareData.amount) {
//       setError("Flight Number and Amount are required");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await axios.put(
//         `http://localhost:8085/api/fares/${editingFare}`,
//         {
//           flightNumber: editedFareData.flightNumber,
//           fare: parseFloat(editedFareData.amount),
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setFares(
//         fares.map((fare) =>
//           fare.flightNumber === editingFare
//             ? {
//                 flightNumber: editedFareData.flightNumber,
//                 fare: parseFloat(editedFareData.amount),
//               }
//             : fare
//         )
//       );
//       setEditingFare(null);
//       setEditedFareData({});
//       setError("");
//       setSuccess("Fare updated successfully");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update fare");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle input change while editing
//   const handleEditChange = (field, value) => {
//     setEditedFareData((prev) => ({
//       ...prev,
//       [field]: field === "amount" ? parseFloat(value) || "" : value,
//     }));
//   };

//   return (
//     <>
//       <OwnerNavbar />
//       <div className="container mt-4">
//         <div className="card shadow-sm">
//           <div className="card-header bg-primary text-white">
//             <h2 className="mb-0">
//               <i className="bi bi-currency-exchange me-2"></i>Manage Fares
//             </h2>
//           </div>

//           <div className="card-body">
//             {/* Add Fare Form */}
//             <div className="card mb-4">
//               <div className="card-header bg-light">
//                 <h4 className="mb-0">
//                   <i className="bi bi-plus-circle me-2"></i>Add New Fare
//                 </h4>
//               </div>
//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <label className="form-label">Flight Number*</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="FL123"
//                       value={flightNumber}
//                       onChange={(e) => setFlightNumber(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Fare Amount (₹)*</label>
//                     <div className="input-group">
//                       <span className="input-group-text">₹</span>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="5000"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         min="0"
//                         step="100"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-grid gap-2 mt-3">
//                   <button
//                     className="btn btn-primary"
//                     onClick={addFare}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <span className="spinner-border spinner-border-sm me-2"></span>
//                     ) : (
//                       <i className="bi bi-save me-2"></i>
//                     )}
//                     Add Fare
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Status Messages */}
//             {error && (
//               <div className="alert alert-danger">
//                 <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                 {error}
//               </div>
//             )}
//             {success && (
//               <div className="alert alert-success">
//                 <i className="bi bi-check-circle-fill me-2"></i>
//                 {success}
//               </div>
//             )}

//             {/* Fares Table */}
//             {fares.length > 0 ? (
//               <div className="table-responsive">
//                 <table className="table table-hover align-middle">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Flight Number</th>
//                       <th>Fare Amount (₹)</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {fares.map((fare) => (
//                       <tr key={fare.flightNumber}>
//                         <td className="fw-bold">
//                           {editingFare === fare.flightNumber ? (
//                             <input
//                               type="text"
//                               className="form-control form-control-sm"
//                               value={editedFareData.flightNumber}
//                               onChange={(e) =>
//                                 handleEditChange("flightNumber", e.target.value)
//                               }
//                               disabled
//                             />
//                           ) : (
//                             fare.flightNumber
//                           )}
//                         </td>
//                         <td>
//                           {editingFare === fare.flightNumber ? (
//                             <div className="input-group input-group-sm">
//                               <span className="input-group-text">₹</span>
//                               <input
//                                 type="number"
//                                 className="form-control"
//                                 value={editedFareData.amount}
//                                 onChange={(e) =>
//                                   handleEditChange("amount", e.target.value)
//                                 }
//                                 min="0"
//                                 step="100"
//                               />
//                             </div>
//                           ) : (
//                             `₹${fare.fare.toLocaleString()}`
//                           )}
//                         </td>
//                         <td>
//                           {editingFare === fare.flightNumber ? (
//                             <div className="d-flex gap-2">
//                               <button
//                                 className="btn btn-sm btn-success"
//                                 onClick={saveEdit}
//                                 disabled={isLoading}
//                               >
//                                 <i className="bi bi-check-lg"></i> Save
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-secondary"
//                                 onClick={cancelEditing}
//                               >
//                                 <i className="bi bi-x-lg"></i> Cancel
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="d-flex gap-2">
//                               <button
//                                 className="btn btn-sm btn-outline-primary"
//                                 onClick={() => startEditing(fare)}
//                               >
//                                 <i className="bi bi-pencil"></i> Edit
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => deleteFare(fare.flightNumber)}
//                                 disabled={isLoading}
//                               >
//                                 <i className="bi bi-trash"></i> Delete
//                               </button>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               !error && (
//                 <div className="text-center py-5 bg-light rounded">
//                   <i className="bi bi-currency-exchange fs-1 text-muted"></i>
//                   <h4 className="mt-3">No fares found</h4>
//                   <p>Add a new fare to get started</p>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageFare;

import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerNavbar from "../components/OwnerNavbar";

const ManageFare = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [fares, setFares] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingFare, setEditingFare] = useState(null);
  const [editedFareData, setEditedFareData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch fares on component mount
  useEffect(() => {
    fetchFares();
  }, []);

  // Fetch fares function
  const fetchFares = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8085/api/fares", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFares(response.data);
      setError("");
      setSuccess("Fares loaded successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load fares");
      setFares([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add fare function
  const addFare = async () => {
    if (!flightNumber || !amount) {
      setError("Flight Number and Amount are required");
      return;
    }

    setIsLoading(true);
    try {
      const newFare = { flightNumber, fare: parseFloat(amount) };
      await axios.post("http://localhost:8085/api/fares", newFare, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFares([...fares, newFare]);
      setFlightNumber("");
      setAmount("");
      setError("");
      setSuccess("Fare added successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add fare");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete fare function
  const deleteFare = async (flightNumber) => {
    if (!window.confirm("Are you sure you want to delete this fare?")) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8085/api/fares/${flightNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFares(fares.filter((fare) => fare.flightNumber !== flightNumber));
      setError("");
      setSuccess("Fare deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete fare");
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing fare
  const startEditing = (fare) => {
    setEditingFare(fare.flightNumber);
    setEditedFareData({
      flightNumber: fare.flightNumber,
      amount: fare.fare,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingFare(null);
    setEditedFareData({});
  };

  // Save edited fare
  const saveEdit = async () => {
    if (!editedFareData.flightNumber || !editedFareData.amount) {
      setError("Flight Number and Amount are required");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:8085/api/fares/${editingFare}`,
        {
          flightNumber: editedFareData.flightNumber,
          fare: parseFloat(editedFareData.amount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFares(
        fares.map((fare) =>
          fare.flightNumber === editingFare
            ? {
                flightNumber: editedFareData.flightNumber,
                fare: parseFloat(editedFareData.amount),
              }
            : fare
        )
      );
      setEditingFare(null);
      setEditedFareData({});
      setError("");
      setSuccess("Fare updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update fare");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change while editing
  const handleEditChange = (field, value) => {
    setEditedFareData((prev) => ({
      ...prev,
      [field]: field === "amount" ? parseFloat(value) || "" : value,
    }));
  };

  return (
    <>
      <OwnerNavbar />
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">
              <i className="bi bi-currency-exchange me-2"></i>Manage Fares
            </h2>
          </div>

          <div className="card-body">
            {/* Add Fare Form */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h4 className="mb-0">
                  <i className="bi bi-plus-circle me-2"></i>Add New Fare
                </h4>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Flight Number*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="FL123"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Fare Amount (₹)*</label>
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="5000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={addFare}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      <i className="bi bi-save me-2"></i>
                    )}
                    Add Fare
                  </button>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                <i className="bi bi-check-circle-fill me-2"></i>
                {success}
              </div>
            )}

            {/* Fares Table */}
            {fares.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Flight Number</th>
                      <th>Fare Amount (₹)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fares.map((fare) => (
                      <tr key={fare.flightNumber}>
                        <td className="fw-bold">
                          {editingFare === fare.flightNumber ? (
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editedFareData.flightNumber}
                              onChange={(e) =>
                                handleEditChange("flightNumber", e.target.value)
                              }
                              disabled
                            />
                          ) : (
                            fare.flightNumber
                          )}
                        </td>
                        <td>
                          {editingFare === fare.flightNumber ? (
                            <div className="input-group input-group-sm">
                              <span className="input-group-text">₹</span>
                              <input
                                type="number"
                                className="form-control"
                                value={editedFareData.amount}
                                onChange={(e) =>
                                  handleEditChange("amount", e.target.value)
                                }
                                min="0"
                                step="100"
                              />
                            </div>
                          ) : (
                            `₹${fare.fare.toLocaleString()}`
                          )}
                        </td>
                        <td>
                          {editingFare === fare.flightNumber ? (
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={saveEdit}
                                disabled={isLoading}
                              >
                                <i className="bi bi-check-lg"></i> Save
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={cancelEditing}
                              >
                                <i className="bi bi-x-lg"></i> Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => startEditing(fare)}
                              >
                                <i className="bi bi-pencil"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteFare(fare.flightNumber)}
                                disabled={isLoading}
                              >
                                <i className="bi bi-trash"></i> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              !error && (
                <div className="text-center py-5 bg-light rounded">
                  <i className="bi bi-currency-exchange fs-1 text-muted"></i>
                  <h4 className="mt-3">No fares found</h4>
                  <p>Add a new fare to get started</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageFare;
