import { Header } from "@/components/common/Header"
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { Button } from '@interchain-ui/react';
import { CHAIN_ID, CHAIN_NAME, CONTRACT_ADDRESS, RPC_ENDPOINT } from '@/config';
import styles from "../styles/client.module.css"
import notificationimg from "../assets/notificationing.svg"
import postProjectImg from "../assets/postProjectImg.svg"
import rocket from "../assets/rocket.svg"
import PostProject from "@/components/actions/PostProject";
import { useEffect, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import ApproveProject from "@/components/actions/ApproveProject";
import AcceptProposal from "@/components/actions/AcceptProposal";


export default function Client() {
    const { status } = useChain(CHAIN_NAME)
    const [postprojectmodalactive, setPostProjectModalActive] = useState(false)
    const [acceptProposalModalActive, setAcceptProposalModalActive] = useState(false)
    const [approveProjectModalActive, setApproveProjectModalActive] = useState(false)
    const [proposalSubmitted, setProposalSubmitted] = useState(true)
    const [projectSubmitted, setProjectSubmitted] = useState(true)
    const [name, setName] = useState("")

    const getProfileName = async () => {
        try{
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
        } catch (err) {
            console.error("Error Getting Profile Name:", err);
        }
    }

    // const verifyWalletConnected = () => {
    //     status !== WalletStatus.Connected
    //     window.location.href = "/join"; // Redirect to join page
    // }

    useEffect(() => {
        getProfileName()
        // verifyWalletConnected()
    }, []);

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
                        {/* Project should be dispayed on the client page also, when submitted. displayed here most likely*/}
                    </section>
                    <div className={styles.clientAside}>
                        <section className={styles.clientNotifi}>
                            <h1 className={styles.clientNotifiH1}>Notification</h1>
                            <div className={styles.clientNotifidiv}>
                                <img src={notificationimg.src} alt="" />    
                                <div>
                                    <h2 className={styles.clientNotifiH2}>ATwork profile created succes...</h2>
                                    <p className={styles.clientNotifip}>Now</p>
                                </div>
                            </div>
                            {proposalSubmitted && (
                                <div onClick={() => setAcceptProposalModalActive(true)} className={`${styles.clientNotifidiv} ${styles.clientNotifiProposal}`}>
                                    <img src={notificationimg.src} alt="" />
                                    <div>
                                        <h2 className={styles.clientNotifiH2}>You have a proposal for the pr...</h2>
                                        <p className={styles.clientNotifip}>Now</p>
                                    </div>
                                </div>
                            )}
                            {projectSubmitted && (
                                <div onClick={() => setApproveProjectModalActive(true)} className={`${styles.clientNotifidiv} ${styles.clientNotifiProposal}`}>
                                    <img src={notificationimg.src} alt="" />
                                    <div>
                                        <h2 className={styles.clientNotifiH2}>Freelancer has made a submi...</h2>
                                        <p className={styles.clientNotifip}>Now</p>
                                    </div>
                                </div>
                            )}
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
            {acceptProposalModalActive && <AcceptProposal setAcceptProposalModalActive={setAcceptProposalModalActive} />}
            {approveProjectModalActive && <ApproveProject setApproveProjectModalActive={setApproveProjectModalActive} />}
        </div>
    )
}