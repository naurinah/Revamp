import { Card, CardContent } from "@material-ui/core";
import { useEffect, useState, useRef } from "react";
import { useStateValue } from "../context/StateProvider";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import fetchShipmentTrend from "../functions/fetchShipmentTrend";
import CurrencyFormat from "react-currency-format";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { CircularProgress } from "@material-ui/core";
import Example from "./Chart/LineChart";
import useVisible from "../hooks/useVisible";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Link from "next/link";

const ShipmentTrend = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ acno }, dispatch] = useStateValue();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [dateView, setDateView] = useState(false);
  const [elements, setElements] = useState([]);
  const [cod, setCod] = useState(0);
  const [shipments, setShipments] = useState(0);
  const [charges, setCharges] = useState(0);
  const [settle, setSettle] = useState(0);

  const fetchGraph = async () => {
    const res = await fetchShipmentTrend(acno, startDate, endDate);
    setData(res);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchGraph();
  }, [startDate, endDate]);

  useEffect(() => {
    let temp = [];
    if (data !== undefined && data !== null) {
      setCod(data.codamount);
      setCharges(data.blueexcharges);
      setSettle(data.net);
      setShipments(data.totalshipment);
      data.detail.forEach((d) => {
        temp.push({
          name: d.y,
          Shipments: +d.a,
          amt: +d.a,
        });
      });
      setElements(temp);
    }
  }, [data]);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  useEffect(() => {
    let stYear = state[0].startDate.getFullYear();
    let stMonth = state[0].startDate.getMonth() + 1;
    if (stMonth < 10) stMonth = "0" + stMonth;
    let stDate = state[0].startDate.getDate();
    if (stDate < 10) stDate = "0" + stDate;
    setStartDate(`${stDate}/${stMonth}/${stYear}`);

    let enYear = state[0].endDate.getFullYear();
    let enMonth = state[0].endDate.getMonth() + 1;
    if (enMonth < 10) enMonth = "0" + enMonth;
    let enDate = state[0].endDate.getDate();
    if (enDate < 10) enDate = "0" + enDate;
    setEndDate(`${enDate}/${enMonth}/${enYear}`);

    let mon = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    setSelectedDate(
      `${mon[state[0].startDate.getMonth()]} ${stDate} - ${
        mon[state[0].endDate.getMonth()]
      } ${enDate}`
    );
  }, [state]);

  const ref = useRef();

  useVisible(ref, () => {
    setDateView(false);
  });

  return (
    <div className="flex-1 relative">
      <Card variant="outlined">
        <CardContent className="border-b p-4 flex items-center justify-between ">
          <h2 className="h2">Shipment Trend</h2>
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center space-x-4"
              ref={ref}
              onClick={() => setDateView(!dateView)}
            >
              <span className="text-[#0047ba] hidden sm:block">
                {selectedDate && selectedDate}
              </span>
              <button className="dateBtn">
                <KeyboardArrowDownIcon />
              </button>
            </div>
            <Link href="/deliveries">
              <button className="bg-white border border-gray-300 rounded-full py-2 px-4 text-[#0047ba] flex justify-center items-center hover:bg-[#ebedf2]">
                <span style={{paddingRight:"5px"}}>View</span> <img src="images/images/right-arrow.png" style={{width:"10px",height:"10px" }} />
                 {/* <ArrowForwardIosIcon fontSize="small" color="blue" /> */}
              </button>
            </Link>
          </div>
        </CardContent>
        <CardContent
          className="border-b flex flex-col md:flex-row text-[#9699a2]"
          style={{ padding: "0" }}
        >
          <div className="border-b md:border-b-0 md:border-r flex-1 py-[1.1rem] px-[2.2rem]">
            <p className="font-light">Shipments</p>
            <h3 className="font-medium text-[#6f727d] text-xl">
              <CurrencyFormat
                renderText={(value) => <>{value}</>}
                value={shipments}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
              />
            </h3>
          </div>
          <div className="border-b md:border-b-0 md:border-r flex-1 py-[1.1rem] px-[2.2rem]">
            <p className="font-light">COD</p>
            <h3 className="font-medium text-[#6f727d] text-xl">
              <CurrencyFormat
                renderText={(value) => <>{value}</>}
                value={cod}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"PKR "}
              />
            </h3>
          </div>
          <div className="border-b md:border-b-0 md:border-r flex-1 py-[1.1rem] px-[2.2rem]">
            <p className="font-light">Service Charges</p>
            <h3 className="font-medium text-[#6f727d] text-xl">
              <CurrencyFormat
                renderText={(value) => <>{value}</>}
                value={charges}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"PKR "}
              />
            </h3>
          </div>
          <div className="flex-1 py-[1.1rem] px-[2.2rem]">
            <p className="font-light">Amount Settle</p>
            <h3 className="font-medium text-[#6f727d] text-xl">
              <CurrencyFormat
                renderText={(value) => <>{value}</>}
                value={settle}
                displayType={"text"}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"PKR "}
              />
            </h3>
          </div>
        </CardContent>
        <CardContent>
          <div className="w-full h-[20rem]">
            {elements !== [] && <Example elements={elements} />}
          </div>
        </CardContent>
      </Card>
      {dateView && (
        <DateRangePicker
          className="absolute top-16 right-0 z-10 shadow-md"
          // ref={ref}
          onChange={(item) => {
            setState([item.selection]);
          }}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
        />
      )}
    </div>
  );
};

export default ShipmentTrend;
