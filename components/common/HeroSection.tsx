import NextLink from 'next/link';
import { Button } from '@interchain-ui/react';
import styles from "../../styles/herosection.module.css"

export function HeroSection() {
    return (
        <section className={styles.herosection}>
            <div className={styles.herosectiondiv}>
                <h1 className={styles.h1}>Transform Your Business With Top Talents</h1>
                <p className={styles.p}>Get instant access to a network of skilled freelancers, ready to help you achieve your goals</p>
                <NextLink href="signup">
                    <Button className={styles.heroButton} rightIcon="arrowRightLine">
                        Get Started
                    </Button>
                </NextLink>
            </div>
        </section>
    )
}