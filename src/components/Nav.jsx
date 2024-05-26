import React from "react";

const Nav = ({ handleFileUpload, handleThresholdChange }) => {
  return (
    <nav className="navbar">
      <label htmlFor="fileInput" className="poppins-bold">
        Upload the Excel file containing GPS data here:
      </label>
      <input
        type="file"
        name="fileInput"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="file-input poppins-medium"
      />
      <label htmlFor="fileInput" className="stoppage-lable poppins-bold">
        Enter the stoppage threshold:
      </label>
      <input
        className="stoppage-input"
        type="number"
        name="stoppage-time"
        id="stoppage-time"
        placeholder="in(minutes)"
        min="0"
        onChange={handleThresholdChange}
      />
    </nav>
  );
};

export default Nav;
