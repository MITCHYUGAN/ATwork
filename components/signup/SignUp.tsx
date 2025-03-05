import { Wallet } from "@/components";
import { Button } from '@interchain-ui/react';
import styles from "../../styles/signup.module.css";
import { useState } from "react";
import { CompleteClientProfile } from "./CompleteClientProfile";
import { CompleteFreelancerProfile } from "./CompleteFreelancerProfile";
import freelancerimg from "../../assets/freelancerimg.webp"
import clientimg from "../../assets/clientimg.webp"
import checkmark from "../../assets/checkmark.svg"

export function SignUp({ isConnectWallet }: { isConnectWallet: boolean }) {
    const [profile, setProfile] = useState("");

    return (
        <>
            <section className={styles.signupcomponent}>
                {!isConnectWallet ? (
                    <>
                        <Wallet />
                        <h1 className={styles.h1}>Pls connect Wallet to Proceed</h1>
                    </>
                ) : (
                    <>{
                        profile === "client" ? (
                            <>
                                <button onClick={() => setProfile("")}>🔙</button>
                                <CompleteClientProfile />
                            </>
                        ) : profile === "freelancer" ? (
                            <>
                                <button onClick={() => setProfile("")}>🔙</button>
                                <CompleteFreelancerProfile />
                            </>
                        ) : (
                            <div className={styles.selectProfile}>
                                {/* <h1 className={styles.h1}>Join as a Freelancer or Client</h1> */}
                                <div className={styles.profileWrapper}>
                                    <div className={styles.profile}>
                                        <h1>💻 Continue as Freelancer</h1>
                                        <p>Create a profile to start submitting, and get notified on new work opportunities</p>
                                        <div className={styles.profileContent}>
                                            <img src={freelancerimg.src} className={`${styles.profileImg} ${styles.profileImgFreelancer}`} alt="" />
                                            <div className={styles.profileChecks}>
                                                <img src={checkmark.src} alt="" />
                                                <p>Contribute to top Cosmos projects</p>
                                            </div>
                                            <div className={styles.profileChecks}>
                                                <img src={checkmark.src} alt="" />
                                                <p>Build your Web3 resume</p>
                                            </div>
                                            <div className={styles.profileChecks}>
                                                <img src={checkmark.src} alt="" />
                                                <p>Get paid in crypto($ATOM)</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => setProfile("freelancer")} className={styles.profileBtn} rightIcon="arrowRightLine">
                                            Continue as Freelancer
                                        </Button>
                                    </div>
                                    <div className={styles.profile}>
                                        <h1>💼 Continue as Client</h1>
                                        <p>List a bounty or freelance gig for your project and find your next contributor</p>
                                        <div className={styles.profileContent}>
                                            <img src={clientimg.src} className={styles.profileImg} alt="" />
                                            <div className={styles.profileChecks}>
                                                <img src={checkmark.src} alt="" />
                                                <p>Get in front of 10,000 weekly visitors</p>
                                            </div>
                                            <div className={styles.profileChecks}>
                                                <img src={checkmark.src} alt="" />
                                                <p>20+ templates to choose from</p>
                                            </div>
                                            <div className={styles.profileChecks}>
                                                <img src={checkmark.src} alt="" />
                                                <p>100% free</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => setProfile("client")} className={`${styles.profileBtn} ${styles.profileBtnclient}`} rightIcon="arrowRightLine">
                                            Continue as Client
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    </>

                )}
            </section>
        </>
    )
}
