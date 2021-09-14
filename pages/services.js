import { Card, CardContent } from "@material-ui/core";
import Layout from "../components/Layout";
import Head from "next/head";
import { parseCookies } from "../helpers/";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import TariffRatesTable from "../components/TariffRatesTable";
import RegularCustomerTable from "../components/RegularCustomerTable";


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const Services = ({ data }) => {
  const [{ acno }, dispatch] = useStateValue();
  const res = JSON.parse(data.user);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
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


  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
   
  return (
    <Layout>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="m-content">
        <h1 className="heading">Services</h1>
        <div className="row">
        <Card variant="outlined" className="mt-[2rem]">
          <CardContent className="border-b flex items-start p-[2rem] flex-col md:flex-row ">
          <div className="col-sm-4">
            <div className="w-[15rem] md:ml-8 md:mr-8 position:fixed">
              <img src="/images/cod.png" alt="COD" loading="lazy" />
            </div>
            </div>
        
          <div className="col-sm-8">
            <div className="flex-1 ">
              <h2 className="mb-[1.5rem] text-lg font-semibold">
                Cash On Delivery (COD)
              </h2>
              <p className="text-[#838383] mb-4 text-sm">
                blueEX's tried & trusted next day delivery <br />
                service across Pakistan with a fortnightly settlement cycle.
              </p>
            </div>
          
            <div className="flex-1">
              <h2 className="mb-[1.5rem] text-lg font-semibold">
                Tariff Rates
              </h2>
              <p className="text-[#838383] mb-4 text-sm">
                A list of all the tariff rates for the locations you ship to.
                14% GST applicable on as per law
              </p>
            </div>
            <TariffRatesTable />
            </div>
          </CardContent>
        </Card>
        
        <Card variant="outlined" className="mt-[2rem]">
          {/* <div className="row"> */}
          <CardContent className=" border-b flex items-start p-[2rem] flex-col md:flex-row ">
            <div className="col-sm-4 items-start">
            <div className="w-[13rem] md:ml-8 ">
              <img src="/images/cod.png" alt="COD" loading="lazy" />
            </div>
            </div>
            <div  className="col-sm-8">
            <div className="flex-1 ">
              <h2 className="mb-[1.5rem] text-lg font-semibold">
                Insurance Scheme for COD Shipments
              </h2>
              <p className="text-[#838383] mb-4 text-sm font-bold">
                Dear Customer,
              </p>
              <p className="text-[#838383] mb-4 text-sm">
                We are pleased to inform you that for the safety and security of
                your consignments we have arranged the insurance coverage.
              </p>
              <p className="text-[#838383] mb-4 text-sm">
                Therefore, please find enclosed the insurance scheme for your
                information and action. If you wish to obtain insurance cover
                then please specify the same on each CN (Consignment Note) from
                now on where insured value is required to be filled by the
                Customer.
              </p>
              <p className="text-[#838383] mb-4 text-sm">
                In case you need any further information please contact with Mr.
                Ali Taha (Finance Controller) on telephone No. 34327911 -14.
              </p>
              <p className="text-[#838383] mb-4 text-sm">Thanking you!</p>
              <div className="tariffwrap">
               <button class="btn btn-primary " type="button" data-toggle="collapse"
                  data-target="#insuranceTab" aria-expanded="true" aria-controls="insuranceTab" button onClick={handleClick}>
                  View Details
               </button>
               <Collapse  in={open} timeout="auto" unmountOnExit >
               <List component="div" disablePadding>
               <div className="collapse show" id="insuranceTab">
                  <div className="flex-1 pt-4 border-b tariffinnerwrap">
                    <h2 className="mb-[1.5rem] text-lg font-semibold">
                      Scheme for Regular Customers
                    </h2>
                  </div>
                  <RegularCustomerTable />
                 <div className="flex-1 pt-4 tariffinnerwrap">
                  <h2 className="mb-[1.5rem] text-lg font-semibold">
                    Scheme for Non Regular Customers
                  </h2>
                  <p className="text-[#838383] mb-4 text-sm">
                    3% on the declared value on the Consignment Note.
                  </p>
                </div>
               </div>
               </List>
               </Collapse>
              </div>
            </div>
            </div>
          </CardContent>
          {/* </div> */}
        </Card>
       
        </div>
      </div>
    </Layout>
  );
};

export default Services;

Services.getInitialProps = async ({ req, res }) => {
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
function NestedList() {
  
  
}