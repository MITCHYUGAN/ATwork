import { Divider } from "@interchain-ui/react";
import logo from "../../assets/ATwork.svg"
import twitter from "../../assets/twitter.svg"
import instagram from "../../assets/instagram.svg"
import linkedin from "../../assets/linkedin.svg"
import discord from "../../assets/discord.svg"

import styles from "../../styles/footer.module.css"

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footercontents}>
                <div className={styles.footercontent}>
                    <img src={logo.src} alt="" />
                    <p>Connect with high-paying clients and discover top-tier talent all in one place, with just a single profile.</p>
                    <p>
                        Note: ATwork operates independently of state-sponsored fiat currencies. All payments are transacted in Atoms, our secure and efficient digital currency, ensuring seamless, borderless transactions.
                    </p>
                </div>
                <ul className={styles.footerlist}>
                    <li>About</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>Customer Support</li>
                </ul>
                <div className={styles.footersocialswrapper}>
                    <p>Join our community</p>
                    <div className={styles.footersocials}>
                        <img src={twitter.src} alt="" />
                        <img src={instagram.src} alt="" />
                        <img src={linkedin.src} alt="" />
                        <img src={discord.src} alt="" />
                    </div>
                </div>
            </div>
            <p className={styles.footercopyright}>© 2025 ATwork. All rights reserved</p>
        </footer>
    )
}