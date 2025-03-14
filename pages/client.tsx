import { Header } from "@/components/common/Header"
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { Button } from '@interchain-ui/react';
import { CHAIN_ID, CHAIN_NAME, CONTRACT_ADDRESS, RPC_ENDPOINT } from '@/config';
import styles from "../styles/client.module.css"
import notificationimg from "../assets/notificationing.svg"
import postProjectImg from "../assets/postProjectImg.svg"
import rocket from "../assets/rocket.svg"
import PostProject from "@/components/common/PostProject";
import { useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";


export default function client() {
    const { status } = useChain(CHAIN_NAME)
    const [postprojectmodalactive, setPostProjectModalActive] = useState(true)
    const [name, setName] = useState("")

    const getProfileName = async () => {

        if (!window.keplr) {
            alert("Keplr Wallet not detected. Please install the Keplr extension.");
            return;
        }

        // Get the connected wallet address
        const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
        const accounts = await offlineSigner.getAccounts();
        const address = accounts[0].address;

        // Query the contract to check if a profile exists
        const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
        const getProfileQuery = { get_profile: { address } };
        const profile = await client.queryContractSmart(CONTRACT_ADDRESS, getProfileQuery);
        setName(profile.profile.name)
    }

    getProfileName()

    return (
        <div className={styles.client}>
            <Header isConnectWallet={status === WalletStatus.Connected} />
            <main className={styles.clientPage}>
                <div className={styles.clientPageHeader}>
                    <h1>Hello {name}</h1>
                    <Button onClick={() => setPostProjectModalActive(true)} className={`${styles.clientbtn} ${styles.clientbtn1}`}>+ Post a Project</Button>
                </div>
                <div className={styles.clientPageContent}>
                    <section className={styles.clientProjects}>
                        <h1 className={styles.clientProjectsH1}>Project Overview</h1>
                        <div className={styles.clientNoProjectsDiv}>
                            <img src={postProjectImg.src} alt="" />
                            <p>No active job posts or contracts at the moment.</p>
                            <Button onClick={() => setPostProjectModalActive(true)} className={styles.clientbtn}>+ Post a Project</Button>
                        </div>
                    </section>
                    <div className={styles.clientAside}>
                        <section className={styles.clientNotifi}>
                            <h1 className={styles.clientNotifiH1}>Notification</h1>
                            <div className={styles.clientNotifidiv}>
                                <img src={notificationimg.src} alt="" />
                                <div>
                                    <h2 className={styles.clientNotifiH2}>ATwork profile created succes...</h2>
                                    <p>now</p>
                                </div>
                            </div>
                        </section>
                        <section className={styles.clientGetStarted}>
                            <h1 className={styles.clientGetStartedH1}>Get started</h1>
                            <p className={styles.clientGetStartedP}>Begin your journey and connect with skilled professionals to accomplish your projects.</p>
                            <Button className={`${styles.clientbtn} ${styles.clientbtn2}`}>Learn more ↗</Button>
                            <img src={rocket.src} className={styles.clientRocket} alt="" />
                        </section>
                    </div>
                </div>
            </main>
            {postprojectmodalactive && <PostProject setPostProjectModalActive={setPostProjectModalActive} />}
        </div>
    )
}