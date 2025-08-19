"use client";
import {SignIn} from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center bg-white">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#111111",
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
