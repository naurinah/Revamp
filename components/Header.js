import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ClearIcon from "@material-ui/icons/Clear";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Drawer } from "@material-ui/core";
import SidebarInner from "./SidebarInner";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import NotificationBox from "./NotificationBox/NotificationBox";
import ProfileBox from "./ProfileBox/ProfileBox";
import QuickActionBox from "./QuickActionsBox/QuickActionsBox";
import Tooltip from '@material-ui/core/Tooltip';
import useVisible from "../hooks/useVisible";

const Header = ({ show, setShow }) => {
  const [{ name }, dispatch] = useStateValue();
  const [state, setState] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const ref = useRef();

  useVisible(ref, () => {
    setShowProfile(false);
    setShowNotification(false);
    setShowQuick(false);
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex flex-row-reverse pt-2 pr-2">
        <img src="images/images/cancel.png" className="cursor-pointer"
          onClick={toggleDrawer(anchor, false)}/>
        {/* <ClearIcon /> */}
      </div>
      <SidebarInner />
    </div>
  );

  return (
    <header className="bg-white shadow-md py-[0.5rem] px-[2rem] fixed z-20 w-full">
      <div className="flex justify-between items-center h-11">
        <div className="flex items-center space-x-4">
          <div style={{display:"flex"}} onClick={toggleDrawer("left", true)}>
          <div class="hamburger">
          <div class="top-bun"></div>
          <div class="meat"></div>
          <div class="bottom-bun"></div>
        </div>

            {/* <MenuIcon  /> */}
          </div>
         <a href="/dashboard"><img src="/images/logoinner.svg" className="w-[120px] sm:w-[180px]" /></a>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-sm text-right hidden md:block">
            Do you need help? Please call us at: &nbsp;
            <span className="text-base text-[#0047ba] font-semibold block lg:inline-block ">
              021-111-BLUE-EX (021-111-258339)
            </span>
          </div>
           <div ref={ref} className="flex items-center justify-center place-content-evenlyspace-x-4">
             <Tooltip title="News & Logs">
                <div className="mr-8 w-6 cursor-pointer">
                  <img src="images/images/noti.png" onClick={() => {setShowNotification(!showNotification); setShowQuick(false); setShowProfile(false); }}/>
                </div>
              </Tooltip>
              <Tooltip title="Quick Actions">
              <div className="mr-8 w-6 cursor-pointer">
               <img src="images/images/share-2.png" onClick={() => {setShowNotification(false);  setShowQuick(!showQuick);setShowProfile(false);}}/>
              </div>
              </Tooltip>
              <Tooltip title="Profile">
              <div className="mr-8 w-6 cursor-pointer">
              <img src="images/images/profile-4.png"  onClick={() => {setShowNotification(false); setShowQuick(false); setShowProfile(!showProfile); }}/>
              </div>
              </Tooltip>
            <div className="hidden sm:block cursor-pointer">
              HELLO <span className="font-bold uppercase">{name} !</span>
            </div>
            {showNotification && <NotificationBox />}
            {showQuick && <QuickActionBox show={show} setShow={setShow} />}
            {showProfile && <ProfileBox />}
          </div>
        </div>
      </div>
      <Drawer
        anchor={"left"}
        open={state}
        onClose={toggleDrawer("left", false)}>
        {list("left")}
      </Drawer>
    </header>
  );
};

export default Header;
