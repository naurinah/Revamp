import { Card, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import CurrencyFormat from "react-currency-format";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import useSWR from "swr";

const SettlementHistory = () => {
  const [{ acno }, dispatch] = useStateValue();

  const dateChanger = (date = null) => {
    var month = [
      "0",
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
    if (date !== null) {
      let d = date.split("-");
      return `${d[0]}-${month[+d[1]]}`;
    }
    return null;
  };

  const url = `http://benefitx.blue-ex.com/api/customerportal/statement.php?acno=${acno}&hashkey=KaPdSgVkYp3s6v9y`;
  const getData = async () => {
    const response = await fetch(url);
    return await response.json();
  };
  const { data, error } = useSWR(url, getData);

  function OpenWindowWithPost(url, name, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", name);
    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    if (name == '_blank') {} else {
        window.open("post.htm", name);
    }
    form.submit();
    document.body.removeChild(form);
}

  function statementView( FPS){
    var FPSCODE =  FPS;
    console.log(FPSCODE);
    var param = {'FPS_CODE' : FPSCODE}
    OpenWindowWithPost('http://benefitx.blue-ex.com/fnsum-cusprn.php', '_blank', param);
 
}

  return (
    <Card variant="outlined" className="xl:min-w-[25rem]">
      <CardContent className="border-b p-4">
        <h2 className="h2">Settlement History</h2>
      </CardContent>
      <CardContent className="border-b p-4">
        <div className="">
          <div className="">
            <h3 className="h2">Last Statement for the period</h3>
            {data && (
              <>
                <p className="font-light">
                  of {dateChanger(data[0]?.SDATE)} to{" "}
                  {dateChanger(data[0]?.EDATE)}
                </p>
                <div className="text-3xl font-semibold text-[#0047ba] mt-2">
                  <CurrencyFormat
                    renderText={(value) => <>{value}</>}
                    value={data[0]?.CODAMOUNT}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={2}
                    prefix={"Rs. "}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <div className="overflow-auto h-[47.5rem]">
        <CardContent>
          <Timeline align="right" className="timeline">
            {data &&
              data.map((d) => (
                <TimelineItem key={d.FPS_CODE}>
                  <TimelineOppositeContent>
                   
                    <div className="text-[#0047ba] cursor-pointer text-md font-semibold" onClick={() => {(statementView(d.FPS_CODE)); }} >
                      <CurrencyFormat
                        renderText={(value) => <>{value}</>}
                        value={d.CODAMOUNT}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={2}
                        prefix={"Rs. "}
                      />
                    </div>
                  </TimelineOppositeContent>
                  
                  <TimelineSeparator>
                    <TimelineDot variant="outlined" color="primary" style={{marginTop:"0px",marginBottom:"0px"}} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent className="">
                    <div className="text-sm ">
                      {dateChanger(d.SDATE)} to {dateChanger(d.EDATE)}
                    </div>
                  </TimelineContent>
                </TimelineItem>
              ))}
          </Timeline>
        </CardContent>
      </div>
    </Card>
  );
};

export default SettlementHistory;
