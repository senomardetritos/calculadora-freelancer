import styles from './loader.module.css'

export const Loader = () => {
    return (
        <span className={styles.loader}>
            <div className={styles.loaderContent}>
                <p>&#9679;</p>
                <p>&#9679;</p>
                <p>&#9679;</p>
            </div>
        </span>
    )
}