import React, {useEffect} from "react";

import AboutSearch from "../about/components/about_search";
import Animation1 from "../about/components/animation_1";
import Animation2 from "../about/components/animation_2";
import BusContact from "./components/bus_contact.js";
import BusSignup from "./components/bus_signup.js";

const Business = (props) => {

    useEffect(() => {
        props.setWhere('Bus');
      }, []);

  return (
    <>
      <BusSignup/>
      <AboutSearch/>
      <Animation1/>
      <Animation2/>
      <BusContact/>
    </>
  );
};

export default Business;
