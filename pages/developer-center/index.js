import { Card, CardContent } from "@material-ui/core";
import Layout from "../../components/Layout";
import Head from "next/head";
import { parseCookies } from "../../helpers/";
import { useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";
import Link from "next/link";

const DeveloperCenter = ({ data }) => {
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

  return (
    <Layout>
      <Head>
        <title>
          blueEX Booking App - The one stop shop to access all blueEX services
        </title>
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <div className="m-subheader ">
      <h1 className="heading d-flex align-items-center">Developer Center</h1>
        <div >
          <div className="row">
              <div className="col-xl-12 col-lg-12">
              <Card variant="outlined" >
            <CardContent className=" border-b p-4 flex items-center justify-between ">
              <div className="">
                <div className="m-portlet__head">
                  <div className="m-portlet__head-caption">
                    <div className="m-portlet__head-title">
                      <h2 className="m-portlet__head-text">API Detail</h2>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
              <CardContent className=" m-portlet__body p-4 flex flex-wrap gap-6">
                <div className="developersupportapp">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="appBox">
                        <Link href="/developer-center/open-api-xml">
                        <div className="flex-1 cursor-pointer flex justify-center items-center shadow-md h-[7rem] min-w-[15rem]">
                          <img src="/images/openapixml.png" alt="" />
                        </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="appBox">
                        <Link href="/developer-center/open-api-json">
                        <div className="flex-1 cursor-pointer flex justify-center items-center shadow-md h-[7rem] min-w-[15rem]">
                          <img src="/images/openapijson.png" alt="" />
                        </div>
                      </Link>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="appBox">
                        <Link href="/developer-center/webx">
                          <div className="flex-1 cursor-pointer flex justify-center items-center shadow-md h-[7rem] min-w-[15rem]">
                              <img src="/images/webx.png" alt="" />
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="appBox">
                        <div href="/" className="flex-1 flex justify-center items-center h-[7rem] min-w-[15rem]" >
                          <img
                            src="/images/fishry.png"
                            style={{ filter: "grayscale(100%)", opacity: "0.4" }}
                            alt=""
                          />
                      </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="appBox">
                      <Link href="/developer-center/magento">
                        <div className="flex-1 cursor-pointer flex justify-center items-center shadow-md h-[7rem] min-w-[15rem]">
                          <img src="/images/magento.png" alt="" />
                        </div>
                      </Link>
                      </div>
                    </div>
                    {/* <div className="col-md-4">
                      <div className="appBox">
                      <Link href="/developer-center/woocommerce">
                        <div className="flex-1 cursor-pointer flex justify-center items-center shadow-md h-[7rem] min-w-[15rem]">
                          <img src="/images/woocommerce.png" alt="" />
                        </div>
                      </Link>
                      </div>
                    </div> */}
                    <div className="col-md-4">
                      <div className="appBox">
                      <Link href="/developer-center/woocommerce">
                        <div className="flex-1 cursor-pointer flex justify-center items-center shadow-md h-[7rem] min-w-[15rem]">
                          <img src="/images/woocommerce.png" alt="" />
                        </div>
                      </Link>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="appBox">
                      <div href="/" className="flex-1 flex justify-center items-center  h-[7rem] min-w-[15rem]">
                        <img
                          src="/images/prestashop.png"
                          style={{ filter: "grayscale(100%)", opacity: "0.4" }}
                          alt=""
                        />
                      </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="appBox ">
                      <div className="flex-1 cursor-pointer flex justify-center items-center  h-[7rem] min-w-[15rem]"><a  href="https://blueex-orders-push.herokuapp.com/" >
                        <img
                          src="/images/shopify.png"
                          style={{   }}
                          alt=""
                        />
                        </a>
                      </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="appBox">
                      <div  href="/"  className="flex-1 cursor-pointer flex justify-center items-center  h-[7rem] min-w-[15rem]">
                        <img
                          src="/images/chatbot.png"
                          style={{ filter: "grayscale(100%)", opacity: "0.4" }}
                          alt=""
                        />
                      </div>
                      </div>
                    </div>
                    </div>
                  </div>
              
              </CardContent>  
            </Card>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeveloperCenter;

DeveloperCenter.getInitialProps = async ({ req, res }) => {
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
