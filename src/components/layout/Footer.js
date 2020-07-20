import React from "react";

export default () => {
  let year = new Date();

  return (
    <footer className="footer">
      <div className="container text-center">
        <span className="text-muted">Copyright © {year.getFullYear()}</span>
      </div>
    </footer>
  );
};
