import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Papa from 'papaparse';
import Link from 'next/link';


const DataTablePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/locations.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const { data } = Papa.parse(csv, { header: true });
      setData(data);
      setFilteredData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!sortColumn || !sortDirection) return;

    const sortedData = [...filteredData].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortColumn].localeCompare(b[sortColumn], undefined, { numeric: true });
      } else {
        return b[sortColumn].localeCompare(a[sortColumn], undefined, { numeric: true });
      }
    });

    setFilteredData(sortedData);
  }, [sortColumn, sortDirection]);

  const handleSort = (column: any, sortDirection: any) => {
    setSortColumn(column.selector);
    setSortDirection(sortDirection);
  };

  const handleFilter = (e: any) => {
    const searchTerm = e.target.value;
    const filtered = data.filter((item) =>
      Object.values(item).some((value: any) => value.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (count: any) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns: any = [
    {
      name: 'Asset Name',
      selector: 'Asset_Name',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Lat',
      selector: 'Lat',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Long',
      selector: 'Long',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Business Category',
      selector: 'Business_Category',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Risk Rating',
      selector: 'Risk_Rating',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Risk Factors',
      selector: 'Risk_Factors',
      sortable: true,
      width: '400px',
    },
    {
      name: 'Year',
      selector: 'Year',
      sortable: true,
      width: '200px',
    },
  ];

  createTheme('customTheme', {
    pagination: {
      style: {
        marginTop: '16px',
      },
    },
  });

  return (
    <div>
        <div>
            <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white">
              <Link href="/">Home</Link>
            </button>
        </div>
      <input type="text" placeholder="Search..." onChange={handleFilter} />
      <DataTable
        columns={columns}
        data={paginatedData}
        sortServer
        onSort={handleSort}
        pagination
        paginationServer
        paginationTotalRows={filteredData.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleItemsPerPageChange}
        paginationPerPage={itemsPerPage}
        paginationRowsPerPageOptions={[10, 20, 30, 40,50]}
      />
    </div>
  );
};

export default DataTablePage;
