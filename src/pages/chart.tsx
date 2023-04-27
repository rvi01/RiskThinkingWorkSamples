import Link from "next/link";
import LineGraph from "../components/LineChart";


export default function Home() {
  return (
    <div>
      <h1>Risk Rating over time</h1>
      <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
        <Link href="/">Home</Link>
        </button>
      <LineGraph />
    </div>
  );
}
