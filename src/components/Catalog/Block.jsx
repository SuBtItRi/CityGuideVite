import React, { useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import { addLandmark, fetchCatalog, fetchCatalogLength } from '../../api'

import Sort from './Sort'
import Filters from './Filters'
import Pagination from './Pagination'
import Container from './Container'
import ContainerLoader from './ContainerLoader'

import '../../scss/components/catalog/block.scss'
import { useSelector } from 'react-redux'
function Block() {
  const location = useLocation()
  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = new URLSearchParams(location.search)

  const user = useSelector(({ user }) => user)
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const [filter, setFilter] = React.useState(params.has('filter') ? params.get('filter') : '')
  const [currentPage, setCurrentPage] = React.useState(
    params.has('page') ? params.get('page') : '1'
  )
  const [sortBy, setSortBy] = React.useState(
    params.has('sortBy') && params.has('order')
      ? `${params.get('sortBy')}&order=${params.get('order')}`
      : 'grade&order=desc'
  )
  const [searchTerm, setSearchTerm] = React.useState('')

  const formRef = useRef(null)
  const [formHeight, setFormHeight] = React.useState(window.innerWidth < 1024 ? 471 : 508)

  const queryClient = useQueryClient()

  React.useEffect(() => {
    params.set('filter', filter)
    params.set('page', currentPage)
    const [sortField, order] = sortBy.split('&order=')
    params.set('sortBy', sortField)
    params.set('order', order)

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    )
  }, [filter, currentPage, sortBy, navigate, location.pathname])

  React.useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight)
    }
  }, [isModalVisible])

  const {
    data: catalogItems,
    error: catalogItemsError,
    isLoading: catalogItemsLoading,
  } = useQuery(
    ['catalogItems', filter, searchTerm, sortBy, currentPage],
    () => fetchCatalog(filter, searchTerm, sortBy, currentPage),
    {
      retry: false,
    }
  )

  const { data: paginationLength } = useQuery(['catalogLength', filter, searchTerm], () =>
    fetchCatalogLength(filter, searchTerm)
  )

  const selectSort = (sort) => {
    setCurrentPage(1)
    setSortBy(sort)
  }

  const selectFilter = (filter) => {
    setCurrentPage(1)
    setFilter(filter)
  }

  const selectCurrentPage = (num) => {
    setCurrentPage(num)
  }

  const handleModalOpen = () => {
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  let timeout
  const onChangeSearch = (e) => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      setFilter('')
      setSearchTerm(e.target.value)
    }, 1000)
  }

  const handleAddPhoto = () => {
    if (document.getElementsByName('url').length < 5) {
      const input = document.createElement('input')
      input.type = 'url'
      input.name = 'url'
      input.className = 'landmark__add_elem-input'
      input.placeholder = 'Ссылка на фото'
      document.querySelector('.input-photo__container').appendChild(input)
    }
  }

  const mutation = useMutation(addLandmark, {
    onSuccess: () => {
      setIsModalVisible(false)
      queryClient.invalidateQueries(['catalogItems'])
      queryClient.invalidateQueries(['catalogLength'])
    },
  })

  const handleFormLandmarkAdd = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const newData = Object.fromEntries(formData)

    const urlInputs = document.getElementsByName('url')
    newData.imgs = Array.from(urlInputs)
      .map((input) => input.value)
      .filter((url) => url !== '')
    newData.grade = []

    delete newData.url

    e.target.reset()

    mutation.mutate(newData)
  }

  return (
    <section className="catalog">
      <div className="container">
        <div className="catalog__wrap">
          <div className="catalog__left-block">
            <h3 className="catalog__filters_title">Фильтры:</h3>
            <Filters
              filters={[
                'Памятники',
                'Музеи',
                'Парки и сады',
                'Храмы и церкви',
                'Театры и культурные центры',
                'Фонтаны',
                'Площади',
                'Сбросить фильтры',
              ]}
              onSelectFilter={selectFilter}
              currentFilter={filter}
            />
          </div>
          <div className="catalog__right-block">
            <div className="catalog__title">Каталог достопримечательностей</div>
            <div className="catalog__sort-container">
              <input
                type="text"
                id="searchInput"
                className="catalog__search-input"
                placeholder="Поиск по заголовку"
                onChange={onChangeSearch}
              />
              <Sort
                sorts={[
                  {
                    value: 'grade&order=desc',
                    text: 'По убыванию рейтинга',
                  },
                  {
                    value: 'grade&order=asc',
                    text: 'По возрастанию рейтинга',
                  },
                  {
                    value: 'title&order=asc',
                    text: 'От А до Я',
                  },
                  {
                    value: 'title&order=desc',
                    text: 'От Я до А',
                  },
                ]}
                onSelectSort={selectSort}
                currentSort={sortBy}
              />
              {user?.isAdmin && (
                <button
                  className="catalog__blue-btn"
                  id="add-landmark"
                  style={{ marginTop: 0 }}
                  onClick={handleModalOpen}
                >
                  Добавить
                </button>
              )}
            </div>
            <div id="form-container">
              {user?.isAdmin && (
                <form
                  ref={formRef}
                  className="landmark__add"
                  style={
                    isModalVisible
                      ? {
                          transform: 'translateY(0)',
                          marginTop: '20px',
                        }
                      : {
                          transform: 'translateY(-1000px)',
                          marginTop: -formHeight,
                        }
                  }
                  onSubmit={handleFormLandmarkAdd}
                >
                  <div className="landmark__up-block">
                    <div className="landmark__title">
                      <h3>Добавление достопримечательности</h3>
                    </div>
                  </div>
                  <div className="landmark__add_choice-reviews">
                    <div className="landmark__add_choice-reviews_left-block">
                      <select name="filter" className="landmark__add_choice-reviews_filter">
                        <option value="Памятники">Памятники</option>
                        <option value="Музеи">Музеи</option>
                        <option value="Парки и сады">Парки и сады</option>
                        <option value="Храмы и церкви">Храмы и церкви</option>
                        <option value="Театры и культурные центры">
                          Театры и культурные центры
                        </option>
                        <option value="Фонтаны">Фонтаны</option>
                        <option value="Площади">Площади</option>
                      </select>
                      <button
                        className="landmark__add_photes-btn"
                        type="button"
                        id="add_photo"
                        onClick={handleAddPhoto}
                      >
                        Добавить фото
                      </button>
                    </div>
                    <div className="landmark__add-close" onClick={handleModalClose}>
                      Закрыть
                    </div>
                  </div>
                  <input
                    maxLength="60"
                    type="text"
                    name="title"
                    className="landmark__add_description title"
                    placeholder="Заголовок достопримечательности"
                    required=""
                  />
                  <textarea
                    minLength="100"
                    maxLength="1000"
                    type="text"
                    name="description"
                    className="landmark__add_description"
                    placeholder="Описание достопримечательности"
                    required=""
                  ></textarea>
                  <input
                    maxLength="50"
                    type="text"
                    name="adress"
                    className="landmark__add_elem-input"
                    placeholder="Адресс"
                    required=""
                  />
                  <input
                    type="url"
                    name="map"
                    className="landmark__add_elem-input"
                    placeholder="Ссылка на карту"
                    required=""
                  />
                  <div className="input-photo__container">
                    <input
                      type="url"
                      name="url"
                      className="landmark__add_elem-input"
                      placeholder="Ссылка на фото"
                      required=""
                    />
                  </div>
                  <input
                    id="postLandmark"
                    type="submit"
                    className="landmark__window_blue-btn"
                    value="Добавить достопримечательность"
                    required=""
                  />
                </form>
              )}
            </div>
            {searchTerm != '' && catalogItemsError && searchTerm != 'апрпапр' && (
              <div id="noResultsMessage">Ничего не найдено... :(</div>
            )}
            {catalogItemsError && searchTerm == '' && (
              <div id="noResultsMessage">Не удалось подключиться к серверу... :(</div>
            )}
            {searchTerm == 'апрпапр' ? (
              <div id="secretContainer" className="secret__plate">
                <img
                  src="./assets/img/catalog/secret.jpg"
                  className="secret__container_plate_img"
                />
                <div className="secret__plate_text">
                  <h4 className="secret__plate_title">апрпапр</h4>
                  <p className="secret__plate_description">секретка</p>
                </div>
              </div>
            ) : (
              ''
            )}
            {catalogItemsLoading && searchTerm != 'апрпапр' && (
              <div className="catalog__container" id="catalog__container">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <ContainerLoader key={`catalogLoader_${index}`} />
                  ))}
              </div>
            )}
            <Container catalogItems={catalogItems} />
            {paginationLength && (
              <Pagination
                currentPage={Number(currentPage)}
                paginationLength={paginationLength}
                onPageChange={selectCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Block
