import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Activity } from 'lucide-react';

type MetricData = {
  value: number;
  history: number[];
};

const ASCII_BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

const getAsciiBlock = (percentage: number): string => {
  const index = Math.floor((percentage / 100) * (ASCII_BLOCKS.length - 1));
  return ASCII_BLOCKS[Math.min(ASCII_BLOCKS.length - 1, Math.max(0, index))];
};

export function SystemMonitor() {
  const [metrics, setMetrics] = useState<Record<string, MetricData>>({
    cpu: { value: 0, history: [] },
    memory: { value: 0, history: [] },
    network: { value: 0, history: [] }
  });

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(prev => ({
        cpu: {
          value: Math.random() * 100,
          history: [...prev.cpu.history, Math.random() * 100].slice(-40)
        },
        memory: {
          value: 50 + Math.random() * 30,
          history: [...prev.memory.history, 50 + Math.random() * 30].slice(-40)
        },
        network: {
          value: Math.random() * 1000,
          history: [...prev.network.history, Math.random() * 1000].slice(-40)
        }
      }));
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderGraph = (values: number[], maxValue: number) => {
    return (
      <div className="ascii-graph">
        {values.map((value, i) => (
          <span
            key={i}
            className="ascii-block"
            style={{ 
              color: value > 80 ? 'var(--bright-red)' : 
                     value > 60 ? 'var(--bright-yellow)' : 
                     'var(--bright-blue)'
            }}
          >
            {getAsciiBlock((value / maxValue) * 100)}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="system-monitor">
      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-header">
            <Cpu size={14} />
            <span>CPU</span>
            <span className="metric-value" style={{
              color: metrics.cpu.value > 80 ? 'var(--bright-red)' : 
                     metrics.cpu.value > 60 ? 'var(--bright-yellow)' : 
                     'var(--bright-green)'
            }}>
              {metrics.cpu.value.toFixed(1)}%
            </span>
          </div>
          {renderGraph(metrics.cpu.history, 100)}
        </div>

        <div className="metric">
          <div className="metric-header">
            <HardDrive size={14} />
            <span>Memory</span>
            <span className="metric-value" style={{
              color: metrics.memory.value > 80 ? 'var(--bright-red)' : 
                     metrics.memory.value > 60 ? 'var(--bright-yellow)' : 
                     'var(--bright-green)'
            }}>
              {metrics.memory.value.toFixed(1)}%
            </span>
          </div>
          {renderGraph(metrics.memory.history, 100)}
        </div>

        <div className="metric">
          <div className="metric-header">
            <Activity size={14} />
            <span>Network</span>
            <span className="metric-value">
              {metrics.network.value.toFixed(0)} KB/s
            </span>
          </div>
          {renderGraph(metrics.network.history, Math.max(...metrics.network.history))}
        </div>
      </div>
    </div>
  );
}