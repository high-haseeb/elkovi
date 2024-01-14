import { Inter } from 'next/font/google'
import './globals.css'


export const metadata = {
  title: 'Elkovi',
  description: 'fiverr project IT company',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='font-Aeonik'>{children}</body>
    </html>
  )
}
