import React, {useState} from 'react';
import SentenceStructure from '../utils/SentenceChecker/SentenceStructure'
import SentenceStructurev2 from '../utils/SentenceChecker/SentenceStructurev2'
import StructureChecker from '../utils/SentenceChecker/StructureChecker'
import {testCases} from '../utils/SentenceChecker/TestCases'

function SentenceStructures({ type = "Simple" }) {
  const filteredExamples = testCases.filter(
    (example) => example.structure.toLowerCase() === type.toLowerCase()
  );

  const getRandomExamples = () => {
    const shuffled = [...filteredExamples].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [examples, setExamples] = useState(getRandomExamples());

  const handleClick = () => {
    setExamples(getRandomExamples());
  };

  
  function ExampleBox({ examples, onClick }) {
    return (
      <div
        onClick={onClick}
        style={{
          cursor: "pointer",
          border: "2px solid #333",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
          maxWidth: "600px",
          marginTop: "20px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
      >
        <h3>Click to see new examples:</h3>
        <ul>
          {examples.map((ex, index) => (
            <li key={index}>{ex.sentence}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: "48px" }}>{type} Sentence Structure</h1>
      <ExampleBox examples={examples} onClick={handleClick} />
    </div>
  );
}
export default SentenceStructures;