import React from 'react'

function Sort({ sorts, onSelectSort, currentSort }) {
  const onChooseSort = (e) => {
    onSelectSort(e.target.value)
  }

  return (
    <select name="catalogSort" id="catalogSort" onChange={onChooseSort} value={currentSort}>
      {sorts &&
        sorts.map((sort, index) => (
          <option key={`${sort}+${index}`} value={sort.value}>
            {sort.text}
          </option>
        ))}
    </select>
  )
}

export default Sort
