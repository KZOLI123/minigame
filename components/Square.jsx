function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      type="button"
      role="gridcell"
      aria-label={value ? `${value} mező` : 'Üres mező'}
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}

export default Square
