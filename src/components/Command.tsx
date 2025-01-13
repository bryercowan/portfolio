import React from 'react';

interface CommandProps {
  command: string;
  output: string | string[];
}

export function Command({ command, output }: CommandProps) {
  return (
    <div className="command-block">
      <div className="flex">
        <span className="prompt">visitor@portfolio:~$</span>
        <span className="command ml-2">{command}</span>
      </div>
      <div className="output mt-2">
        {Array.isArray(output) ? (
          output.map((line, i) => (
            <div key={i} className="output-line">{line}</div>
          ))
        ) : (
          <div className="output-line">{output}</div>
        )}
      </div>
    </div>
  );
}