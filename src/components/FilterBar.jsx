function FilterBar({ selectedType, onTypeChange }) {
  const filterOptions = ['All', 'Event', 'Result', 'Placement'];

  return (
    <section className="filter-bar">
      <label htmlFor="notificationType" className="filter-bar__label">
        Filter by type:
      </label>
      <select
        id="notificationType"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="filter-bar__select"
      >
        {filterOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </section>
  );
}

export default FilterBar;
