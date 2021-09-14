import { Card, CardContent } from "@material-ui/core";
import styles from "../styles/faqs.module.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { parseCookies } from "../helpers/";
import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import GeneralFaq from "../components/Faqs/GeneralFaq";
import BookingApp from "../components/Faqs/BookingApp";
import Account from "../components/Faqs/Account";
import Damage from "../components/Faqs/Damage";
import Other from "../components/Faqs/Other";
import Return from "../components/Faqs/Return";
import Shipment from "../components/Faqs/Shipment";
import Tracking from "../components/Faqs/Tracking";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const Faqs = ({ data }) => {
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

  const [faqComp, setFaqComp] = useState("general");

  useEffect(() => {
    let active = document.querySelector(`#${faqComp}`);
    active.classList.add(styles.active);

    return () => {
      active.classList.remove(styles.active);
    };
  }, [faqComp]);

  
  const useStyles = makeStyles((theme) => ({
    
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
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
        <h1 className="heading">Knowledge Base</h1>
        <Card variant="outlined" className="mt-[2rem] ">
          <CardContent className="border-b p-4 flex items-center justify-between ">
            <h2 className="h2">Frequently Asked Questions</h2>

            {/* <div className="m-portlet__head-tools">
              <ul className="m-portlet__nav">
                <li className="m-portlet__nav-item">
                  <a href="" className="m-portlet__nav-link m-btn--pill"></a>
                </li>
              </ul>
            </div> */}

            <div className="m-portlet__head-tools">
                        <div className="m-portlet__nav form-control form-control-md m-input m-input--solid m-input--pill">
                         
                        <InputBase
                          placeholder="Search…"
                          inputProps={{ 'aria-label': 'search' }}
                        />
                         <SearchIcon className="la la-search m--font-brand"/>
                        </div>
                      </div>
           
          </CardContent>
          <CardContent className="flex flex-col lg:flex-row">
            <div className={styles.menu} > 
              <ul className="cursor-pointer" >
                <li id="general" onClick={() => setFaqComp("general")}>
                  General
                </li>
                <li id="booking" onClick={() => setFaqComp("booking")}>
                  Using the new booking app
                </li>
                <li id="account" onClick={() => setFaqComp("account")}>
                  Account opening and settlement
                </li>
                <li id="shipment" onClick={() => setFaqComp("shipment")}>
                  Creating a new shipment and getting it picked up
                </li>
                <li id="tracking" onClick={() => setFaqComp("tracking")}>
                  Tracking a shipment
                </li>
                <li id="returns" onClick={() => setFaqComp("returns")}>
                  Shipping returns and refusals
                </li>
                <li id="damage" onClick={() => setFaqComp("damage")}>
                  Damage claims and insurance
                </li>
                <li id="other" onClick={() => setFaqComp("other")}>
                  Other services
                </li>
              </ul>
            </div>
            <div className={styles.accordion}>
              {faqComp === "general" && <GeneralFaq />}
              {faqComp === "booking" && <BookingApp />}
              {faqComp === "account" && <Account />}
              {faqComp === "shipment" && <Shipment />}
              {faqComp === "tracking" && <Tracking />}
              {faqComp === "returns" && <Return />}
              {faqComp === "damage" && <Damage />}
              {faqComp === "other" && <Other />}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Faqs;

Faqs.getInitialProps = async ({ req, res }) => {
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
