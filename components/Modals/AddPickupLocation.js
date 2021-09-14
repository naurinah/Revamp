import { useEffect, useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fetchCities from "../../functions/fetchCities";
import calculateFare from "../../functions/calculateFare";
import { useStateValue } from "../../context/StateProvider";
import useCountries from "../../hooks/useCountries";
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@material-ui/core";
import useCities from "../../hooks/useCities";
import createShipment from "../../functions/createShipment";




export default function AddPickupLocation({ show, onHide }) {
  const [showAlert, setShowAlert] = useState(false);
  const [cities, setCities] = useState(null);
  const [serviceCode, setServiceCode] = useState("BE");
  const [originCity, setOriginCity] = useState("KHI");
  const [destinationCountry, setDestinationCountry] = useState("PK");
  const [destinationCity, setDestinationCity] = useState("KHI");
  const [{ acno, b_usrId }, dispatch] = useStateValue();
  const [rate, setRate] = useState("0.0");
  const [pickName, setPickName] = useState("");
  const [pickAdd, setPickAdd] = useState("");
  const [pickCont, setPickCont] = useState("");
  const [pickMail, setPickMail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("PK");
  const country = useCountries();
  const [destCity, setDestCity] = useState("KHI");
  const city = useCities(selectedCountry);
  const [origCity, setOrigCity] = useState("KHI");


  useEffect(async () => {
    setCities(await fetchCities("PK"));
  }, []);

  // prevent submitting invalid or empty emails
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (name, contact,email,origincity,location,acno) => {
    const url = "http://portal.blue-ex.com/api1/customerportal/pickuplocation.py";
    const data = await fetch(
      `${url}?request={"name":"${PickupName}","contact":"${PickupContact},"email":"${PickupEmail},"origincity":"${pickupOriginCity},"location":"${PickupLocation},"acno":"${acno}"}`
    );
    const response = await data.json();
    return response;

    console.log(res);

    // if (res.stat === "save") {
    //   MySwal.fire({
    //     icon: "success",
    //     title: "SUCCESS:",
    //     text: `Your CN ${res.cnno} has been created successfully.`,
    //     showCancelButton: true,
    //     confirmButtonText: "Print CN",
    //     cancelButtonText: "Ok Create Another",
    //   }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {
    //     }
    //     if (result.isCanceled) {
    //     }
    //   });
    // } else {
    //   MySwal.fire({
    //     icon: "error",
    //     title: "ERROR:",
    //     text: `Please try Again`,
    //     confirmButtonText: "Try Again",
    //   }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {
    //     }
    //   });
    // }

  };

  

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="flex ">Add Pickup Location</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="">
          <Alert
            show={showAlert}
            variant="success"
            onClose={() => setShowAlert(false)}
            className="w-full"
            dismissible
          ></Alert>
            <div>
            <CardContent className="">
                  <div className="row">
                    <label className="label" htmlFor="NAME">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <div className="flex-1 w-full">
                      <input
                        className={`shipmentInput  ${
                          errors.NAME ? "validate" : "nonValid"
                        } `}
                        {...register("NAME", { 
                        required: true })}
                        type="text"
                        id="fullName"
                        placeholder="Enter your Full Name"
                      />
                      {errors.NAME && (
                        <div className="text-red-600 text-xs">
                          This field is required.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <label className="label" htmlFor="address">
                      Address <span className="text-red-600">*</span>
                    </label>
                    <div className="flex-1 w-full">
                      <input
                        className={`shipmentInput ${
                          errors.Add ? "validate" : "nonValid"
                        } `}
                        {...register("Add", { required: true })}
                        type="text"
                        id="address"
                        placeholder="Enter your Address"
                      />
                      {errors.Add && (
                        <div className="text-red-600 text-xs">
                          This field is required.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className={`shipmentInput ${
                        errors.Mail ? "validate" : "nonValid"
                      } `}
                      {...register("Mail")}
                      type="text"
                      id="email"
                      placeholder="Enter your Email"
                    />
                     {errors.Mail && (
                        <div className="text-red-600 text-xs">
                          This field is required.
                        </div>
                      )}
                  </div>
                  <div className="row">
                    <label className="label" htmlFor="phone">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <div className="flex-1 w-full">
                      <input
                        className={`shipmentInput ${
                          errors.Cont ? "validate" : "nonValid"
                        } `}
                        {...register("Cont", { required: true })}
                        type="text"
                        id="phone"
                        placeholder="Enter your Phone"
                      />
                      {errors.Cont && (
                        <div className="text-red-600 text-xs">
                          This field is required.
                        </div>
                      )}
                    </div>
                  </div>
                
                  <div className="row">
                    <label className="label" htmlFor="city">
                      Destination City <span className="text-red-600">*</span>
                    </label>
                    <select
                      className="shipmentInput nonValid"
                      value={destCity}
                      onChange={(e) => setDestCity(e.target.value)}
                      name="city"
                      id="city"
                    >
                      {city &&
                        city.map((c) => (
                          <option key={c.CITY_CODE} value={c.CITY_CODE}>
                            {c.CITY_NAME}
                          </option>
                        ))}
                    </select>
                  </div>
                
                </CardContent>
            <div className="col-sm-6 text-right">        
                        <button id="AddPickupLocation" class="btn btn-sm btn-primary" 
                        onClick={() => {
                            setShowAlert(false);
                          }}
                        >Add Pickup Location</button>
                        <AddPickupLocation
                          show={showAlert}
                          onHide={() => setShowAlert(false)}
                        />
                    </div>
                  
            </div>
        </Modal.Body>
      </form>
    </Modal>
  );
}
