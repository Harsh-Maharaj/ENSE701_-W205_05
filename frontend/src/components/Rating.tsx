import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const Rating: React.FC<RatingProps> = ({ initialRating = 0, onChange, readonly = false }) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  const handleStarClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value);
    }
    setRating(value);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          style={{ cursor: readonly ? 'default' : 'pointer' }}
        >
          {hover !== null && hover >= star ? (
            <FaStar color="gold" />
          ) : rating >= star ? (
            <FaStar color="gold" />
          ) : (
            <FaRegStar color="gray" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
