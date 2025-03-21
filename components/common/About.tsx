import aboutimg from "../../assets/aboutimg.svg"
import styles from "../../styles/about.module.css"
// import Image from 'next/image';

export function About() {
    return (
        <section className={styles.about}>
            <div className={styles.aboutcontents}>
                <h1 className={styles.aboutcontentsh1}><span className={styles.aboutcontentsh1span}>About</span> ATwork</h1>
                <p className={styles.aboutcontentsp}>ATwork streamlines the freelance hiring process, providing businesses with instant access to a network of skilled professionals. Our platform enables seamless collaborations, efficient project management, and exceptional results.</p>
                <p className={styles.aboutcontentsp}><span className={styles.aboutcontentspspan}>Our Mission</span> is to empower businesses to achieve their goals by providing a seamless and efficient platform for connecting with top freelance talent.
                Our Vision: To revolutionize the way businesses work with freelancers, making it easier, faster and more effective.</p>
            </div>
            <img className={styles.aboutimg} src={aboutimg} alt="" />
        </section>
    )
}