import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yash Vardhan Gupta | Founding Data Scientist',
  description:
    '5+ years designing and deploying production ML & DL systems in FinTech. Founding Data Scientist at SuperMoney. Specialises in LSTMs, GNNs, Transformers, fraud detection, and credit underwriting.',
  keywords: [
    'Yash Vardhan Gupta',
    'Data Scientist',
    'Machine Learning',
    'Deep Learning',
    'FinTech',
    'SuperMoney',
    'Simpl',
    'LSTM',
    'Fraud Detection',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
