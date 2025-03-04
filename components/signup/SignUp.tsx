import { Wallet } from "@/components";
import styles from "../../styles/signup.module.css";
import { useState } from "react";
import { CompleteClientProfile } from "./CompleteClientProfile";
import { CompleteFreelancerProfile } from "./CompleteFreelancerProfile";

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
                        ): profile === "freelancer" ? (
                            <>
                                <button onClick={() => setProfile("")}>🔙</button>
                                <CompleteFreelancerProfile />
                            </>
                        ) : (
                            <div className={styles.selectProfile}>
                                <h1 className={styles.h1}>Join as a Freelancer or Client</h1>
                                <div className={styles.profileWrapper}>
                                    <div className={styles.profile}>
                                        <h1 className={styles.profilevector}>💻</h1>
                                        <div>
                                            <h2>I'm a Freelancer</h2>
                                            <p>Seeking opportunities.</p>
                                        </div>
                                        <button onClick={() => setProfile("freelancer")}>Continue as Freelancer</button>
                                    </div>
                                    <div className={styles.profile}>
                                        <h1 className={styles.profilevector}>💼</h1>
                                        <div>
                                            <h2>I'm a Client</h2>
                                            <p>Seeking skilled professionals.</p>
                                        </div>
                                        <button onClick={() => setProfile("client")}>Continue as Client</button>
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
