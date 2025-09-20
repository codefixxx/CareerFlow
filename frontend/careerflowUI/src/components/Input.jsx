import React, { useState } from "react";
import { X } from "lucide-react";

const Input = ({ skillsList, value, onChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // handle typing
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 0) {
      const filtered = skillsList
        .filter(
          (skill) =>
            skill.toLowerCase().startsWith(val.toLowerCase()) &&
            !value.includes(skill)
        )
        .slice(0, 10); // limit suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // add skill
  const addSkill = (skill) => {
    const updated = [...value, skill];
    onChange(updated);
    setQuery("");
    setSuggestions([]);
  };

  // remove skill
  const removeSkill = (skill) => {
    const updated = value.filter((s) => s !== skill);
    onChange(updated);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* selected skill tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((skill, i) => (
          <span
            key={i}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {skill}
            <X
              size={16}
              className="ml-1 cursor-pointer"
              onClick={() => removeSkill(skill)}
            />
          </span>
        ))}
      </div>

      {/* input box */}
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={query}
        onChange={handleChange}
        placeholder="Type a skill..."
      />

      {/* suggestions */}
      {suggestions.length > 0 && (
        <ul className="border mt-1 max-h-40 overflow-y-auto rounded shadow">
          {suggestions.map((skill, i) => (
            <li
              key={i}
              onClick={() => addSkill(skill)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Input;

