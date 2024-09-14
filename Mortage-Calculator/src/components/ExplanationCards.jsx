import React from 'react';
import './ExplanationCards.css';

function ExplanationCards() {
  return (
    <div className="explanation-cards-container">
      <h2>How It Works</h2>
      <div className="explanation-cards">
        <div className="card">
          <h3>Enter Details</h3>
          <p>Input your mortgage details in the calculator above, including loan amount, interest rate, and term.</p>
        </div>
        <div className="card">
          <h3>Calculate</h3>
          <p>Our calculator uses the standard amortization formula to compute your monthly payments and total costs.</p>
        </div>
        <div className="card">
          <h3>View Results</h3>
          <p>See your monthly payment, payment schedule, and a summary of total amounts paid over the loan's life.</p>
        </div>
        <div className="card">
          <h3>Additional Tools</h3>
          <p>Print your results or reset the calculator. Switch between dark and light modes for comfort.</p>
        </div>
      </div>
    </div>
  );
}

export default ExplanationCards;