import React from "react";

import Button from "@Components/Button/Button";

const Home = () => {
  return (
    <div>
      Home <Button title="submit" type="primary" />
      <div className="test-color">
        <Button title="test" type="primary" />
      </div>
    </div>
  );
};
export default Home;
