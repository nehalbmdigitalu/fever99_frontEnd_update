import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../../assets/img/Logo_Hospital.png";
import doctorPlus from "../../../assets/img/doctorplus.png";
import "./style.scss";
const PDFGenerator = () => {
  const [content, setContent] = useState("okey");
  return (
    <div>
      <PDFViewer width="100%" height="700">
        <Document>
          <Page size="A4">
            <View style={styles.header}>
              <Image src={logo} style={styles.logo} />
              <Image src={doctorPlus} style={styles.logo1} />
              <div style={styles.logo2}>
                <Text>Dr.Lokesh Kumar Garg</Text>
                <Text>(MBBS,DTCD,PGDS)</Text>
                <Text style={{ fontSize: "12px" }}>Consultation Fee : 150</Text>
                <Text style={{ fontSize: "10px" }}>Reg. No : 10232</Text>
              </div>
            </View>
            <View style={styles.leftSide}>
              <Text>Avaliable Spacility</Text>
              <ul style={styles.listStyle}>
                <Text>Cancer Surgeon</Text>
                <Text>Hysteroscopic surgeon</Text>
                <Text>Medicine Specialist</Text>
                <Text>Gastroenterology</Text>
                <Text>Skin</Text>
                <Text>Gynecologist</Text>
                <Text>Pediatrician</Text>
                <Text>Neurology</Text>
                <Text>Orthopedics</Text>
                <Text>General Physician</Text>
                <Text>Cardiology</Text>
                <Text>ENT</Text>
                <Text>Onco</Text>
                <Text>Nephrology</Text>
                <Text>Urology</Text>
                <Text>Ortho</Text>
                <Text>Diabetologist</Text>
                <Text>Endocrinology</Text>
                <Text>Ophthalmologist</Text>
                <Text>Rheumatologist</Text>
                <Text>Psychiatrist</Text>
                <Text>Dentist</Text>
                <Text>TB & Chest</Text>
                <Text>Day Care Service</Text>
                <Text>deepika's demo account</Text>
              </ul>
            </View>
            <View style={styles.right}>
              <View style={styles.nameAge}>
                <Text>Pasent Name</Text>
                <Text>Age | gender</Text>
              </View>
            </View>
            <View style={styles.rightDate}>
              <Text>2023-06-13 09:00:32</Text>
            </View>
            <Text style={styles.border}></Text>
            <View style={styles.symptums}>
              <Text>Symptoms</Text>
              <Text>cough fever since 25 days</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

const styles = StyleSheet.create({
  nameAge: {},
  symptums: {
    position: "absolute",
    left: "40%",
    top: 142,
    height: 50
  },
  border: {
    position: 'absolute',
    right: 0,
    top: 140,
    width: '62%',
    borderBottom: 1,
    borderColor: 'gray',
    
  },
  rightDate: {
    position: "absolute",
    left: "70%",
    top: 90,
    height: 50
  },
  leftSide: {
    width: "38%",
    paddingLeft: 5,
    borderRight: 1,
    borderColor: "gray",
  },
  right: {
    position: "absolute",
    left: "40%",
    top: 90,
    height: 50,
  },
  listStyle: {
    listStyleType: "circle",
    fontSize: 12,
    lineHeight: 1.5,
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 20,
  },
  logo: {
    width: "33.33%",
    height: 80,
  },
  logo1: {
    width: 100,
    height: 80,
    position: "absolute",
    top: 0,
    left: "40%",
  },
  logo2: {
    width: "33.33%",
    height: 80,
    position: "absolute",
    left: "66%",
    top: 0,
    textAlign: "center",
    fontWeight: "bold",
  },
  header: {
    marginBottom: 10,
    paddingLeft: 5,
    backgroundColor: "#d8fcdd",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default PDFGenerator;
