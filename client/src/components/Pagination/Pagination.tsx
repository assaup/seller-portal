import ChevronLeft from '../icons/ChevronLeft'
import ChevronRight from '../icons/ChevronRight'
import styles from './Pagination.module.scss'

type Props = {
    page: number,
    total: number,
    limit: number,
    onChange: (page: number) => void
}

const Pagination = (props: Props) => {
    const {
        page,
        limit,
        total,
        onChange
    }:Props = props

    const totalPages = Math.ceil(total / limit)
    if (totalPages <= 1) return null

    const getPageNumbers = (page:number, totalPages: number) => {
        let start = page - 2
        start = Math.max(1, start)
        let end = start + 4
        end = Math.min(totalPages, end)
        if (end === totalPages){
            start = Math.max(1, end - 4)
        }
        return Array.from({length: end - start + 1}, (_, i) => start + i)
    }

    return (
        <div className={styles.pagination}>
            <button
                className={styles.btn}
                disabled={page===1}
                onClick={() => onChange(page-1)}
            >
                <ChevronLeft />
            </button>
            {getPageNumbers(page, totalPages).map((i) => {
                return (
                <button
                    key={i}
                    onClick={()=>onChange(i)}
                    className={i === page ? `${styles.btn} ${styles.btn_active}` : styles.btn}
                >
                    {i}
                </button>)
            })}
            <button
                className={styles.btn}
                disabled={page===totalPages}
                onClick={() => onChange(page+1)}
            >
                <ChevronRight />
            </button>
        </div>
    )

}

export default Pagination