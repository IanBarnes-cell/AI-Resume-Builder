import styles from "./Card.module.css";

type CardProps = {
    title: string;
    children: React.ReactNode;
};

function Card({ title, children }: CardProps) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            
            {children}
        </div>
    );
}

export default Card;