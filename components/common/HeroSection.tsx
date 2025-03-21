import styles from "../../styles/herosection.module.css"
import landingpageimg from "../../assets/landingpage/landingpageimg.svg"
import landingpageusers from "../../assets/landingpage/landingusers.svg"
import devsvg from "../../assets/landingpage/landingdev.svg"
import brandsvg from "../../assets/landingpage/landingbrandstrategists.svg"
import uisvg from "../../assets/landingpage/landingui.svg"
import uxsvg from "../../assets/landingpage/landingux.svg"
import Image from 'next/image';

export function HeroSection() {
    return (
        <section className={styles.herosection}>
            <div className={styles.herosectioncontents}>
                <h1 className={styles.herosectioncontentsh1}><span className={styles.herosectioncontentsh1span}>Where Talent </span> <br />Meets Opportunity</h1>
                <Image className={`${styles.landingsvg} ${styles.landingsvgux}`} src={uxsvg} alt="" />
                <p className={styles.herosectioncontentsp}>Connecting top talent with groundbreaking projects across Web2 and Web3. <span className={styles.herosectioncontentspspan}>Hire smarter. Work better. Stay in control.</span></p>
                <Image className={`${styles.landingsvg} ${styles.landingsvgdev}`} src={devsvg} alt="" />
                <img className={styles.herosectioncontentsimg} src={landingpageusers.src} alt="" />
            </div>
            <div className={styles.herosectionimgdiv}>
                <Image className={`${styles.landingsvg} ${styles.landingsvgbrand}`} src={brandsvg} alt="" />
                <Image className={styles.herosectionimg} width={450} src={landingpageimg} alt="" />
                <Image className={`${styles.landingsvg} ${styles.landingsvgui}`} src={uisvg} alt="" />
            </div>
        </section>
    )
}