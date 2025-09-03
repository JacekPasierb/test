"use client";

import React, {useRef, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Image from "next/image";

type FormValues = {
  marka: string;
  model: string;
  rok: number;
  ksywka: string;
  przebieg: number | string;
  pojemnosc: number | string;
  imageUrl: string; // <— zapisujemy URL z Cloudinary
};

const MAX_SIZE_MB = 5;

const validationSchema = Yup.object().shape({
  marka: Yup.string().required("Marka jest wymagana"),
  model: Yup.string().required("Model jest wymagany"),
  rok: Yup.number()
    .required("Rok jest wymagany")
    .min(1900, "Rok musi być większy niż 1900"),
  ksywka: Yup.string().required("Ksywka jest wymagana"),
  przebieg: Yup.number()
    .typeError("Przebieg musi być liczbą")
    .required("Przebieg jest wymagany")
    .min(0, "Przebieg nie może być ujemny"),
  pojemnosc: Yup.number()
    .typeError("Pojemność musi być liczbą")
    .required("Pojemność baku jest wymagana")
    .min(0, "Pojemność nie może być ujemna"),
  imageUrl: Yup.string().url().optional(), // jeśli chcesz: .required("Zdjęcie jest wymagane")
});

async function getCloudinaryParams() {
  const res = await fetch("/api/upload/params");
  if (!res.ok) throw new Error("Nie udało się pobrać parametrów uploadu");
  return res.json() as Promise<{
    timestamp: number;
    signature: string;
    apiKey: string;
    cloudName: string;
    folder: string;
  }>;
}

async function uploadToCloudinary(file: File) {
  const {timestamp, signature, apiKey, cloudName, folder} =
    await getCloudinaryParams();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const res = await fetch(uploadUrl, {method: "POST", body: formData});
  if (!res.ok) throw new Error("Błąd uploadu do Cloudinary");

  const data = await res.json();
  return data.secure_url as string;
}

const MotorcycleForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (
    values: FormValues,
    {resetForm}: {resetForm: () => void}
  ) => {
    const res = await fetch("/api/motorcycles", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values),
    });

    if (res.ok) {
      alert("Dodano");
      resetForm();
      setPreview(null);
    } else {
      const err = await res.json().catch(() => ({}));
      console.error("Błąd", err);
      alert("Nie udało się zapisać motocykla");
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        marka: "",
        model: "",
        rok: new Date().getFullYear(),
        ksywka: "",
        przebieg: "",
        pojemnosc: "",
        imageUrl: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({setFieldValue}) => (
        // <Form className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"></Form>
        <Form className="max-w-3xl mx-auto  gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold mb-2">Garaż</h2>
            <p className="text-lg font-bold mb-2">Dodaj motocykl</p>

            {/* Twoje pola tekstowe bez zmian... */}

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
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
              </div>

              {/* ====== Zdjęcie ====== */}
              <div className="flex flex-col justify-center">
                <label className="block text-sm mb-1 font-medium">
                  Zdjęcie motocykla (max {MAX_SIZE_MB} MB)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.currentTarget.files?.[0];
                    setFileError(null);
                    if (!file) return;

                    if (!file.type.startsWith("image/")) {
                      setFileError("Dozwolone są tylko pliki graficzne");
                      return;
                    }
                    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                      setFileError(`Plik jest za duży (max ${MAX_SIZE_MB} MB)`);
                      return;
                    }

                    try {
                      setUploading(true);
                      const url = await uploadToCloudinary(file);
                      setFieldValue("imageUrl", url);
                      setPreview(url);
                    } catch (err: unknown) {
                      setFileError(
                        err instanceof Error ? err.message : "Błąd uploadu"
                      );
                    } finally {
                      setUploading(false);
                    }
                  }}
                />

                {!preview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-40 border border-dashed border-gray-500 rounded-md
                           flex items-center justify-center text-sm hover:bg-gray-50"
                  >
                    {uploading ? "Wgrywanie..." : "Kliknij, aby dodać zdjęcie"}
                  </button>
                )}

                {preview && (
                  <div
                    className="relative w-full h-40 cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image
                      src={preview}
                      alt="Podgląd zdjęcia motocykla"
                      fill
                      sizes="(max-width: 40px) 100vw, 600px"
                      className="object-cover rounded-md"
                    />
                    {/* półprzezroczysty overlay z napisem „Zmień” */}
                    <div
                      className="absolute inset-0 hidden group-hover:flex items-center justify-center
                                bg-black/40 text-white text-sm rounded-md"
                    >
                      Kliknij, aby zmienić
                    </div>
                    {uploading && (
                      <div
                        className="absolute inset-0 flex items-center justify-center
                                  bg-white/60 text-sm rounded-md"
                      >
                        Wgrywanie...
                      </div>
                    )}
                  </div>
                )}

                {fileError && (
                  <div className="text-xs text-red-500 mt-1">{fileError}</div>
                )}

                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-xs text-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 mt-2 bg-black text-white rounded-lg w-full"
                  disabled={uploading}
                >
                  {uploading ? "Czekaj..." : "Zapisz"}
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MotorcycleForm;
