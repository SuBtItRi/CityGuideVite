import React from 'react'

function Filters({ filters, onSelectFilter, currentFilter }) {
  const onChooseFilter = (e) => {
    const filter = e.target.textContent.toLowerCase()
    onSelectFilter(filter == 'сбросить фильтры' ? '' : filter)
  }

  return (
    <div className="catalog__filters">
      {filters &&
        filters.map((filter, index) => (
          <button
            key={`${filter}_${index}`}
            className={`catalog__filter-btn ${filter.toLowerCase() == currentFilter ? 'active' : ''}`}
            data-id={filter == 'Сбросить фильтры' ? 'Все' : filter.toLowerCase()}
            id={filter == 'Сбросить фильтры' ? 'showAllButton' : ''}
            onClick={onChooseFilter}
          >
            {filter}
          </button>
        ))}
    </div>
  )
}

export default Filters
