import { Link } from "react-router-dom"
import type { ItemListItem } from "../../types"
import styles from './AdCard.module.scss'


const CATEGOTY_LABELS: Record<string, string> = {
    electronics: 'Электроника',
    auto: 'Транспорт',
    real_estate: 'Недвижимость',
}

type Props = { item: ItemListItem }


const AdCard = (props:Props) => {
    const { item }:Props  = props

    return (
        <Link to={`/ads/${item.id}`} className={styles.card}>
            <div className={styles.img}>
                <img src={`https://placehold.co/300x200?text=${encodeURIComponent(item.title)}`} alt={item.title} />
            </div>
            <div className={styles.body}>
                <span className={styles.category}>{CATEGOTY_LABELS[item.category]}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.price}>{item.price.toLocaleString('ru-RU')} ₽</p>
                {item.needsRevision && (
                    <span className={styles.badge}>Требует доработок</span>
                )}
            </div>
        </Link>
    )
}


export default AdCard