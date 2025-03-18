import serviceimg from "../../assets/serviceimg.svg"
import serviceskillsimg from "../../assets/serviceskillsimg.svg"

import styles from "../../styles/service.module.css"

export default function Service(){
    return(
        <section className={styles.service}>
            <header className={styles.serviceheader}>
                <h1 className={styles.serviceheaderh1}>Popular Service</h1>
                <p className={styles.serviceheaderp}>Freelancing offers a wide range of in-demand services from web development and design 
                to content creation, marketing, and beyond. Whatever your project needs, we&apos;ve got the talent to make it happen.</p>
            </header>
            <div className={styles.serviceimgs}>
                <img className={styles.serviceimg} src={serviceimg.src} alt="" />
                <img src={serviceskillsimg.src} alt="" />
            </div>
        </section>
    )
}