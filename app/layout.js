import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight:["400", "800", "600", "500"] })

export const metadata = {
  title: 'Elkovi',
  description: 'fiverr project IT company',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
