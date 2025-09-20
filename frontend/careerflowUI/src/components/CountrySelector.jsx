import React from "react";

const CountrySelector = ({ value, onChange }) => {
  const countries = [
    { code: "US", name: "United States" },
    { code: "IN", name: "India" },
    { code: "UK", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "JP", name: "Japan" },
  ];

  return (
    <div className="flex items-center border p-4 rounded-lg shadow-sm">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="flex-1 px-3 py-2 border rounded-lg"
      >
        <option value="">-- Select a country --</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
