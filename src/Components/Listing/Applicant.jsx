import React from "react";

const Applicant = ({ applicant }) => {
  return (
    <div className="flex justify-between mb-2 p-5">
      <h1 className="text-gray-600 font-medium">{applicant.email}</h1>
      <h1 className="text-gray-600">{applicant.name}</h1>
    </div>
  );
};

export default Applicant;
