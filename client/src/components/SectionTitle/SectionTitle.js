import React from "react";

function SectionTitle({ title }) {
  return (
    <div>
      <h3 className="text-start mt-4">{title}</h3>
      <hr />
    </div>
  );
}

export default SectionTitle;
