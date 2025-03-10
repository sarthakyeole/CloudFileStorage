import FirebaseAuth from '@/components/auth/FirebaseAuth'
import styles from '../styles/Auth.module.css'

const Auth = () => {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.authBox}>
                <FirebaseAuth />
            </div>
            <div className={styles.homeLink}>
                <a href="/" className={styles.homeButton}>Go Home</a>
            </div>
        </div>
        </>
    )
}

export default Auth
