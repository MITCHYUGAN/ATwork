import styles from "../../styles/herosection.module.css"
import landingpageimg from "../../assets/landingpage/landingpageimg.svg"
import landingpageusers from "../../assets/landingpage/landingusers.svg"
import devsvg from "../../assets/landingpage/landingdev.svg"
import brandsvg from "../../assets/landingpage/landingbrandstrategists.svg"
import uisvg from "../../assets/landingpage/landingui.svg"
import uxsvg from "../../assets/landingpage/landingux.svg"

export function HeroSection() {
    return (
        <section className={styles.herosection}>
            <div className={styles.herosectioncontents}>
                <h1 className={styles.herosectioncontentsh1}><span className={styles.herosectioncontentsh1span}>Where Talent </span> <br />Meets Opportunity</h1>
                <img className={`${styles.landingsvg} ${styles.landingsvgux}`} src={uxsvg.src} alt="" />
                <p className={styles.herosectioncontentsp}>Connecting top talent with groundbreaking projects across Web2 and Web3. <span className={styles.herosectioncontentspspan}>Hire smarter. Work better. Stay in control.</span></p>
                <img className={`${styles.landingsvg} ${styles.landingsvgdev}`} src={devsvg.src} alt="" />
                <img className={styles.herosectioncontentsimg} src={landingpageusers.src} alt="" />
            </div>
            <div className={styles.herosectionimgdiv}>
                <img className={`${styles.landingsvg} ${styles.landingsvgbrand}`} src={brandsvg.src} alt="" />
                <img className={styles.herosectionimg} src={landingpageimg.src} alt="" />
                <img className={`${styles.landingsvg} ${styles.landingsvgui}`} src={uisvg.src} alt="" />
            </div>
        </section>
    )
}