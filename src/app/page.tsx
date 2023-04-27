import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    
    <main>
      <Navbar />
      <div className="container mx-auto">
        <div >
          <h1 className="text-white">Welcome to RiskThinking Demo App</h1>
        </div>
      </div>
    </main>
  )
}
