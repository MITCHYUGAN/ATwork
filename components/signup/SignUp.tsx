import { Wallet } from "@/components";
import { WalletStatus } from '@cosmos-kit/core';

import styles from "../../styles/signup.module.css"

export function SignUp() {

    console.log("Wallet Status", WalletStatus);
    
    return (
        <section className={styles.signupcomponent}>
            <Wallet />
            {/* <h1 className={styles.h1}>Pls connect Wallet to Proceed</h1> */}
            <div className={styles.selectProfile}>
                <h1 className={styles.h1}>Join as a Client or Freelancer</h1>
                <div className={styles.profileWrapper}>
                    <div className={styles.profile}>
                        {/* <img src="" alt="" /> */}
                        <h1 className={styles.profilevector}>💼</h1>
                        <div>
                            <h2>I'm a Client</h2>
                            <p>Seeking skilled professionals.</p>
                        </div>
                    </div>
                    <div className={styles.profile}>
                        {/* <img src="" alt="" /> */}
                        <h1 className={styles.profilevector}>💻</h1>
                        <div>
                            <h2>I'm a Freelancer</h2>
                            <p>Seeking for opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}