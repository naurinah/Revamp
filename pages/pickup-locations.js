import { Card, CardContent } from "@material-ui/core";
import React from 'react';
import Layout from "../components/Layout";
import Head from "next/head";
import { parseCookies } from "../helpers/";
import { useEffect ,useState} from "react";
import { useStateValue } from "../context/StateProvider";
import PickupLocationTable from "../components/PickupLocationTable";
import AddPickupLocation from "../components/Modals/AddPickupLocation";
import { actionTypes } from "../context/reducer";
import SearchBar from "material-ui-search-bar";


const PickupLocation = ({ data }) => {
  const [{ acno }, dispatch] = useStateValue();
  const res = JSON.parse(data.user);
  const [searched, setSearched] = React.useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [id, setid] = React.useState(1);
  const [friend, setfriend] = React.useState(null);
  const [newfriend, setnew] = React.useState("");


  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.sheetNo.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };


  useEffect(() => {
    dispatch({
      type: actionTypes.SET_USER,
      acno: res.acno,
      b_usrId: res.b_usrId,
      name: res.name,
      acc_type: res.type,
    });
  }, []);

  

  return (
    <Layout>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
                <div className="m-subheader">
                  <div class="form-group m-form__group flex">
                    <div className="col-sm-6 ">
                        <h1 className="heading">Pickup Location</h1>
                    </div>
                    <div className="col-sm-6 text-right">        
                        <button id="AddPickupLocation" class="btn btn-sm btn-primary" 
                        onClick={() => {
                            setShowAlert(true);
                          }}
                        >Add Pickup Location</button>
                        <AddPickupLocation
                          show={showAlert}
                          onHide={() => setShowAlert(false)}
                        />
                    </div>
                </div>
        <Card variant="outlined" className="mt-[2rem] ">
          <CardContent className="border-b p-4 flex items-center justify-between ">
            <h2 className="h2">Pickup Location List</h2>
            {/* <div className="createbtnwrap offset-sm-4 col-sm-4">
              <div className="m-input-icon m-input-icon--left ">
                <div className="form-control m-input m-input--solid">
              
                 </div>
              </div>
            </div>

              */}
                <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                className="form-control m-input m-input--solid offset-sm-4 col-sm-4"
                 />
          </CardContent>
          <PickupLocationTable />
        </Card>
      </div>
    </Layout>
  );
};

export default PickupLocation;

PickupLocation.getInitialProps = async ({ req, res }) => {
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
