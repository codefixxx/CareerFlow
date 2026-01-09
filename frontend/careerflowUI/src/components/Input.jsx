import React from "react";
import AsyncSelect from "react-select/async";

const Input = ({ skillsList, value, onChange }) => {
  // Convert selected values to React Select format
  const selectedOptions = value.map((skill) => ({ value: skill, label: skill }));

  // Load options dynamically (filter as you type)
  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }

    const filtered = skillsList
      .filter(
        (skill) =>
          skill.toLowerCase().startsWith(inputValue.toLowerCase()) &&
          !value.includes(skill)
      )
      .slice(0, 10) // limit suggestions like your original component
      .map((skill) => ({ value: skill, label: skill }));

    callback(filtered);
  };

  // Handle selection changes
  const handleChange = (selected) => {
    const updated = selected ? selected.map((item) => item.value) : [];
    onChange(updated);
  };

  // Custom styles to match Tailwind theme
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: "#d1d5db", // gray-300
      minHeight: "2.5rem",
      padding: "0.125rem",
      boxShadow: "none",
      "&:hover": { borderColor: "#3b82f6" }, // blue-500
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#dbeafe", // blue-100
      borderRadius: "9999px",
      padding: "0 0.25rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#1d4ed8", // blue-700
      fontSize: "0.875rem",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#1d4ed8",
      cursor: "pointer",
      "&:hover": { backgroundColor: "#bfdbfe", color: "#1e40af" },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f3f4f6" : "#ffffff",
      color: "#111827",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      maxHeight: "10rem",
    }),
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <AsyncSelect
        cacheOptions
        defaultOptions={[]}
        loadOptions={loadOptions}
        value={selectedOptions}
        onChange={handleChange}
        isMulti
        placeholder="Type a skill..."
        styles={customStyles}
        noOptionsMessage={() => "No matching skills"}
      />
    </div>
  );
};

export default Input;


