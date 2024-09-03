import React from "react";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "10px",
      }}
    >
      <Link to="/">
        <Heading size="lg">ChatBot</Heading>
      </Link>

      <Link to="/generateavatar">
        <Heading size="lg">Generate Avatar</Heading>
      </Link>
    </div>
  );
};

export default Navbar;
