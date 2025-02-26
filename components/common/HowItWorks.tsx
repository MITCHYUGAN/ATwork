import Himg1 from "../../assets/Himg1.svg"
import Himg2 from "../../assets/Himg2.svg"
import Himg3 from "../../assets/Himg3.svg"
import Himg4 from "../../assets/Himg4.svg"

import styles from "../../styles/howitworks.module.css"

export function HowItWorks(){
    return(
        <section className={styles.howitworks}>
            <h1 className={styles.h1one}>How It Works</h1>
            <p className={styles.p}>Follow these easy steps to enjoy quick access to top  freelancers on ATwork</p>
            <div className={styles.steps}>
                <div className={styles.step}>
                    <h1 className={styles.steph1}>01</h1>
                    <img src={Himg1.src} alt="" />
                    <h2 className={styles.steph2}>Connect Wallet</h2>
                    <p className={styles.stepp}>Connect your keplr wallet to begin</p>
                </div>
                <div className={styles.step}>
                    <h1 className={styles.steph1}>02</h1>
                    <img src={Himg2.src} alt="" />
                    <h2 className={styles.steph2}>Set up your Account</h2>
                    <p className={styles.stepp}>Register an account as a client or freelancer</p>
                </div>
                <div className={styles.step}>
                    <h1 className={styles.steph1}>03</h1>
                    <img src={Himg3.src} alt="" />
                    <h2 className={styles.steph2}>Manage your Profile</h2>
                    <p className={styles.stepp}>create your profile and bio let clients see what you do</p>
                </div>
                <div className={styles.step}>
                    <h1 className={styles.steph1}>04</h1>
                    <img src={Himg4.src} alt="" />
                    <h2 className={styles.steph2}>Post/Search for Jobs</h2>
                    <p className={styles.stepp}>Post gigs as a client. search for and send proposals for jobs.</p>
                </div>
            </div>
        </section>
    )
}