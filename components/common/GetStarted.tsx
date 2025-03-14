import { Button } from "@interchain-ui/react"
import styles from "../../styles/getstarted.module.css"
import getsbackgroundimg1 from "../../assets/landingpage/getsbackgroundimg1.svg"
import getsbackgroundimg2 from "../../assets/landingpage/getsbackgroundimg2.svg"
import getssvg1 from "../../assets/landingpage/getssvg1.svg"
import getssvg2 from "../../assets/landingpage/getssvg2.svg"
import getssvg3 from "../../assets/landingpage/getssvg3.svg"

export function GetStarted(){
    return(
        <section className={styles.getstarted}>
            <img className={`${styles.getsbackgroundimg} ${styles.getsbackgroundimg1}`} src={getsbackgroundimg1.src} alt="" />
            <img className={styles.getssvg1} src={getssvg1.src} alt="" />
            <img className={styles.getssvg2} src={getssvg2.src} alt="" />
            <h1 className={styles.h1}>Ready to Get started?</h1>
            <p className={styles.p}>Join our community of top freelancers and clients today</p>
            <div className={styles.buttons}>
                <Button className={`${styles.button} ${styles.button1}`}>Post a Project</Button>
                <Button className={`${styles.button} ${styles.button2}`}>Become a Freelancer</Button>
            </div>
            <img className={styles.getssvg3} src={getssvg3.src} alt="" />
            <img className={styles.getsbackgroundimg} src={getsbackgroundimg2.src} alt="" />
        </section>
    )
}