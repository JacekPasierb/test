"use client";
import {SignUp} from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-neutral-50 ">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#2563eb",
            colorText: "#111827",
            colorTextOnPrimaryBackground: "white",
            colorBackground: "#f9fafb",
            colorInputBackground: "white",
            colorInputText: "#111827",

            colorDanger: "#dc2626",
            borderRadius: "12px",
            fontSize: "14px",
          },
          layout: {
            logoPlacement: "inside",
            logoImageUrl: "/icons/motorek_icon_192.png", // opcjonalnie Twoje logo
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
          },
        }}
      />
    </main>
  );
}
