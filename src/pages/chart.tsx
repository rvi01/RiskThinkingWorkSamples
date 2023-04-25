import React from 'react';
import LineChart from '../components/LineChart';
import Link from 'next/link';

const Page: React.FC = () => {
  const data = [10, 20, 30, 40, 50, 60];
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  return <>
    <div>
        <h2><Link href="/">Home</Link></h2>
    </div>
    <LineChart data={data} labels={labels}></LineChart>
  </>;
};

export default Page;
