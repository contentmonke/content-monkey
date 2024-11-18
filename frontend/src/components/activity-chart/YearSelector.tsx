import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActivityChart.css'; // Import CSS file

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  userId: string;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selectedYear, onYearChange, userId }) => {
  const [years, setYears] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false); // To control expanding the year list

  useEffect(() => {
    const fetchOldestYear = async () => {
      try {
        const userIdInt = parseInt(userId)
        const response = await axios.get(`http://localhost:8080/api/reviews/oldest-review-year`, {
          params: { userId: userIdInt },
        });
        const oldestYear = response.data || new Date().getFullYear();
        const currentYear = new Date().getFullYear();

        const yearsRange = Array.from({ length: currentYear - oldestYear + 1 }, (_, i) => currentYear - i);
        setYears(yearsRange);
      } catch (error) {
        console.error('Error fetching oldest year:', error);
      }
    };

    fetchOldestYear();
  }, [userId]);

  const visibleYears = showAll ? years : years.slice(0, 5);

  return (
    <div className="year-selector">
      {visibleYears.map((year) => (
        <button
          key={year}
          onClick={() => onYearChange(year)}
          className={`year-button ${selectedYear === year ? 'selected' : ''}`}
        >
          {year}
        </button>
      ))}
      {!showAll && years.length > 5 && (
        <button
          className="year-button expand-button"
          onClick={() => setShowAll(true)}
        >
          ...
        </button>
      )}
    </div>
  );
};

export default YearSelector;