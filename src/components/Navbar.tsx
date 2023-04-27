import Link from 'next/link';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <div className="flex items-right m-2">
            <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
            <Link href="/">Home</Link>
            </button>
        </div>
        <div className="flex items-right m-2">
            <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
            <Link href="/Map">Map</Link>
            </button>
        </div>
        <div className="flex items-right m-2">
            <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
            <Link href="/datatable">Data Table</Link>
            </button>
        </div>
        <div className="flex items-right m-2">
            <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
            <Link href="/chart">Chart</Link>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
