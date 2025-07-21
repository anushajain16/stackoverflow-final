function Card({ className = "", children,onClick }) {
  return (
    <div
      className={`rounded-lg border bg-white text-black shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
