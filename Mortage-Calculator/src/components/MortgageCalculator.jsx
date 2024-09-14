import React, { useState, useRef } from 'react';
import './MortgageCalculator.css';

function MortgageCalculator({ isDarkMode }) {
  const [housePrice, setHousePrice] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [currency, setCurrency] = useState('KES');
  const [calculationResult, setCalculationResult] = useState(null);
  const printableTableRef = useRef(null);

  const calculateMortgage = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    let balance = principal;
    const payments = [];
    let totalInterest = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterest += interestPayment;

      payments.push({
        month: i,
        payment: monthlyPayment,
        principalPayment,
        interestPayment,
        balance,
      });
    }

    setCalculationResult({
      monthlyPayment,
      payments,
      totalPaid: monthlyPayment * numberOfPayments,
      totalInterest,
      totalPrincipal: principal,
    });
  };

  const currencyOptions = {
    KES: { symbol: 'KSh', name: 'Kenyan Shilling' },
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    GBP: { symbol: '£', name: 'British Pound' },
    JPY: { symbol: '¥', name: 'Japanese Yen' },
    CNY: { symbol: '¥', name: 'Chinese Yuan' },
    INR: { symbol: '₹', name: 'Indian Rupee' },
    AUD: { symbol: 'A$', name: 'Australian Dollar' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar' },
    ZAR: { symbol: 'R', name: 'South African Rand' },
  };

  const currencySymbol = currencyOptions[currency].symbol;

  const handlePrint = () => {
    const printContent = printableTableRef.current;
    const windowPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    windowPrint.document.write(printContent.innerHTML);
    windowPrint.document.close();
    windowPrint.focus();
    windowPrint.print();
    windowPrint.close();
  };

  const handleReset = () => {
    setHousePrice('');
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setCurrency('KES');
    setCalculationResult(null);
  };

// Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={`mortgage-calculator ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Mortgage Calculator</h1>
      <form onSubmit={calculateMortgage}>
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.entries(currencyOptions).map(([code, { name }]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="housePrice">House Price ({currencySymbol}):</label>
          <input
            type="number"
            id="housePrice"
            value={housePrice}
            onChange={(e) => setHousePrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount ({currencySymbol}):</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="interestRate">Annual Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loanTerm">Loan Term (years):</label>
          <input
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="calculate-btn">Calculate</button>
      </form>
      <p className="disclaimer">
        Calculations by this calculator are estimates only. There is no warranty for the accuracy of the results or the relationship to your financial situation.
      </p>
      {calculationResult && (
        <div className="result">
          <h2>Monthly Payment: {currencySymbol}{formatNumber(calculationResult.monthlyPayment.toFixed(2))}</h2>
          <div ref={printableTableRef}>
            <table className="payment-schedule">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Payment</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {calculationResult.payments.slice(0, 12).map((payment) => (
                  <tr key={payment.month}>
                    <td>{payment.month}</td>
                    <td>{currencySymbol}{formatNumber(payment.payment.toFixed(2))}</td>
                    <td>{currencySymbol}{formatNumber(payment.principalPayment.toFixed(2))}</td>
                    <td>{currencySymbol}{formatNumber(payment.interestPayment.toFixed(2))}</td>
                    <td>{currencySymbol}{formatNumber(payment.balance.toFixed(2))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-summary">
              <h3>Total Summary</h3>
              <p>Total Amount Paid: {currencySymbol}{formatNumber(calculationResult.totalPaid.toFixed(2))}</p>
              <p>Total Interest Paid: {currencySymbol}{formatNumber(calculationResult.totalInterest.toFixed(2))}</p>
              <p>Total Principal Paid: {currencySymbol}{formatNumber(calculationResult.totalPrincipal.toFixed(2))}</p>
            </div>
          </div>
          <div className="action-buttons">
            <button onClick={handlePrint} className="print-btn">Print Table</button>
            <button onClick={handleReset} className="reset-btn">Reset Calculation</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator;