export const InsideList = ({ features }: { features: string[] }) => (
  <ul className="offer__inside-list">
    {features.map((feature) => (
      <li key={feature} className="offer__inside-item">
        {feature}
      </li>
    ))}
  </ul>
);
