import styles from "../../styles/getstarted.module.css"

export function GetStarted(){
    return(
        <section className={styles.getstarted}>
            <h1 className={styles.h1}>Ready to Get started?</h1>
            <p className={styles.p}>Join our community of top freelancers and clients today</p>
            <div className={styles.buttons}>
                <button className={styles.button}>Post a Project</button>
                <button className={styles.button}>Become a Freelancer</button>
            </div>
        </section>
    )
}