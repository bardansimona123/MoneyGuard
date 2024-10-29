import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import styles from './Statistics.module.css';

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const Statistics = ({ transactions = [] }) => {
  if (transactions.length === 0) {
    return (
      <div className={styles.statistics}>
        <h2 style={{ color: 'white' }}>Statistics</h2>
        <div className={styles.noData}>Nu există tranzacții.</div>
      </div>
    );
  }

  const expenseTotals = transactions.reduce((acc, txn) => {
    if (txn.type === 'expense') {
      acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    }
    return acc;
  }, {});

  const incomeTotal = transactions
    .filter(txn => txn.type === 'income')
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalExpenses = Object.values(expenseTotals).reduce((acc, value) => acc + value, 0);
  const average = ((incomeTotal - totalExpenses) / 2).toFixed(2);

  const data = Object.entries(expenseTotals).map(([category, amount], index) => ({
    name: category || 'General',
    value: amount,
    color: colors[index % colors.length],
  }));

  return (
    <div className={styles.statistics}>
      <h2 style={{ color: 'white' }}>Statistics</h2>
      <div className={styles.content}>
        <div className={styles.chartContainer}>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className={styles.average}>
            {average} € {/* Afișează media aritmetică */}
          </div>
        </div>

        <div className={styles.listContainer}>
          <ul className={styles.list}>
            {data.map((entry, index) => (
              <li key={index} className={styles.listItem}>
                <span
                  className={styles.colorSquare}
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span style={{ color: 'white', marginLeft: '10px' }}>{entry.name}</span>
                <span style={{ color: 'white', marginLeft: 'auto' }}>{entry.value} €</span>
                <hr style={{ borderColor: 'white' }} /> {/* Linia sub fiecare tranzacție */}
              </li>
            ))}
          </ul>

          <div className={styles.totals}>
            <div style={{ color: 'white' }} className={styles.totalExpenses}>
              <strong>Cheltuieli: </strong>{totalExpenses} €
            </div>
            <div style={{ color: 'white' }} className={styles.totalIncome}>
              <strong>Venituri: </strong>{incomeTotal} €
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
