import { Card, CardContent, CircularProgress } from "@material-ui/core";
import Layout from "../components/Layout";
import Head from "next/head";
import { parseCookies } from "../helpers/";
import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import { useForm } from "react-hook-form";
import fetchProfile from "../functions/fetchProfile";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import updateProfile from "../functions/updateProfile";
import Alert from "react-bootstrap/Alert";

const Profile = ({ data, userdata }) => {
  const [{ acno }, dispatch] = useStateValue();
  const res = JSON.parse(data.user);

  console.log(userdata);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_USER,
      acno: res.acno,
      b_usrId: res.b_usrId,
      name: res.name,
      acc_type: res.type,
    });
  }, []);

  const [accountTitle, setAccountTitle] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [cell, setCell] = useState("");
  const [email, setEmail] = useState("");
  const [ntn, setNtn] = useState("");
  const [name, setName] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [status, setStatus] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const updateData = async () => {
    const data = await updateProfile(
      res.acno,
      res.b_usrId,
      name,
      accountTitle,
      address,
      cell,
      email,
      ntn,
      cnic,
      password
    );
    setShowAlert(true);
    data.status === "1" ? setStatus(1) : setStatus(0);
    setIsLoading(false);
  };

  // prevent submitting invalid or empty emails
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // handle form submit
  const onSubmit = async (data) => {
    setIsLoading(true);
    updateData();
  };

  const [show, setShow] = useState("password");

  const handlePassword = () => {
    setShow(show === "text" ? "password" : "text");
  };

  let pass = "";
  if (typeof window !== "undefined") {
    pass = localStorage.getItem("password");
  }
  const [password, setPassword] = useState(pass);

  useEffect(() => {
    let d = userdata.detail[0];
    setAccountTitle(d.AccountTitle);
    setAddress(d.Address);
    setCnic(d.CNIC);
    setCell(d.Cell);
    setEmail(d.Email);
    setNtn(d.NTN);
    setName(d.Name);
  }, []);

  
const logout = (req, res) => {
  removeCookie("user");
  localStorage.setItem("password", "");
  window.location.href = "/";
};


  return (
    <Layout>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="m-content">
        <h1 className="heading">Profile</h1>
        <Card variant="outlined" className="mt-[2rem]">
          <CardContent className="border-b p-4 flex items-center justify-between ">
            <h2 className="h2">Profile Detail</h2>
          </CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="m-form m-form--state m-form--fit m-form--label-align-left">
            <CardContent className="m-form__group form-group clearfix">
              <div className="flex-1 col-sm-8">
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12 col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    Account
                  </label>
                  <div className=" col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput form-control m-input"
                      type="text"
                      id="acno"
                      value={res.acno}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12 col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    Account Title
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="accountTitle"
                      value={accountTitle}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    Name
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="name"
                      value={name}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    Address
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="address"
                      value={address}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    Cell
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="cell"
                      value={cell}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    Email
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="email"
                      value={email}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    NTN
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="ntn"
                      value={
                        ntn !== "-"
                          ? ntn
                          : "Please contact  Customer Services to update your NTN."
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    CNIC
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <input
                      className="shipmentInput"
                      type="text"
                      id="cnic"
                      value={
                        cnic !== "-"
                          ? cnic
                          : "Please contact  Customer Services to update your CNIC."
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12" htmlFor="fullName">
                    Password
                  </label>
                  <div className="col-lg-9 col-md-9 col-sm-12 relative">
                    <input
                      className={`shipmentInput  ${
                        errors.password ? "validate" : "nonValid"
                      } `}
                      {...register("password", { required: true })}
                      type={show}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {show === "password" ? (
                      <VisibilityIcon
                        className="absolute top-2 right-5  text-[#959299]"
                        onClick={handlePassword}
                      />
                    ) : (
                      <VisibilityOffIcon
                        className="absolute top-2 right-5 text-[#959299]"
                        onClick={handlePassword}
                      />
                    )}
                    {errors.password && (
                      <div className="text-red-600 text-xs">
                        Password field is required.
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12"></label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <p className="text-sm">
                      Changing your portal password will require you to use the
                      new password for APIs as well. Make sure your development
                      team are aware of this change if you are consuming blueEX
                      APIs.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <label className="label col-form-label col-lg-3 col-sm-12"></label>
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    <button
                      className="bg-[#0047ba] text-white px-[3rem] py-[0.8rem] rounded-sm"
                      type="submit"
                    >
                      {isLoading ? (
                        <CircularProgress className="text-white" size="20px" />
                      ) : (
                        "Save"
                      )}
                      
                    </button>
                  </div>
                </div>
                <div className="row">
                  <Alert
                    show={showAlert}
                    variant={status === 1 ? "success" : "danger"}
                    onClose={() => setShowAlert(false)}
                    className="w-full"
                    dismissible
                  >
                    <p>
                      {status === 1 
                        ? "Your Profile has been Updated."
                        : "Please Try Again"}
                        
                    </p>
                   
                
                  </Alert>
                </div>
              </div>
              <div className="hidden lg:block w-[15rem]"></div>
            </CardContent>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;

Profile.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  const user = JSON.parse(data.user);
  let userdata = "";
  let json;

  if (res) {
    if (
      (Object.keys(data).length === 0 && data.constructor === Object) ||
      Object(data).user === "undefined"
    ) {
      res.writeHead(301, { Location: "/" });
      res.end();
    } else {
      userdata = await fetchProfile(user.acno);
      console.log(userdata);
    }
  }

  return {
    data: data && data,
    userdata: userdata,
  };
};
