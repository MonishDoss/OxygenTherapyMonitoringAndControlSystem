import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [patients, setPatients] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [isDataFetched]); // Removed refreshData from dependency array

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdatePatients = async () => {
        const updatedPatients = await Promise.all(
          data.map(async (patient) => {
            try {
              // Check if the profilePicture is a Blob or base64
              let imageUrl;
              if (patient.profilePicture) {
                // If it's a Blob, create an object URL
                if (patient.profilePicture instanceof Blob) {
                  imageUrl = URL.createObjectURL(patient.profilePicture);
                } else {
                  // If it's base64, use it directly
                  imageUrl = `data:${patient.imageType};base64,${patient.profilePicture}`;
                }
              } else {
                imageUrl = "placeholder-image-url"; // Default placeholder if no image
              }
              return { ...patient, imageUrl };
            } catch (error) {
              console.error("Error fetching image for patient ID:", patient.patientId, error);
              return { ...patient, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setPatients(updatedPatients);
      };

      fetchImagesAndUpdatePatients();
    }
  }, [data]);

  const filteredPatients = selectedCategory
    ? patients.filter((patient) => patient.wardNo === selectedCategory)
    : patients;

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Something went wrong...
      </h2>
    );
  }

  return (
    <>
      <div className="grid">
        {filteredPatients.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Patients Available
          </h2>
        ) : (
          filteredPatients.map((patient) => {
            const { patientId, firstName, lastName, admissionDate, imageUrl } = patient;
            return (
              <div
                className="card mb-3"
                style={{
                  width: "18rem",
                  height: "24rem",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
                  backgroundColor: "#fff",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
                key={patientId}
              >
                <Link
                  to={`/patient/${patientId}`} // Adjusted path for patient details
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl}
                    alt={`${firstName} ${lastName}`}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      padding: "5px",
                      margin: "0",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5 className="card-title" style={{ margin: "0 0 10px 0" }}>
                        {`${firstName} ${lastName}`}
                      </h5>
                      <i className="card-admission" style={{ fontStyle: "italic" }}>
                        Admission Date: {new Date(admissionDate).toLocaleDateString()}
                      </i>
                    </div>
                    <div>
                      {/* <button
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(patient); // Assuming `addToCart` is still relevant for patient data
                        }}
                      >
                        Add to Cart
                      </button> */}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
