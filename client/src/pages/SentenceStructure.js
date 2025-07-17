import React from 'react';
import SentenceStructure from '../utils/SentenceChecker/SentenceStructure'
import SentenceStructurev2 from '../utils/SentenceChecker/SentenceStructurev2'
import StructureChecker from '../utils/SentenceChecker/StructureChecker'
import {testCases} from '../utils/SentenceChecker/TestCases'

function SentenceStructures({type = "simple"}) {
    const filteredExamples = testCases
    .filter(test => test.structure === type)
    .map(test => test.sentence); 

  return (
    <div className="p-6">
      <h1 style={{ fontSize: "48px" }}>Sentence Structure: {type}</h1>
      <ExamplesBox examples={filteredExamples} />
    </div>
  );
}


function ExamplesBox({examples}) {
    return(
        <div style = {{
            border: "2px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#f9f9f9",
            maxWidth: "600px",
            marginTop: "20px"
        }}>
            <h2 style = {{ marginBottom: "10px", color: "#333"}}>Examples:</h2>
            <ul style={{ paddingLeft: "20px" }}>
            {examples.map((ex, i) => (
            <li key={i}>{ex}</li>
        ))}
            </ul>
        </div>
    )
}
export default SentenceStructures;