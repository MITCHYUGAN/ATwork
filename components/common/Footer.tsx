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
            <div>
                <img src={logo.src} alt="" />
                <p>Meet high paying clients and find top talents in one place using a single profile</p>
                <p>
                    Please note that ATwork does not use, hold or transact in any state sponsored fiat currency. Payments are transacted in atoms which is equivalent to
                </p>
            </div>
            <ul>
                <li>About</li>
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Support</li>
            </ul>
            <div>
                <p>Join our community on our socials</p>
                <div>
                    <img src={twitter.src} alt="" />
                    <img src={instagram.src} alt="" />
                    <img src={linkedin.src} alt="" />
                    <img src={discord.src} alt="" />
                </div>
            </div>
            <p>© 2025 ATwork. All rights reserved</p>
        </footer>
    )
}