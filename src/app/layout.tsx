import type {Metadata} from "next";
import {ClerkProvider} from "@clerk/nextjs";

import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {dark} from "@clerk/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motorek",
  description: "Moto-dziennik każdego motocyklisty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#2563eb", // niebieski (Tailwind blue-600)
          colorText: "#111827", // prawie czarny
          colorTextOnPrimaryBackground: "white",
          colorBackground: "#f9fafb", // jasne tło (Tailwind gray-50)
          colorInputBackground: "white",
          colorInputText: "#111827",
          colorBorder: "transparent", // szary
          colorDanger: "#dc2626", // czerwony error (Tailwind red-600)
          borderRadius: "12px",
          fontSize: "16px",
        },
        layout: {
          logoPlacement: "inside",
          logoImageUrl: "/icons/motorek_icon_192.png", // wrzuć swoje logo do public/
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton", // albo "blockButton"
          helpPageUrl: "/help",
        },
        elements: {
          card: "  p-6",
          headerTitle: "text-2xl font-bold text-gray-800",
          headerSubtitle: "text-sm text-gray-500",
          socialButtonsBlockButton:
            "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
          formButtonPrimary:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition",
          footerActionLink: "text-blue-600 hover:underline",
        },
      }}
      localization={{
        locale: "pl-PL",
        signIn: {
          start: {
            title: "Motorek – Logowanie",
            subtitle: "Witaj ponownie! Zaloguj się, aby kontynuować.",
          },
        },
        signUp: {
          start: {
            title: "Rejestracja",
            subtitle: "Załóż konto, aby korzystać z Motorka.",
          },
        },
      }}
    >
      <html lang="pl">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#111111" />
          <link rel="icon" href="/icons/motorek_icon_192.png" />
          {/* iOS (opcjonalnie): */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-icon" href="/icons/motorek_icon_192.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
