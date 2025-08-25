"use client";

import React from "react";

import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const MotorcycleForm = () => {
  const validationSchema = Yup.object().shape({
    marka: Yup.string().required("Marka jest wymagana"),
    model: Yup.string().required("Model jest wymagany"),
    rok: Yup.number()
      .required("Rok jest wymagany")
      .min(1900, "Rok musi być większy niż 1900"),
    ksywka: Yup.string().required("Ksywka jest wymagana"),
    przebieg: Yup.number()
      .required("Przebieg jest wymagany")
      .min(0, "Przebieg nie może być ujemny"),
    pojemnosc: Yup.number()
      .required("Pojemność baku jest wymagana")
      .min(0, "Pojemność nie może być ujemna"),
  });
  return (
    <Formik
      initialValues={{
        marka: "",
        model: "",
        rok: "",
        ksywka: "",
        przebieg: "",
        pojemnosc: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        // Możesz dodać logikę do obsługi przesyłania formularza
      }}
    >
      {() => (
        <Form className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-2">Garaż</h2>
          <p className="text-lg font-bold mb-2">Dodaj motocykl</p>
          <div className="min-h-15 mb-2 w-full">
            <Field
              name="marka"
              type="text"
              className="border border-gray-500 rounded-md p-2 w-full"
              placeholder="Marka"
            />
            <ErrorMessage
              name="marka"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="min-h-15 mb-2">
            <Field
              name="model"
              type="text"
              placeholder="Model"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
            <ErrorMessage
              name="model"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="min-h-15 mb-2">
            <Field
              name="rok"
              type="number"
              placeholder="Rok"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
            <ErrorMessage
              name="rok"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="min-h-15 mb-2">
            <Field
              name="ksywka"
              type="text"
              placeholder="Ksywka"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
            <ErrorMessage
              name="ksywka"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="min-h-15 mb-2">
            <Field
              name="przebieg"
              type="number"
              placeholder="Przebieg"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
            <ErrorMessage
              name="przebieg"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <div className="min-h-15 mb-2">
            <Field
              name="pojemnosc"
              type="number"
              placeholder="Pojemność baku"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
            <ErrorMessage
              name="pojemnosc"
              component="div"
              className="text-xs text-red-500"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg w-full">Zapisz</button>
        </Form>
      )}
    </Formik>
  );
};

export default MotorcycleForm;
