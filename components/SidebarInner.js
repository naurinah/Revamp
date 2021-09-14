import React from 'react'
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import styles from "./Sidebar.module.css"
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { useCookies } from "react-cookie";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import Link from "next/link";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const SidebarInner = () => {
  const [shipmentOpen, setShipmentOpen] = useState(false);
  const [settlementOpen, setSettlementOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleShipmentClick = () => {
    setShipmentOpen(!shipmentOpen);
  };
  const handleSettlementClick = () => {
    setSettlementOpen(!settlementOpen);
  };
  const handleSupportClick = () => {
    setSupportOpen(!supportOpen);
  };
  const handleAccountClick = () => {
    setAccountOpen(!accountOpen);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

const [cookie, removeCookie] = useCookies(["user"]);

   const logout = (req, res) => {
    removeCookie("user");
    localStorage.setItem("password", "");
    window.location.href = "/";
  };

  

  return (
    <>
  
      <div className="m-[1rem]">
        <Link href="/create-shipment" >
          <button className="blueNavBtn ">
            <ControlPointIcon className="mr-2"  /> Create Shipment
          </button>
        </Link>
      </div>
      <List component="nav"  >
        <Link href="/dashboard" >
          <ListItem button style={{padding: "15px 32px"}}>
            <ListItemIcon  edge="start">
              {/* <DashboardIcon /> */}
              <div className="w-6 "><img src="images/images/menu.png"/></div>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <ListItem button onClick={handleShipmentClick} style={{padding: "15px 32px"}}>
     
          <ListItemIcon >
            {/* <AddToPhotosIcon /> */}
            <div className="w-6 "><img src="images/images/add-1.png"/></div>
          </ListItemIcon>
          <ListItemText primary="Shipments" />
          {/* {shipmentOpen ? <ExpandLess sx={{ color: pink[500] }}/> : <ExpandMore />} */}
          {shipmentOpen ? <img src="images/images/down-arrow.svg" style={{width:"10px",height:"10px"}}/> : <img src="images/images/right-arrow.png" style={{width:"10px",height:"10px"}}/>}
        </ListItem>
        <Collapse in={shipmentOpen} timeout="auto" unmountOnExit style={{padding:"7px  34px"}}>
          <List component="div" disablePadding >
            <Link href="/deliveries">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Deliveries" />
              </ListItem>
            </Link>
            <Link href="/pickup">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Pickups" />
              </ListItem>
            </Link>
            <Link href="/tracking">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Multi-track" />
              </ListItem>
            </Link>
            <Link href="/upload-booking">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Bulk Import" />
              </ListItem>
            </Link>
            <Link href="/return-requests">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Return Requests" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <ListItem button onClick={handleSettlementClick} style={{padding: "15px 32px"}}>
          <ListItemIcon >
            {/* <AssessmentIcon /> */}
            <div className="w-6 "><img src="images/images/add-1.png"/></div>
          </ListItemIcon>
          <ListItemText primary="Settlement" />
          {settlementOpen ? <img src="images/images/down-arrow.svg" style={{width:"10px",height:"10px"}}/> : <img src="images/images/right-arrow.png" style={{width:"10px",height:"10px"}}/>}
          {/* {settlementOpen ? <ExpandLess /> : <ExpandMore />} */}
        </ListItem>
        <Collapse in={settlementOpen} timeout="auto" unmountOnExit style={{padding:"7px  34px"}}>
          <List component="div" disablePadding>
            <Link href="/statements">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Statements" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <ListItem button onClick={handleSupportClick} style={{padding: "15px 32px"}}>
          <ListItemIcon>
            {/* <ContactSupportIcon /> */}
            <div className="w-6 "><img src="images/images/help.png"/></div>
          </ListItemIcon>
          <ListItemText primary="Support" />
          {supportOpen ? <img src="images/images/down-arrow.svg" style={{width:"10px",height:"10px"}}/> : <img src="images/images/right-arrow.png" style={{width:"10px",height:"10px"}}/>}
        </ListItem>
        <Collapse in={supportOpen} timeout="auto" unmountOnExit style={{padding:"7px  34px"}}>
          <List component="div" disablePadding>
            <Link href="/developer-center">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Developer Center" />
              </ListItem>
            </Link>
            <Link href="/faqs">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Knowledge Base" />
              </ListItem>
            </Link>
            <Link href="/guides">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Video Guides" />
              </ListItem>
            </Link>
            <Link href="/release-notes">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Release Notes" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <ListItem button onClick={handleAccountClick} style={{padding: "15px 32px"}}>
          <ListItemIcon>
            {/* <AddToPhotosIcon /> */}
            <div className="w-6 "><img src="images/images/bars-2.png"/></div>
          </ListItemIcon>
          <ListItemText primary="Account" />
          {accountOpen ? <img src="images/images/down-arrow.svg" style={{width:"10px",height:"10px"}}/> : <img src="images/images/right-arrow.png" style={{width:"10px",height:"10px"}}/>}
          {/* {accountOpen ? <ExpandLess /> : <ExpandMore />} */}
        </ListItem>
        <Collapse in={accountOpen} timeout="auto" unmountOnExit style={{padding:"7px  34px"}}>
          <List component="div" disablePadding>
            <Link href="/profile">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Profile" />
              </ListItem>
            </Link>
            <Link href="/services">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Services" />
              </ListItem>
            </Link>
            {/* <Link href="/manage-users">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Manage Users" />
              </ListItem>
            </Link> */}
            <Link href="/pickup-locations">
              <ListItem button>
                <ListItemText primary="&nbsp;&nbsp;&#x26AC;&nbsp;&nbsp;&nbsp;&nbsp; Pickup Locations" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
      
      <List style={{padding:"4px  34px", color: "#aeafc2" ,top:"130px" ,bottom:"0" ,position:"relative"}}>
        <Link href="/" >
          <ListItem button onClick={logout}>
              {/* <ExitToAppIcon/> */}
              <img src="images/images/logout-1.png" style={{width:"19px",height:"19px",marginRight:"12px"}}/>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </List>
      
    </>
  );
};

export default SidebarInner;
