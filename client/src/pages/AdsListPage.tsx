import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { useDebounce } from "../hooks/useDebounce"
import { itemsApi } from "../api/items"
import AdCard from "../components/AdCard/AdCard"
import Pagination from "../components/Pagination/Pagination"
import type { Category, ItemsResponse } from "../types"
import styles from './AdsListPage.module.scss'

const LIMIT = 5
const CATEGORIES: {value: Category, label: string}[] = [
  {value: 'electronics', label: 'Электроника'},
  {value: 'auto', label: 'Транспорт'},
  {value: 'real_estate', label: 'Недвижимость'},
]

const AdsListPage = () => {

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectCategories, setSelectCategories] = useState<Category[]>([])
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [sortColumn, setSortColumn ] = useState<'title' | 'createdAt'>('createdAt')
  const [needsRevision, setNeedsRevision] = useState(false)

  const debouncedSearch = useDebounce(search, 400)

  const { data, loading, error } = useFetch<ItemsResponse>(
    (signal) => 
      itemsApi.getAll({
        signal,
        q: debouncedSearch,
        categories: selectCategories,
        needsRevision: needsRevision || undefined,
        sortColumn,
        sortDirection,
        limit: LIMIT,
        skip: (page-1) * LIMIT,
      }),
    [debouncedSearch, selectCategories, needsRevision, sortColumn, sortDirection, page]
  )

  const toggelCategories = (cat: Category) => {
    setPage(1)
    setSelectCategories((prev) => 
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const resetFilters = () => {
    setPage(1)
    setSelectCategories([])
    setNeedsRevision(false)
    setSearch('')
  }


  return (
    <div className={styles.loyuot}>
      <section className="userInfo">
        <h1 className={styles.title}>Мои объявления</h1>
        {data && <span className={styles.count}>{data.total} объявления</span>}
      </section>

      <section className={styles.adsList}>
        <div className={styles.filters}>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Найти объявление..."
            value={search}
            onChange={(e) => {setSearch(e.target.value); setPage(1)}}
          />
          <div className={styles.btn}>
            <button></button>
            <button></button>
          </div>
          <select
            className={styles.select}
            value={`${sortColumn}_${sortDirection}`}
            onChange={(e) => {
              const [col, dir] = e.target.value.split('_')
              setSortColumn(col as 'title' || 'createdAt')
              setSortDirection(dir as 'asc' || 'desc')
              setPage(1)
            }}
          >
            <option value="createdAt_desc">По новизне (сначала новые)</option>
            <option value="createdAt_asc">По новизне (сначала старые)</option>
            <option value="title_asc">По названию (А - Я)</option>
            <option value="title_desc">По названию (Я - А)</option>
          </select>
        </div>
        <div className="content">
          <aside>
            <div className={styles.aside_content}>
              <h2>Фильтры</h2>
              <details>
                <summary>Категория</summary>
                {CATEGORIES.map((cat) => (
                  <label key={cat.value} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={selectCategories.includes(cat.value)}
                      onChange={()=>toggelCategories(cat.value)}
                    />
                    {cat.label}
                  </label>
                ))}
              </details>
              <div className={styles.line}></div>
              <label>
                Только требующие доработок
                <input 
                  type="checkbox" 
                  checked={needsRevision}
                  onChange={ (e) => { setNeedsRevision(e.target.checked); setPage(1) }}
                />
                <span></span>
              </label>
            </div>
            <button className={styles.resetBtn} onClick={resetFilters}>Сбросить фильтры</button>
          </aside>
          <div className="ads">
            {loading && <p className={styles.message}>Загрузка...</p>}
            {error && <p className={styles.error}>Ошибка: {error}</p>}

            {!loading && !error && data?.items.length === 0 && (
              <p className={styles.message}>Ошибка: Объявления не найдены</p>
            )}

            {data && (
              <>
                <div className={styles.grid}>
                  {data.items.map((item)=>(
                    <AdCard key={item.id} item={item} />
                  ))}
                </div>
                <Pagination 
                  page={page}
                  total={data.total}
                  limit={LIMIT}
                  onChange={setPage}
                />
              </>
            )}
          </div>

        </div>
      </section>
    </div>
  )

}

export default AdsListPage