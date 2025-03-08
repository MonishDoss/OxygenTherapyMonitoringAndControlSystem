import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      wardNo: "",
      contactNumber: "",
      address: "",
      bloodGroup: "",
      admissionDate: "",
      dischargeDate: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    // Prepare FormData to send as multipart/form-data
    const formData = new FormData();
    formData.append("profilePicture", image);  // ❌ Removed the colon
    formData.append("patient", new Blob([JSON.stringify(product)], { type: "application/json" })); 

    try {
      const response = await axios.post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // ✅ Let the browser handle boundaries
        },
      });

      console.log("Product added successfully:", response.data);
      alert("Product added successfully");
      setProduct({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        wardNo: "",
        contactNumber: "",
        address: "",
        bloodGroup: "",
        admissionDate: "",
        dischargeDate: "",
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Error adding product");
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>First Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              onChange={handleInputChange}
              value={product.firstName}
              name="firstName"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Last Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={product.lastName}
              name="lastName"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Date of Birth</h6>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={product.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Gender</h6>
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Gender"
              value={product.gender}
              name="gender"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-5">
            <label className="form-label">
              <h6>Ward No</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Ward No"
              onChange={handleInputChange}
              value={product.wardNo}
              name="wardNo"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Contact Number</h6>
            </label>
            <input
              type="text"
              name="contactNumber"
              className="form-control"
              placeholder="Contact Number"
              value={product.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Address</h6>
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              value={product.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Blood Group</h6>
            </label>
            <input
              type="text"
              name="bloodGroup"
              className="form-control"
              placeholder="Blood Group"
              value={product.bloodGroup}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Admission Date</h6>
            </label>
            <input
              type="date"
              name="admissionDate"
              className="form-control"
              value={product.admissionDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Discharge Date</h6>
            </label>
            <input
              type="date"
              name="dischargeDate"
              className="form-control"
              value={product.dischargeDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
