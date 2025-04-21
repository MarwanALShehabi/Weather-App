import logo from "./logo.svg";
import "./App.css";
import Test from "./Test";
import { createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {useEffect , useState} from 'react';

import { useTranslation } from "react-i18next";
import axios from 'axios';
import moment from "moment/moment";
import "moment/min/locales";
import { useSelector, useDispatch } from "react-redux";
import { chngeResult } from "./weatherApiSlice";
import { fetchWeather } from "./weatherApiSlice";

moment.locale("ar");





const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

let cancelAxios = null



function App() {

  const dispatch = useDispatch()


  const isLoading = useSelector((state)=>{
    return state.weather.isLoading
  })

  const temp = useSelector((state)=>{
    return state.weather.weather
  })

  
  const { t, i18n } = useTranslation();
  const [dateAndTime , setDAteAndTime]=useState("")
  const [locale , setLocale]=useState("ar")
  const direction = locale ==  "ar" ? "rtl" : "ltr"
  
  function handlangegclick(){
    if(locale == "en"){
      setLocale("ar")
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }else{
      setLocale("en")
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDAteAndTime(moment().format("Do / MMMM /  YYYY"));
  }


  useEffect(()=>{

    dispatch(fetchWeather())

    dispatch(chngeResult())

    i18n.changeLanguage(locale)

    setDAteAndTime(moment().format('Do / MMMM /  YYYY'))
  },[])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* card */}

            <div
              dir={direction}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "wheat",
                padding: "20px",
                borderRadius: "30px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* content */}

              <div>
                {/* city and time */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "end",
                  }}
                  dir={direction}
                >
                  <Typography variant="h1" style={{ marginRight: "20px" }}>
                    {t("Aleppo")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {dateAndTime}
                  </Typography>
                </div>

                {/*=== city and time==== */}

                <hr />

                {/* digree and icon */}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* digree and discrebtion */}
                  <div>
                    {/* temp */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isLoading ?<CircularProgress style={{color:"wheat"}}/> : '' }
                      
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      <img src={temp.icon} />
                    </div>
                    {/* ===temp=== */}
                    <Typography variant="h6">{t(temp.discription)}</Typography>
                    {/* min && hight */}
                    <div style={{ display: "flex" }}>
                      <h5>
                        {t("Min")} : {temp.min}
                      </h5>
                      <h5 style={{ margin: "20px" }}>|</h5>
                      <h5>
                        {t("Max")} : {temp.max}
                      </h5>
                    </div>
                    {/* ====min && hight==== */}

                    {/* ===digree and discrebtion==== */}
                  </div>

                  <CloudIcon style={{ fontSize: "200px", color: "wheat" }} />
                </div>
                {/* ======digree and icon =======*/}
              </div>

              {/* ===== content===== */}
            </div>

            <div
              dir={direction}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              <Button
                style={{ color: "wheat" }}
                variant="text"
                onClick={handlangegclick}
              >
                {locale == "en" ? "ARABIC" : "انجليزي"}
              </Button>
            </div>
            {/*====== card ======= */}
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
