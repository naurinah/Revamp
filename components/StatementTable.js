import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Alert from "@material-ui/lab/Alert";
import { CSVLink } from "react-csv";
import CurrencyFormat from "react-currency-format";
import { ExportXls } from "./ExportXls";
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Component } from "react";
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableFooter from '@material-ui/core/TableFooter';
import MuiTablePagination from '@material-ui/core/TablePagination';
// import JumpToPage from './JumpToPage';


function createData(
  ref, 
  date, 
  period, 
  cod, 
  print
  ){
  return {
  ref, 
  date, 
  period, 
  cod, 
  print 
};
}

const columns = ["Ref. No", "Date", "Period", "COD","Print Statement"];

const headCells = [
  { 
    id: "ref",
    label: "Ref. No",
     key: "ref" 
  },
  { 
    id: "date",
    label: "Date",
     key: "date"
  },
  { id: "period",
   label: "Period",
    key: "period", 
    format: (value) => value.toLocaleString("en-US"),
  },
  { 
    id: "cod",
   label: "COD",
    key: "cod" 
  },
  { 
    id: "print",
    label: "Print Statement",
     minWidth: 170,
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        backgroundColor: "#FF0000",
      },
    },
    MUIDataTablePagination: {
      root: {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
  },
  tableCellContainer: {
    padding: '0px 24px 0px 24px',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toolbar: {},
  selectRoot: {},
  '@media screen and (max-width: 400px)': {
    toolbar: {
      '& span:nth-child(2)': {
        display: 'none',
      },
    },
  },
  selectRoot: {
    marginRight: '8px',
  },
 
});


const dateChanger = (date) => {
  let d = date.split("-");
 
  var month = [
    "0", "Jan",  "Feb", "Mar", "Apr", "May",  "Jun","Jul",  "Aug","Sep","Oct","Nov","Dec", ];
  return `${d[0]}-${month[+d[1]]}`;
};

const dateFormat = (date) => {
  let d = date.split("-");
  var month = ["0","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug", "Sep","Oct", "Nov","Dec", ];
  return `${d[0]}-${month[+d[1]]}-${d[2]}`;
};

let csvData = [];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
return (
  <TableHead className="bg-[#f5f5fd]">
    <TableRow>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.numeric ? "right" : "left"}
          padding={headCell.disablePadding ? "none" : "default"}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,

  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function StatementTable() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [{ acno, b_usrId }, dispatch] = useStateValue();
  const [data, setData] = useState(null);
  const [originalRows, setOriginalRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copyText, setCopyText] = useState("");
  const [settlementTable, setApis] = React.useState(null);
  const [rows, setRows] = useState(originalRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState("");
  const requestSearch = (searchedVal) => {
  const filteredRows = originalRows.filter((row) => {return row.ref.toLowerCase().includes(searchedVal.toLowerCase());});setRows(filteredRows);};
  const cancelSearch = () => {setSearched("");requestSearch(searched);};
  const handleChangePage = (event, newPage) => {setPage(newPage);};
  const handleChangeRowsPerPage = (event) => {setRowsPerPage(+event.target.value);setPage(0); };
  const nextPage = () => setPage(prev => prev+1) //next page
  const prevPage = () => setPage(prev => prev > 0 ? prev-1 : prev) 

  const settlement = async () => {
    const response = await fetch(
      `http://benefitx.blue-ex.com/api/customerportal/statement.php?`
    ).then((res) => res.json());
      fetch(url)
  };

    const options = {
      filterType: "checkbox",
      rowsPerPage: [25],
      rowsPerPageOptions: [25,50,75,100],
      jumpToPage: true,
      textLabels: {
        pagination: {
          nextPageText: '>',
          lastPageText: '>>',
          firstPageText: '<<',
          prePageText: '<',
          rowsPerPage: "Total items Per Page",
          displayRows: "OF",
        },
      },
      onChangePage(currentPage) {
        console.log({ currentPage });
      },
      onChangeRowsPerPage(numberOfRows) {
        console.log({ numberOfRows });
      },
    };
    useEffect(() => {setRows(originalRows); }, [originalRows]);
    useEffect(() => { if (copied) { setTimeout(() => {setCopied(false);}, 2000);}}, [copied]);
    useEffect(() => { if (data !== null) {

    let newRows = [];
    let cp = `Ref.No\tDate\t\tPeriod\t\t\tCOD\n`;

    data.map((d) => {
        let ro = createData( d.FPS_CODE,dateFormat(d.DATE), dateChanger(d.SDATE) + " to " + dateChanger(d.EDATE),
              <CurrencyFormat  renderText={(value) => <>{value}</>}value={d.CODAMOUNT} displayType={"text"} thousandSeparator={true}decimalScale={2} prefix={"PKR "}/>,
              <div key={d.FPS_CODE} className="flex gap-2">
                <form method="post"  action={`http://benefitx.blue-ex.com/fnsum-cusprn.php`} target="_blank" >
                  <input type="hidden" name="FPS_CODE" value={d.FPS_CODE} />
                  <input type="hidden" name="usrid" value={b_usrId} />
                  <input type="hidden" name="password" value={localStorage.getItem("password")} />
                  <button type="submit"><img src="/icons/acrobat.svg" width="16px" /> </button>
                </form>
                <form method="post"  action={`http://benefitx.blue-ex.com/fortnight.php`} target="_blank" >
                  <input type="hidden" name="fps_code" value={d.FPS_CODE} />
                  <input type="hidden" name="usrid" value={b_usrId} />
                  <input type="hidden" name="password" value={localStorage.getItem("password")}/>
                  <button type="submit"><img src="/icons/file.svg" width="16px" /></button>
                </form>
              </div>
            );
            newRows.push(ro);
            cp += `${d.FPS_CODE}\t${dateFormat(d.DATE)}\t${dateChanger( d.SDATE)} to ${dateChanger(d.EDATE)}\tPKR ${d.CODAMOUNT}\n`;
            csvData.push({ref: d.FPS_CODE, date: dateFormat(d.DATE),period: `${dateChanger(d.SDATE)} to ${dateChanger(d.EDATE)}`,cod: `PKR ${d.CODAMOUNT}`, });  });
          setOriginalRows(newRows);
          setCopyText(cp);
          setIsLoading(false);
        }
      }, [data]);

      // useEffect(async () => {
      //   if (reload) {
      //     setIsLoading(true);
      //     await settlement();
      //     setIsLoading(false);
      //     setReload(false);
      //   }
      // }, [reload]);

      useEffect(() => {
        if (settlementTable) {
          setOriginalRows([]);
          let newRows = [];
          settlementTable.map((a) => {
            newRows.push(
              createData(
                a["ref"],
                a["date"],
                a["period"],
                a["cod"],
                a["print"],
               
              )
            );
          });
          setRows(newRows);
          setOriginalRows(newRows);
          setIsLoading(false);
        }
      }, [settlementTable]);

    //  useEffect(async () => {
    //     await settlement();
    //   }, []);

  return (
    <Paper elevation={0} className={classes.root}>
      {copied && <Alert severity="success">Table Copied to clipboard</Alert>}
      
      <MuiThemeProvider >
          <MUIDataTable
            data={headCells}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
   
    </Paper>
  );
}
