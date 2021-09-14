import Head from "next/head";
import AccountSummary from "../components/AccountSummary";
import Layout from "../components/Layout";
import Note from "../components/Note";
import SettlementHistory from "../components/SettlementHistory";
import ShipmentTrend from "../components/ShipmentTrend";
import { parseCookies } from "../helpers/";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import fetchMultitrack from "../functions/fetchMultitrack";
import MultiTrackBox from "../components/MultiTrackBox/MultiTrackBox";

const Tracking = ({ data }) => {
  const [{ acno }, dispatch] = useStateValue();
  const res = JSON.parse(data.user);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_USER,
      acno: res.acno,
      b_usrId: res.b_usrId,
      name: res.name,
      acc_type: res.type,
    });
  }, []);

  const [cnno, setCnno] = useState("");
  const [result, setResult] = useState(null);

  const handleCnno = (e) => {
    setCnno(e.target.value);
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    let no = cnno.replace(/\s+/g, "");
    no = no.split(",");
    let a = no.map((n) => `"${n}"`);
    let r = await fetchMultitrack(a.toString());
    setResult(r);
    cnno.length == 0 ? setResult({ ...result, cnno: "block"}): setResult({ ...result, cnno: "none" });
    console.log(cnno);

  };

//   useEffect(() => {
//  document.querySelector("#trackBtn").addEventListener('click', function(e) {
//     e.preventDefault();
//     var trackno = document.querySelector("#trackno").value;
//     if(trackno == "") {
//         // document.querySelector("#trackno").focus().classList.add('error');
//         current.querySelector("trackno").focus().classList.add('error');
//         // document.querySelector(".error-message").text("Please Enter Valid Tracking Number !");
//         return false;
//     // }else if(parseInt(trackno) >= 5000000000 && parseInt(trackno) <= 5999999999){
//     //     document.querySelector("#trackno").focus().removeClass('error');
//     //     document.querySelector(".error-message").text("");
//     //     GetData(trackno);
//     // }else{
//     //     document.querySelector(".error-message").text("Please Enter Valid Tracking Number !");
//     //     document.querySelector("#trackno").focus().classList.add('error');
//     //     return false;
//    }
// })
// }, []);
  

  return (
    <div>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <Layout>
        <div className="m-content">
        <h1 className="heading mb-4">Multi Track</h1>
        <Card variant="outlined">
          <div className="container row">
            <div className="col-xl-12 col-lg-12">
              <div className="m-portlet m-portlet--full-height ">
            <CardContent>
              <form
                className="flex flex-col sm:flex-row gap-3 p-[1rem] sm:p-[1rem] trackingForm"
                onSubmit={handleTrack}
              >
                <div className="col-sm-7 offset-sm-1">
                <input
                  className="trackInput nonValid "
                  type="text"
                  placeholder="Enter shipment tracking number (CN Numbers) seprated by commas"
                  value={cnno}
                  onChange={handleCnno}

                />
                </div>
                <button
                  type="submit"
                  id="trackBtn"
                  className="bg-[#0047ba] focus:outline-none text-white rounded-sm flex items-center justify-center p-2 min-w-[10rem]"
                >
                  Track
                </button>
              </form>
              {result &&
                result.map((r) => (
                  <MultiTrackBox
                    key={r.shipmentnumber}
                    details={r.Details}
                    cnDetail={r.cnDetail}
                    cust_add={r.cust_add}
                    cust_name={r.cust_name}
                    cust_ref={r.cust_ref}
                    shipmentnumber={r.shipmentnumber}
                  />
                ))}
            </CardContent>
            </div>
            </div>
          </div>
        </Card>
        </div>
      </Layout>
    </div>
  );
};

export default Tracking;

Tracking.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (
      (Object.keys(data).length === 0 && data.constructor === Object) ||
      Object(data).user === "undefined"
    ) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};
