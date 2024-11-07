import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function CurrencyRates() {
  const [rates, setRates] = useState({});
  const [usdRate, setUsdRate] = useState(1);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await axios.get(
          'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7862f782acce4052aee23f073ba4d771'
        );

        setRates(response.data.rates);
        setUsdRate(response.data.rates.USD);

      } catch (error) {
        console.error('Error fetching currency rates:', error);

      }
    };

    fetchCurrencyRates();
  }, []);

  const currenciesToDisplay = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

  return (
    <div className="container mt-4" >
      <h2>exchange Rates base (USD: {usdRate})</h2>
      <div className="table-responsive" >
        <table className="table table-bordered table-striped" >
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates)
              .filter(([currency]) => currenciesToDisplay.includes(currency)) 
              .map(([currency, exchangeRate]) => {
                const rate = parseFloat(exchangeRate);

                const weBuy = (rate * 1.05).toFixed(4); 
                const weSell = (rate * 0.95).toFixed(4); 

                return (
                  <tr key={currency}>
                    <td>{currency}</td>
                    <td>{weBuy}</td>
                    <td>{rate.toFixed(4)}</td>
                    <td>{weSell}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrencyRates;
