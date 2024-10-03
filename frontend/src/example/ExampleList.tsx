import { useEffect, useState } from 'react';
import axios from 'axios';
import './Example.scss';

interface Example {
  id: number;
  name: string;
}

function ExampleList() {
  const [examples, setExamples] = useState<Example[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/api/examples');
        setExamples(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Demo List</h1>
        {examples.map(example => (
          <div key={example.id}>{example.name}</div>
        ))}
    </div>
  );
}

export default ExampleList;
