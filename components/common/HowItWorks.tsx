import img1 from "../../assets/hiwimg1.svg"
import img2 from "../../assets/hiwimg2.svg"
import img3 from "../../assets/hiwimg3.svg"

import styles from "../../styles/howitworks.module.css"

export function HowItWorks() {
    return (
        <section className={styles.howitworks}>
            <header className={styles.howitworksheader}>
                <h1 className={styles.howitworksh1}>How it Works</h1>
                <p className={styles.howitworksp}>Easy to use. Easy to apply</p>
            </header>
            <div className={styles.howitworkscontents}>
                <div className={styles.howitworkscontent}>
                    <div className={styles.howitworkscontentdiv}>
                        <h2 className={styles.howitworksh2}>Connect wallet</h2>
                        <p className={styles.howitworksp}>Connect your keplr wallet to begin</p>
                    </div>
                    <img src={img1.src} alt="" />
                </div>
                <div className={styles.howitworkscontent}>
                    <div className={styles.howitworkscontentdiv}>
                        <h2 className={styles.howitworksh2}>Setup your account</h2>
                        <p className={styles.howitworksp}>Register an account as a client or freelancer</p>
                    </div>
                    <img src={img2.src} alt="" />
                </div>
                <div className={styles.howitworkscontent}>
                    <div className={styles.howitworkscontentdiv}>
                        <h2 className={styles.howitworksh2}>Post jobs. Find talent.</h2>
                        <p className={styles.howitworksp}>Post gigs as a client. search for and send proposals for jobs.</p>
                    </div>
                    <img src={img3.src} alt="" />
                </div>
            </div>
        </section>
    )
}