import styles from "../../styles/reviews.module.css"
import Rimg1 from "../../assets/Rimg1.svg"
import Rimg2 from "../../assets/Rimg2.svg"
import Rimg3 from "../../assets/Rimg3.svg"

export function Reviews(){
    return(
        <section className={styles.reviews}>
            <h1 className={styles.h1}>What Users Say</h1>
            <div className={styles.reviewWrapper}>
                <div className={styles.review}>
                    <div className={styles.reviewHeader}>
                        <img src={Rimg1.src} alt="" />
                        <div>
                            <h2 className={styles.h2}>Zoe McConnor</h2>
                            <h3 className={styles.h3}>CEO of XYZ Corp</h3>
                        </div>
                    </div>
                    <p className={styles.reviewparagraph}>“I was blown away by the quality of work from the freelancer I hired. The redesign to our website was nothing short of brilliant”</p>
                    <button className={styles.button}>Learn more ➡️</button>
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewHeader}>
                        <img src={Rimg2.src} alt="" />
                        <div>
                            <h2 className={styles.h2}>Jane Denham</h2>
                            <h3 className={styles.h3}>Digital Marketer</h3>
                        </div>
                    </div>
                    <p className={styles.reviewparagraph}>“It's easy getting gigs on Atwork. I have worked with a number of great clients with a reliable payment service. It's awesome”</p>
                    <button className={styles.button}>Learn more ➡️</button>
                </div>
                <div className={styles.review}>
                    <div className={styles.reviewHeader}>
                        <img src={Rimg3.src} alt="" />
                        <div>
                            <h2 className={styles.h2}>Ahmed Khalid</h2>
                            <h3 className={styles.h3}>Frontend Developer</h3>
                        </div>
                    </div>
                    <p className={styles.reviewparagraph}>“With Atwork, I don't worry about getting clients or getting paid. The Platform is so well design to protect client and professional”</p>
                    <button className={styles.button}>Learn more ➡️</button>
                </div>
            </div>
        </section>
    )
}