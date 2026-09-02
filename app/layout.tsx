import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ScalePilot | The Strategic Engine for Modern Commerce",
  description: "A connected platform for building stronger stores, making smarter decisions and moving ecommerce businesses forward with clarity.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
