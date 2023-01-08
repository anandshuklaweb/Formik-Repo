import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

const panNumberSchema = Yup.string().matches(
  /^[A-Z]{5}\d{4}[A-Z]$/,
  "Invalid PAN number"
);

const mobileNumberSchema = Yup.string().matches(
  /^\d{10}$/,
  "Invalid mobile number"
);

const dobSchema = Yup.date().max(
  new Date(),
  "Date of birth must be in the past"
);

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required!"),
  email: Yup.string()
    .email("Invalid email")
    .required("This field is required!"),
  mobileNumber: mobileNumberSchema.required("This field is required!"),
  dob: dobSchema.required("This field is required!"),
  panNumber: panNumberSchema.required("This field is required!"),
  spouseName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required!"),
  spouseAge: Yup.number()
    .required("This field is required!")
    .positive()
    .integer(),
  fatherName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required!"),
  fatherAge: Yup.number()
    .required("This field is required!")
    .positive()
    .integer(),
  motherName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required!"),
  motherAge: Yup.number()
    .required("This field is required!")
    .positive()
    .integer(),
});

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [numChildren, setNumChildren] = useState(0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (values, { resetForm }) => {
    setFormData(values);
    resetForm(values);

    const modal = document.querySelector("#formDataModal");
    modal.classList.add("show"); // show modal
    modal.style.display = "block";
  };

  const childrenDecrement = () => {
    if (numChildren <= 0) {
      return;
    } else {
      setNumChildren(numChildren - 1);
    }
  };

  const childrenIncrement = () => {
    if (numChildren >= 4) {
      return;
    } else {
      setNumChildren(numChildren + 1);
    }
  };

  const handleCloseModal = () => {
    const modal = document.querySelector("#formDataModal");
    modal.classList.remove("show"); // hide modal
    modal.style.display = "none";
  };

  const childFields = [];
  for (let i = 0; i < numChildren; i++) {
    childFields.push(
      <div key={i} className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="spouseName" className="required">
              {`Child ${i + 1} Name`}
            </label>
            <Field
              type="text"
              name={`child${i}Name`}
              className="form-control"
              placeholder="Enter full name"
            />
            <ErrorMessage name={`child${i}Name`} component="div" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="spouseName" className="required">
              Age
            </label>
            <Field
              type="number"
              name={`child${i}Age`}
              className="form-control"
              placeholder="Enter Age"
            />
            <ErrorMessage name={`child${i}Age`} component="div" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="title">
          <h4>First things first!</h4>
          <p>Questions to know basic details</p>
        </div>
        <div className="row">
          <div className="col-md-8 form">
            <div className="card form-card">
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  mobileNumber: "",
                  dob: "",
                  panNumber: "",
                  child0Name: "",
                  child0Age: "",
                  child1Name: "",
                  child1Age: "",
                  child2Name: "",
                  child2Age: "",
                  child3Name: "",
                  child3Age: "",
                  spouseName: "",
                  spouseAge: "",
                  fatherName: "",
                  fatherAge: "",
                  motherName: "",
                  motherAge: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-steps">
                      {step > 1 && (
                        <span className="btn-step-back">
                          <span to="#" onClick={prevStep}>
                            Back to {step - 1}
                          </span>
                        </span>
                      )}

                      <span className="step-top">{step}</span>
                      {step < 2 && (
                        <span to="#" onClick={nextStep} className="step-top">
                          {step + 1}
                        </span>
                      )}
                    </div>
                    {step === 1 && (
                      <div className="form-div">
                        <div className="head-title">
                          <h4>Knowing Your</h4>
                          <p>You, your age and your family</p>
                        </div>
                        <hr className="horizontal-line" />
                        <div className="row ">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="fullname" className="required">
                                Your full name
                              </label>
                              <Field
                                type="text"
                                name="fullName"
                                className="form-control"
                                placeholder="Enter full name"
                              />
                              <ErrorMessage
                                className="error"
                                name="fullName"
                                component="div"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="email" className="required">
                                Email address
                              </label>
                              <Field
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Email Address"
                              />
                              <ErrorMessage
                                className="error"
                                name="email"
                                component="div"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="mobileNumber"
                                className="required"
                              >
                                Mobile number
                              </label>
                              <Field
                                type="number"
                                name="mobileNumber"
                                className="form-control"
                                placeholder="Mobile Number"
                              />
                              <ErrorMessage
                                className="error"
                                name="mobileNumber"
                                component="div"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="dob" className="required">
                                Date of birth
                              </label>
                              <Field
                                type="date"
                                name="dob"
                                className="form-control"
                                placeholder="Date of birth"
                              />
                              <ErrorMessage
                                className="error"
                                name="dob"
                                component="div"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                htmlFor="mobileNumber"
                                className="required"
                              >
                                PAN number
                              </label>
                              <Field
                                type="text"
                                name="panNumber"
                                className="form-control"
                                placeholder="PAN Number"
                              />
                              <ErrorMessage
                                className="error"
                                name="panNumber"
                                component="div"
                              />
                            </div>
                          </div>
                          <div className="col-md-6"></div>
                        </div>

                        <hr className=" horizontal-line" />

                        <div className="row">
                          <div className="col-md-12">
                            <label className="ml-1">
                              Select your life stage among these
                            </label>
                            <div className="form-group">
                              <div className="button btn-single">
                                <input
                                  type="radio"
                                  id="a25"
                                  value="single"
                                  name="lifeStage"
                                />
                                <label
                                  className="btn btn-default"
                                  htmlFor="a25"
                                >
                                  Single
                                </label>
                              </div>
                              <div className="button">
                                <input
                                  type="radio"
                                  id="a50"
                                  value="married-with-kids"
                                  name="lifeStage"
                                />
                                <label
                                  className="btn btn-default"
                                  htmlFor="a50"
                                >
                                  Married with kids
                                </label>
                              </div>
                              <div className="button">
                                <input
                                  type="radio"
                                  id="a75"
                                  value="married-without-kids"
                                  name="lifeStage"
                                />
                                <label
                                  className="btn btn-default"
                                  htmlFor="a75"
                                >
                                  Married without kids
                                </label>
                              </div>
                              <div className="button">
                                <input
                                  type="radio"
                                  id="a75"
                                  value="single-parent-with-kids"
                                  name="lifeStage"
                                />
                                <label
                                  className="btn btn-default"
                                  htmlFor="a75"
                                >
                                  Single parent with kids
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="counter">
                              <button onClick={childrenDecrement}>-</button>
                              <span>{numChildren}</span>
                              <button onClick={childrenIncrement}>+</button>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn-submit"
                          onClick={nextStep}
                        >
                          Next
                        </button>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="form-div">
                        <div className="head-title">
                          <h4>Lets, talk about family</h4>
                          <p>Of course all fields are mandetory</p>
                        </div>
                        <hr className="horizontal-line" />
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="spouseName" className="required">
                                Your spouse name
                              </label>
                              <Field
                                type="text"
                                name="spouseName"
                                className="form-control"
                                placeholder="Enter full name"
                              />
                              <ErrorMessage
                                className="error"
                                name="spouseName"
                                component="div"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="spouseAge" className="required">
                                Age
                              </label>
                              <Field
                                type="number"
                                name="spouseAge"
                                className="form-control"
                                placeholder="Enter Age"
                              />
                              <ErrorMessage
                                className="error"
                                name="spouseAge"
                                component="div"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">{childFields}</div>
                        </div>

                        <hr className="horizontal-line" />

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="fatherName" className="required">
                                Your father name
                              </label>
                              <Field
                                type="text"
                                name="fatherName"
                                className="form-control"
                                placeholder="Enter full name"
                              />
                              <ErrorMessage
                                className="error"
                                name="fatherName"
                                component="div"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="fatherAge" className="required">
                                Age
                              </label>
                              <Field
                                type="number"
                                name="fatherAge"
                                className="form-control"
                                placeholder="Enter Age"
                              />
                              <ErrorMessage
                                className="error"
                                name="fatherAge"
                                component="div"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="motherName" className="required">
                                Your mother name
                              </label>
                              <Field
                                type="text"
                                name="motherName"
                                className="form-control"
                                placeholder="Enter full name"
                              />
                              <ErrorMessage
                                className="error"
                                name="motherName"
                                component="div"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="motherAge" className="required">
                                Age
                              </label>
                              <Field
                                type="number"
                                name="motherAge"
                                className="form-control"
                                placeholder="Enter Age"
                              />
                              <ErrorMessage
                                className="error"
                                name="motherAge"
                                component="div"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn-submit"
                          onClick={prevStep}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn-submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>

              <div
                className="modal fade"
                id="formDataModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="formDataModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="formDataModalLabel">
                        Form Data
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={handleCloseModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>
                        <b>Name:</b> {formData.fullName}
                      </p>
                      <p>
                        <b>Email:</b> {formData.email}
                      </p>
                      <p>
                        <b>Date of birth:</b> {formData.dob}
                      </p>
                      <p>
                        <b>PAN:</b> {formData.panNumber}
                      </p>
                      <p>
                        <b>Spouse:</b> {formData.spouseName} /{" "}
                        <b>Spouse Age:</b> {formData.spouseAge}
                      </p>
                      {formData.child0Name && (
                        <p>
                          <b>Child 01 Name:</b> {formData.child0Name} /{" "}
                          <b> Age:</b> {formData.child0Age}
                        </p>
                      )}

                      {formData.child1Name && (
                        <p>
                          <b>Child 02 Name:</b> {formData.child1Name} /{" "}
                          <b> Age:</b> {formData.child1Age}
                        </p>
                      )}

                      {formData.child2Name && (
                        <p>
                          <b>Child 03 Name:</b> {formData.child2Name} /{" "}
                          <b> Age:</b> {formData.child2Age}
                        </p>
                      )}

                      {formData.child3Name && (
                        <p>
                          <b>Child 04 Name:</b> {formData.child3Name} /{" "}
                          <b> Age:</b> {formData.child3Age}
                        </p>
                      )}

                      <p>
                        <b>Father Name:</b> {formData.fatherName} /{" "}
                        <b>Father Age:</b> {formData.fatherAge}
                      </p>
                      <p>
                        <b>Mother Name:</b> {formData.motherName} /{" "}
                        <b>Mother Age:</b> {formData.motherAge}
                      </p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 detail"></div>
        </div>
      </div>
    </>
  );
}

export default MultiStepForm;
