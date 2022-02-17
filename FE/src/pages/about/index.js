import React, {useEffect} from "react";

import AboutSignup from "./components/about_signup";
import AboutSearch from "./components/about_search";
import Animation1 from "./components/animation_1";
import Animation2 from "./components/animation_2";
import AboutUserf from "./components/about_userf";
import AboutVideo from "./components/about_video";
import AboutContact from "./components/about_contact";

const About = (props) => {

  useEffect(() => {
    props.setWhere('Home');
  }, []);

  return (
    <>
      <AboutSignup where={props.where}/>
      <AboutSearch/>
      <Animation1 where={props.where}/>
      <Animation2 where={props.where}/>
      <AboutUserf where={props.where}/>
      <AboutVideo/>
      <AboutContact/>
    </>
  );
};

export default About;
