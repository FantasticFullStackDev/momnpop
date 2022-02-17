import React, { useContext, useEffect, useState , useCallback} from "react";

import axios from "axios";
import Loader from "react-loader-spinner";
import { useForm } from "react-hook-form";
import UserContext from "../../../contexts/userContext";
import DefaultImage from "../../../assets/images/default.png";
import LocationAutoComplete from "../../../components/location-auto-complete";
import { Button, Dropdown, Form } from "react-bootstrap";
import { callApi } from "../../../api/API";
import { _empty } from "../../../utils/utils";


const BusinessProfileView = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadProfleApiCall, setLoadProfileApiCall] = useState({
    didCall: false,
    success: false,
    error: false,
  });

  const { register, handleSubmit, errors, ...form } = useForm();

  const loadProfileData = useCallback(
    async () => {
      setLoadProfileApiCall({ didCall: true, success: false, error: false });
      const users = await callApi(`/users/${userData.id}`, "GET", null, "Bearer " + userData.token);
      if(!_empty(users)){
        console.log(users[1][0]['logo']);
        setProfile({ user: users[0], bussiness: users[1][0] });
          setLoadProfileApiCall({ didCall: false, success: true, error: false });
      }else{
        setLoadProfileApiCall({ didCall: false, success: false, error: true });
      }
    },
    [userData],
  ) 

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  return (
    <>
      {loadProfleApiCall.didCall && (
        <div className="text-center">
          <Loader type="Bars" color="#FF992E" />
          <p>Loading profile information...</p>
        </div>
      )}
      {loadProfleApiCall.success && (
        <div className="business-profile-page col-12">
          {profile && (
            <>
              <div className="d-flex flex-wrap justify-content-between align-items-start border-bottom py-3 mb-2">
                <div className="d-flex">
                  <a
                    href=""
                    className="business-profile-image rounded-circle d-block overflow-hidden shadow"
                  >
                    <img
                      src={typeof(profile.bussiness.logo) !=="undefined"?"https://momnpophub.com:3000/users/getlogo/"+profile.bussiness.logo:DefaultImage}
                      alt=""
                      className="w-100 h-100 img-fluid"
                    />
                    
                  </a>
                  <div className="d-flex flex-column">
                    <a
                      href=""
                      className="business-profile-name text-decoration-none"
                    >
                      {profile.bussiness.bname}
                    </a>
                    <a
                      href=""
                      className="business-profile-url text-decoration-none"
                    >
                      {profile.user.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-start">
                <p className="d-flex">
                  <i className="icon-address-card business-profile-icon" />{" "}
                  {profile.bussiness.description}
                </p>
                <button
                  type="buttn"
                  className="btn bg-transparent border-0 shadow-none p-0"
                >
                  <i className="icon-share-square" />
                </button>
              </div>
              <div className="d-flex flex-wrap">
                <div className="d-flex col px-0">
                  <i className="icon-phone business-profile-icon" />
                  <a
                    href={`tel:${profile.bussiness.phonenumber}`}
                    className="text-decoration-none tel"
                  >
                    {profile.bussiness.phonenumber}
                  </a>
                </div>
                <div className="d-flex col">
                  <i className="icon-user business-profile-icon" />
                  <p>{profile.bussiness.fname}</p>
                </div>
                <div className="col-sm-6 px-0">
                  <a href="" className="text-decoration-none d-flex address">
                    <i className="icon-map-marker-alt business-profile-icon" />
                    <address>{profile.bussiness.baddress}</address>
                  </a>
                </div>
              </div>
              <div className="d-flex justify-content-between flex-wrap align-items-baseline">
                <div className="d-flex col-sm-6">
                  <div className="row">
                    <i className="icon-globe  business-profile-icon" />
                    <a
                      href={`${profile.bussiness.website}`}
                      className="orange-link"
                    >
                      {profile.bussiness.website}
                    </a>
                  </div>
                </div>

                <Dropdown className="dropdown-container col-sm-6 px-5">
                  {userData && userData.btype === "offline" && (
                    <div className="row">
                      <Dropdown.Toggle
                        onClick={() => setShowModal(!showModal)}
                        id="dropdown-basic"
                        className="bg-transparent border-0 p-0 shadow-none"
                      >
                        <span className="orange-link">Add Location</span>
                      </Dropdown.Toggle>
                    </div>
                  )}
                  {showModal && (
                    <Form>
                      <Form.Group>
                        <LocationAutoComplete
                          name="newLocation"
                          form={form}
                          errors={errors}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Button variant="success">Save</Button>
                      </Form.Group>
                    </Form>
                  )}
                </Dropdown>
              </div>
            </>
          )}
        </div>
      )}
      {loadProfleApiCall.error && (
        <div className="text-center" style={{ padding: "5%" }}>
          <p style={{ color: "red" }}>Problem loading profile</p>
          <Button onClick={() => loadProfileData()}>Try again</Button>
        </div>
      )}
    </>
  );
};

export default BusinessProfileView;
