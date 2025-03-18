import { Wallet } from "@/components";
import { Button } from '@interchain-ui/react';
import styles from "../../styles/signup.module.css";
import { useState, useEffect } from "react";
import { CompleteClientProfile } from "./CompleteClientProfile";
import { CompleteFreelancerProfile } from "./CompleteFreelancerProfile";
import freelancerimg from "../../assets/freelancerimg.webp";
import clientimg from "../../assets/clientimg.webp";
import checkmark from "../../assets/checkmark.svg";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useRouter } from "next/router";
import { CHAIN_ID, CONTRACT_ADDRESS, RPC_ENDPOINT, } from "@/config";

export function SignUp({ isConnectWallet }: { isConnectWallet: boolean }) {
    const [profile, setProfile] = useState("");
    const [hasProfile, setHasProfile] = useState(false);
    const router = useRouter();  // Use Next.js router for navigation

    useEffect(() => {
        if (!isConnectWallet) return;  // Only run when wallet is connected

        const checkProfile = async () => {
            if (!window.keplr) {
                alert("Keplr Wallet not detected. Please install the Keplr extension.");
                return;
            }

            try {
                // Get the connected wallet address
                const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
                const accounts = await offlineSigner.getAccounts();
                const address = accounts[0].address;

                // Query the contract to check if a profile exists
                const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
                const getProfileQuery = { get_profile: { address } };
                const profile = await client.queryContractSmart(CONTRACT_ADDRESS, getProfileQuery);

                console.log("profile", profile);
                console.log("profile profile", profile.profile.profile_type);

                if (profile) {
                    setHasProfile(true);
                    if (profile.profile.profile_type === "Client"){
                        router.push("/client");
                    } else if (profile.profile.profile_type === "Freelancer"){
                        router.push("/freelancer");
                    }
                }

            } catch (err: any) {
                if (err.message.includes("not found")) {
                    setHasProfile(false);  // No profile found
                } else {
                    console.error("Error checking profile:", err);
                }
            }
        };

        checkProfile();
    }, [isConnectWallet]);  // ✅ Depend on `isConnectWallet` to re-run when wallet connects

    return (
        <section className={styles.signupcomponent}>
            {!isConnectWallet ? (
                <>
                    <Wallet />
                    <h1 className={styles.h1}>Please connect Wallet to Proceed</h1>
                </>
            ) : (
                <>
                    {profile === "client" ? (
                        <CompleteClientProfile setProfile={setProfile} />
                    ) : profile === "freelancer" ? (
                        <CompleteFreelancerProfile setProfile={setProfile} />
                    ) : (
                        <div className={styles.selectProfile}>
                            <div className={styles.profileWrapper}>
                                <div className={styles.profile}>
                                    <h1 className={styles.profileh1}>💻 Continue as Freelancer</h1>
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
                                            <p>Get paid in crypto ($ATOM)</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => setProfile("freelancer")} className={styles.profileBtn} rightIcon="arrowRightLine">
                                        Continue as Freelancer
                                    </Button>
                                </div>
                                <div className={styles.profile}>
                                    <h1 className={styles.profileh1}>💼 Continue as Client</h1>
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
                    )}
                </>
            )}
        </section>
    );
}
