import { useState, useEffect } from 'react';

type CryptoData = {
  price: number;
  history: number[];
};

const ASCII_BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

const getAsciiBlock = (percentage: number): string => {
  const index = Math.floor((percentage / 100) * (ASCII_BLOCKS.length - 1));
  return ASCII_BLOCKS[Math.min(ASCII_BLOCKS.length - 1, Math.max(0, index))];
};

export function CryptoMonitor() {
  const [prices, setPrices] = useState<Record<string, CryptoData>>({
    bitcoin: { price: 0, history: [] },
    ethereum: { price: 0, history: [] }
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
        );
        const data = await response.json();

        setPrices(prev => ({
          bitcoin: {
            price: data.bitcoin.usd,
            history: [...prev.bitcoin.history, data.bitcoin.usd].slice(-40)
          },
          ethereum: {
            price: data.ethereum.usd,
            history: [...prev.ethereum.history, data.ethereum.usd].slice(-40)
          }
        }));
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 2000); // Fetch every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const renderGraph = (values: number[], maxValue: number) => {
    return (
      <div className="ascii-graph">
        {values.map((value, i) => (
          <span key={i} className="ascii-block">
            {getAsciiBlock((value / maxValue) * 100)}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="crypto-monitor">
      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-header">
            <span>Bitcoin</span>
            <span className="metric-value">${prices.bitcoin.price.toFixed(2)}</span>
          </div>
          {renderGraph(prices.bitcoin.history, Math.max(...prices.bitcoin.history))}
        </div>

        <div className="metric">
          <div className="metric-header">
            <span>Ethereum</span>
            <span className="metric-value">${prices.ethereum.price.toFixed(2)}</span>
          </div>
          {renderGraph(prices.ethereum.history, Math.max(...prices.ethereum.history))}
        </div>
      </div>
    </div>
  );
}
