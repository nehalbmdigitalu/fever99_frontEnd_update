import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { UpdatePrescription, getMedicineList } from "../dependiencies/action";
import AsyncSelect from "react-select/async";
import Select from "react-select";

function EditPrescription(props) {
  const { show, handleClose, rowData } = props;
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const [query, setQuery] = useState({page: 1, size: 10, filter:''})
  const [options, setOptions] = useState([])
  const [error, setError] = useState({});

  const [medicine, setMedicine] = useState(null);

  const validator = () => {
    let errors = {};
    if (!form.pastHistory) {
      errors = { ...errors, pastHistory: "This field is required!" };
    }
    if (!form.drugAllergy) {
      errors = { ...errors, drugAllergy: "This field is required!" };
    }
    
    setError(errors);

    return errors;
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    dispatch(getMedicineList(query)).then(res => {
      setOptions(res)
    })
  },[query])
  useEffect(() => {
    if (!isEmpty(rowData)) {
      setForm(rowData);
      setMedicine(rowData.medicine)
    }
  }, [rowData]);
  const handleUpdatePrescription = (e) => {
    e.preventDefault();
    let validate = validator();
  
    if (!isEmpty(validate)) {
      return false;
    }

    const { _id, expert, symptoms, diagnosis,  investigation, notes, pastHistory, surgicalHistory, personalHistory, drugAllergy } =
      form;

    dispatch(
      UpdatePrescription(rowData._id, {
        appointmentId: _id,
        patientId: expert,
        symptoms,
        diagnosis,
        medicine,
        investigation,
        notes,
        pastHistory,
        surgicalHistory,
        personalHistory,
        drugAllergy,
        
      })
    ).then((res) => {
      if (res.status) {
        setForm({});
        handleClose(false);
      }
    });
  };

  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    console.log(inputValue)
    setQuery({...query, filter: inputValue})
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  const handleMedicineNoteChange = (index, e) => {
    
    const { name, value } = e.target;
  
    const updatedMedicine = [...medicine];
  
    updatedMedicine[index] = {
      ...updatedMedicine[index],
      [name]: value,
    };
  
    setMedicine(updatedMedicine);
  };

  const handleMedicineChange = (index, name, e) => {
    
    const { value } = e;
  
    const updatedMedicine = [...medicine];
  
    updatedMedicine[index] = {
      ...updatedMedicine[index],
      [name]: value,
    };
  
    setMedicine(updatedMedicine);
  };

  const handleDeleteMedicine = (index) => {
    // Create a copy of the current medicine array
    const updatedMedicine = [...medicine];

    // Remove the record at the specified index
    updatedMedicine.splice(index, 1);

    // Update the state with the modified medicine array
    setMedicine(updatedMedicine);
  };

  const handleAddMedicine = () => {
    const allFieldsFilled = medicine.every(record => {
      return (
        record.name !== '' &&
        record.time !== '' &&
        record.frequency !== '' &&
        record.duration !== ''
      );
    });

    if (!allFieldsFilled) {
      alert('Please fill in all required fields before adding a new record.');
      return;
    }

    const newRecord = {
      name: '',
      time: '',
      roa: "",
      frequency: '',
      duration: '',
      note: '',
      dose_form: "",
      duration_count:""
    };

    // Update the state by appending the new record
    setMedicine([...medicine, newRecord]);
  };

  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        onHide={() => handleClose(false)}
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>Write Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
          <div className="form-group">
              <label className="btn btn-default">
                Name: <b>{form.patientName}</b>
              </label>
              <label className="btn btn-default">
                Age: <b>{form.age}</b>
              </label>
              <label className="btn btn-default">
                Gender: <b>{form.gender}</b>
              </label>
              <label className="btn btn-default">
                BP: <b>{form.bp}</b>
              </label>
              <label className="btn btn-default">
                Temp: <b>{form.bodyTemperature}</b>
              </label>
              <label className="btn btn-default">
                SpO<sub>2</sub>: <b>{form.oxigne}</b>
              </label>
              <label className="btn btn-default">
                pulse: <b>{form.pulse}</b>
              </label>
              <label className="btn btn-default">
                FBS: <b>{form.suger1}</b>
              </label>
              <label className="btn btn-default">
                PPBS: <b>{form.suger2}</b>
              </label>
              <label className="btn btn-default">
                RBS: <b>{form.suger3}</b>
              </label>
              <label>
                RR: <b>{form.rr}</b>
              </label>
            </div>
            <hr />
            <div className="form-group col-md-4">
              <label>Symptoms</label>
              <input
                name="symptoms"
                className="form-control"
                type="text"
                value={form.symptoms}
                placeholder="Symptoms"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className="form-group col-md-4">
              <label>Diagnos</label>
              <input
                name="diagnosis"
                className="form-control"
                placeholder="Diagnos"
                value={form.diagnosis}
                type="text"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className="form-group col-md-4">
              <label>Prescription Date</label>
              <input
                readOnly
                value={new Date().toDateString()}
                className="form-control"
                type="text"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </div>
            
            <div className="form-group">
              <label>Drug Allergy</label>
              <textarea
                className="form-control"
                name="drugAllergy"
                value={form.drugAllergy}
                placeholder="Drug Allergy"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              ></textarea>
              {error && error.drugAllergy && (
                  <span className="text-danger">{error.drugAllergy}</span>
                )}
            </div>
            
            <div className="form-group">
              <label>Past History</label>
              <textarea
                className="form-control"
                name="pastHistory"
                value={form.pastHistory}
                placeholder="Past History"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              ></textarea>
              {error && error.pastHistory && (
                  <span className="text-danger">{error.pastHistory}</span>
                )}
            </div>
            
            <div className="form-group">
              <label>Personal History</label>
              <textarea
                className="form-control"
                name="personalHistory"
                value={form.personalHistory}
                placeholder="Personal History"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              ></textarea>
            </div>
            <div className="form-group">
              <label>Surgical History</label>
              <textarea
                className="form-control"
                name="surgicalHistory"
                value={form.surgicalHistory}
                placeholder="Surgical History"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              ></textarea>
            </div>
            <div className="form-group">
              {/* <textarea className="form-control" name="medicine" placeholder="Medicine" onChange={(e) => handleInputChange(e.target.name, e.target.value)}></textarea> */}
              {medicine && medicine.map((itm, index) => (
                <div
                  className="d-flex justify-content-between w-100"
                  key={index}
                >
                  <div style={{ width: "20%" }} className="mt-1">
                    {!index && <label>Medicine Name</label>}

                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadOptions}
                      defaultOptions
                      defaultValue={{ value: itm.name, label: itm.name }}
                      onChange={(e) => handleMedicineChange(index, 'name', e)}
                    />
                  </div>
                  <div style={{ width: "5%" }} className="mt-1">
                    {!index && <label>Dose</label>}
                    <input
                      name="note"
                      type="text"
                      value={itm.note}
                      className="form-control"
                      placeholder="Ex. 1 Tablet"
                      onChange={(e) => handleMedicineNoteChange(index, e)}
                    />
                  </div>
                  <div style={{ width: "10%" }} className="mt-1">
                    {!index && <label>Dose Form</label>}
                    <Select
                      options={[
                        { value: "Ml", label: "Ml" },
                        { value: "Mg", label: "Mg" },
                        { value: "Gm", label: "Gm" },
                        { value: "Tablet(s)", label: "Tablet(s)" },
                        { value: "Puff(s)", label: "Puff(s)" },
                        { value: "Units", label: "Units" },
                        { value: "As Prescribed", label: "As Prescribed" },
                        { value: "Capsul(s)", label: "Capsul(s)" },
                        { value: "Sachet(s)", label: "Sachet(s)" },
                        { value: "Teaspoon(s)", label: "Teaspoon(s)" },
                        { value: "International Unit(s)", label: "International Unit(s)" },
                        { value: "Spray(s)", label: "Spray(s)" },
                        { value: "Patch", label: "Patch" },
                        { value: "Injection", label: "Injection" },
                        { value: "Vial", label: "Vial" },
                        { value: "Ampoule", label: "Ampoule" },
                        { value: "Nebulizer", label: "Nebulizer" },
                      ]}
                      defaultValue={{ value: itm.dose_form, label: itm.dose_form }}
                      onChange={(e) => handleMedicineChange(index, "dose_form", e)}
                    />
                  </div>
                  <div style={{ width: "15%" }} className="mt-1">
                    {!index && <label>Time</label>}
                    <Select
                      defaultValue={{ value: itm.time, label: itm.time }}
                      options={[
                        { value: "Not Applicable", label: "Not Applicable" },
                        { value: "Before Food", label: "Before Food" },
                        { value: "After Food", label: "After Food" },
                        { value: "Empty Stomach", label: "Empty Stomach" },
                        { value: "At Bed Time", label: "At Bed Time" },
                      ]}
                      onChange={(e) => handleMedicineChange(index, 'time', e)}
                    />
                  </div>
                  <div style={{ width: "14%" }} className="mt-1">
                    {!index && <label>ROA</label>}
                    <Select
                      defaultValue={{ value: itm.roa, label: itm.roa }} 
                      options={[
                        { value: "Orally", label: "Orally" },
                        { value: "Oral Drops", label: "Oral Drops" },
                        { value: "Per Rectal", label: "Per Rectal" },
                        { value: "Subcutaneous", label: "Subcutaneous" },
                        { value: "Sublingual", label: "Sublingual" },
                        { value: "Ear Drops", label: "Ear Drops" },
                        { value: "Eye Drops", label: "Eye Drops" },
                        { value: "Eye Ointment", label: "Eye Ointment" },
                        { value: "Gargle", label: "Gargle" },
                        { value: "Inhalation", label: "Inhalation" },
                        { value: "Intramuscular", label: "Intramuscular" },
                        { value: "Intranasal Spray", label: "Intranasal Spray" },
                        { value: "Intravaginal", label: "Intravaginal" },
                        { value: "Intravenous", label: "Intravenous" },
                        { value: "Intra Articular", label: "Intra Articular" },
                        { value: "Local Application", label: "Local Application" },
                        { value: "Nasally", label: "Nasally" },
                      ]}
                      onChange={(e) => handleMedicineChange(index, "roa", e)}
                    />
                  </div>
                  <div style={{ width: "15%" }} className="mt-1">
                    {!index && <label>Frequency</label>}
                    <Select
                      defaultValue={{ value: itm.frequency, label: itm.frequency }}
                      options={[
                        { value: "Once a day", label: "Once a day" },
                        { value: "Twice a day", label: "Twice a day" },
                        { value: "Thrice a day", label: "Thrice a day" },
                        {
                          value: "Four times a day",
                          label: "Four times a day",
                        },
                        {
                          value: "Five times a day",
                          label: "Five times a day",
                        },
                        {
                          value: "Every Hour",
                          label: "Every Hour",
                        },
                        {
                          value: "Every two Hours",
                          label: "Every two Hours",
                        },
                        {
                          value: "Every Four Hours",
                          label: "Every Four Hours",
                        },
                        {
                          value: "Once a week",
                          label: "Once a week",
                        },
                        {
                          value: "Twice a week",
                          label: "Twice a week",
                        },
                        {
                          value: "Three time a week",
                          label: "Three time a week",
                        },
                        {
                          value: "Once in 15 days",
                          label: "Once in 15 days",
                        },
                        {
                          value: "STAT (Immediately)",
                          label: "STAT (Immediately)",
                        },
                        {
                          value: "Once a Month",
                          label: "Once a Month",
                        },
                        {
                          value: "As Needed (SOS)",
                          label: "As Needed (SOS)",
                        },
                        {
                          value: "Alternate day",
                          label: "Alternate day",
                        },
                      ]}
                      onChange={(e) => handleMedicineChange(index, 'frequency', e)}
                    />
                  </div>
                  <div style={{ width: "5%" }} className="mt-1">
                    {!index && <label>Duration</label>}
                    <input
                      name="duration_count"
                      type="text"
                      value={itm.duration_count}
                      className="form-control"
                      placeholder="Ex. 1"
                      onChange={(e) => handleMedicineNoteChange(index, e)}
                    />
                  </div>
                  <div style={{ width: "10%" }} className="mt-1">
                    {!index && <label></label>}
                    <Select
                      defaultValue={{ value: itm.duration, label: itm.duration }}
                      options={[
                        { value: "Day(s)", label: "Day(s)" },
                        { value: "Week(s)", label: "Week(s)" },
                        { value: "Month(s)", label: "Month(s)" },
                        { value: "Till Next Review", label: "Till Next Review" },
                      ]}
                      name="duration"
                      onChange={(e) => handleMedicineChange(index, 'duration', e)}
                    />
                  </div>
                  
                  <div style={index ? {marginTop: "11px"}: {marginTop: '33px'}}>
                    { index ? <i className="fa fa-trash text-danger" onClick={() => handleDeleteMedicine(index)}></i> : <i className="fa fa-plus text-success" onClick={() => handleAddMedicine()}></i>}
                  </div>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Investigation</label>
              <textarea
                className="form-control"
                name="investigation"
                value={form.investigation}
                placeholder="Investigation"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              ></textarea>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={form.notes}
                placeholder="Notes"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleUpdatePrescription(e)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPrescription;
