import Link from "next/link";
import LineGraph from "../components/LineChart";

export default function Home() {
  return (
    <div>
      <h1>Risk Rating over time</h1>
      <div>
          <h2><Link href="/">Home</Link></h2>
      </div>
      <LineGraph />
    </div>
  );
}
