import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Pagination, Card, CardBody
} from "@heroui/react";
import { Icon } from '@iconify/react';

const EmployeeSalary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchSalaryData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/getemployees');
      setSalaryData(response.data);
    } catch (err) {
      console.error("Error fetching salary data:", err);
    }
  };

  useEffect(() => {
    fetchSalaryData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8081/deletesalary/${id}`);
        fetchSalaryData(); // refresh the data
      } catch (err) {
        console.error("Error deleting employee:", err);
      }
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/update/salary/${id}`);
  };

  const filteredData = useMemo(() => {
    if (!filterValue) return salaryData;
    return salaryData.filter(item =>
      item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      item.department.toLowerCase().includes(filterValue.toLowerCase()) ||
      item.specificrole.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [salaryData, filterValue]);

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  const totalSalary = useMemo(() =>
    salaryData.reduce((sum, item) => sum + (item.basesalary + item.bonus), 0), [salaryData]);

  const averageSalary = useMemo(() =>
    salaryData.length > 0 ? totalSalary / salaryData.length : 0, [salaryData, totalSalary]);

  const highestSalary = useMemo(() =>
    salaryData.length > 0 ? Math.max(...salaryData.map(item => item.basesalary + item.bonus)) : 0, [salaryData]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Salary Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-sm">
          <CardBody className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Salary Budget</p>
              <h3 className="text-2xl font-bold">{formatCurrency(totalSalary)}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Icon icon="lucide:dollar-sign" className="text-blue-600" width={24} />
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardBody className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Average Salary</p>
              <h3 className="text-2xl font-bold">{formatCurrency(averageSalary)}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Icon icon="lucide:bar-chart-2" className="text-green-600" width={24} />
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardBody className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Highest Salary</p>
              <h3 className="text-2xl font-bold">{formatCurrency(highestSalary)}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Icon icon="lucide:trending-up" className="text-purple-600" width={24} />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by employee name, department..."
          startContent={<Icon icon="lucide:search" className="text-default-400" />}
          value={filterValue}
          onValueChange={setFilterValue}
        />
      </div>

      <Table
        aria-label="Employee salary table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage}
              total={pages}
              onChange={setCurrentPage}
            />
          </div>
        }
        classNames={{ wrapper: "min-h-[222px]" }}
      >
        <TableHeader>
          <TableColumn>EMPLOYEE</TableColumn>
          <TableColumn>DEPARTMENT</TableColumn>
          <TableColumn>POSITION</TableColumn>
          <TableColumn>BASE SALARY</TableColumn>
          <TableColumn>BONUS</TableColumn>
          <TableColumn>TOTAL SALARY</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.department}</TableCell>
              <TableCell>{item.specificrole}</TableCell>
              <TableCell>{formatCurrency(item.basesalary)}</TableCell>
              <TableCell>{formatCurrency(item.bonus)}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(item.basesalary + item.bonus)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button isIconOnly size="sm" variant="light" onClick={() => handleEdit(item.id)}>
                    <Icon icon="lucide:edit" className="text-default-500" />
                  </Button>
                  <Button isIconOnly size="sm" variant="light" onClick={() => handleDelete(item.id)}>
                    <Icon icon="lucide:trash" className="text-danger" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeSalary;
