import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div >
          <h1 >Welcome to RiskThinking Demo App</h1>
        </div>
        <div>
          <h2>This is the default home page.</h2>
        </div>
        <div>
          <h2><Link href="/Map">Map</Link></h2>
        </div>
        <div>
          <h2><Link href="/datatable">Data Table</Link></h2>
        </div>
        <div>
          <h2><Link href="/chart">Chart</Link></h2>
        </div>
      </div>
    </main>
  )
}
