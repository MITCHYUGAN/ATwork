import { Header } from "@/components/common/Header"
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { Button } from '@interchain-ui/react';
import { CHAIN_ID, CHAIN_NAME, CONTRACT_ADDRESS, RPC_ENDPOINT } from '@/config';
import checkmark from "../assets/checkmark.svg"
import styles from "../styles/client.module.css"
import notificationimg from "../assets/notificationing.svg"
import postProjectImg from "../assets/postProjectImg.svg"
import rocket from "../assets/rocket.svg"
import PostProject from "@/components/actions/PostProject";
import { useEffect, useState } from "react";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import ApproveProject from "@/components/actions/ApproveProject";
import AcceptProposal from "@/components/actions/AcceptProposal";
import { db } from "@/lib/firebase"; // Import Firebase
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Firestore methods
import { truncateText } from "@/utils/truncate";


export default function Client() {
    const { status } = useChain(CHAIN_NAME)
    const [postprojectmodalactive, setPostProjectModalActive] = useState(false)
    const [acceptProposalModalActive, setAcceptProposalModalActive] = useState(false)
    const [approveProjectModalActive, setApproveProjectModalActive] = useState(false)
    const [name, setName] = useState("")
    const [clientAddress, setClientAddress] = useState("");
    const [jobs, setJobs] = useState<any[]>([]); // Store client's jobs
    const [notifications, setNotifications] = useState<any[]>([])
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null); // For AcceptProposal modal

    const getProfileNameAndAddress = async () => {
        try {
            if (!window.keplr) {
                alert("Keplr Wallet not detected. Please install the Keplr extension.");
                return;
            }

            // Get the connected wallet address
            const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
            const accounts = await offlineSigner.getAccounts();
            const address = accounts[0].address;
            setClientAddress(address);

            // Query the contract to check if a profile exists
            const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
            const getProfileQuery = { get_profile: { address } };
            const profile = await client.queryContractSmart(CONTRACT_ADDRESS, getProfileQuery);
            setName(profile.profile.name)
        } catch (err) {
            console.error("Error Getting Profile Name:", err);
        }
    }

    // Fetch client's jobs
    useEffect(() => {
        if (!clientAddress) return;

        const jobsQuery = query(collection(db, "jobs"), where("clientAddress", "==", clientAddress));
        const unsubscribeJobs = onSnapshot(jobsQuery, (snapshot) => {
            const jobList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJobs(jobList);
        }, (error) => {
            console.error("Error fetching jobs:", error);
        });

        return () => unsubscribeJobs();
    }, [clientAddress]);

    // Fetch client's notifications
    useEffect(() => {
        if (!clientAddress) return;

        const notifsQuery = query(collection(db, "notifications"), where("recipientAddress", "==", clientAddress));
        const unsubscribeNotifs = onSnapshot(notifsQuery, (snapshot) => {
            const notifList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(notifList);
        }, (error) => {
            console.error("Error fetching notifications:", error);
        });

        return () => unsubscribeNotifs();
    }, [clientAddress]);

    useEffect(() => {
        getProfileNameAndAddress()
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
                        {jobs.length === 0 ? (
                            <div className={styles.clientNoProjectsDiv}>
                                <img src={postProjectImg.src} alt="" />
                                <p>No active job posts or contracts at the moment.</p>
                                <Button onClick={() => setPostProjectModalActive(true)} className={styles.clientbtn}>+ Post a Project</Button>
                            </div>
                        ) : (
                            // <div className={styles.clientProjectsList}>
                            //     { jobs.map((job) => (
                            //         <div key={job.id} className={styles.clientProject}>
                            //             <h2 className={styles.clientProjecth2}>{job.title}</h2>
                            //             <p className={styles.clientProjectp}>Status: {job.status}</p>
                            //             <p>Budget: {parseInt(job.budget) / 1e6} tATOM</p>
                            //             <p>Deadline: {Math.floor(job.deadline / 86400)} days</p>
                            //             <p>Deliverables: {job.deliverables.join(", ")}</p>
                            //             {job.status === "Applied" && (
                            //                 <Button onClick={() => {
                            //                     setSelectedJobId(job.id);
                            //                     setAcceptProposalModalActive(true);
                            //                 }}>
                            //                     Review Proposal
                            //                 </Button>
                            //             )}
                            //             {job.status === "Submitted" && (
                            //                 <Button
                            //                     onClick={() => {
                            //                         setSelectedJobId(job.id);
                            //                         setApproveProjectModalActive(true);
                            //                     }}
                            //                 >
                            //                     Review Submission
                            //                 </Button>
                            //             )}
                            //         </div>
                            //     )



                            //     )}

                            // </div>
                            jobs.map((job) => (
                                <div key={job.id} className={styles.clientProject}>
                                    <div>
                                        <span className={styles.clientProjectSpan}>
                                            Posted {Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60))} hours ago
                                        </span>
                                        <h1 className={styles.clientProjectH1}>{job.title}</h1>
                                    </div>
                                    <span className={styles.clientProjectSpan}>
                                        Budget: {parseInt(job.budget) / 1e6} tATOM - Est. Time: {Math.floor(job.deadline / 86400)} days
                                    </span>
                                    <p className={styles.clientProjectp}>{job.description}</p>
                                    <div className={styles.clientProjectSkills}>
                                        {job.deliverables.map((skill: string, i: number) => (
                                            <span key={i} className={styles.clientProjectSkill}>{skill}</span>
                                        ))}
                                    </div>
                                    <div className={styles.clientProjectFooter}>
                                        <div className={styles.clientProjectFooterFunds}>
                                            <img src={checkmark.src} alt="" />
                                            <p className={styles.clientProjectFooterP}>Funds Verified</p>
                                        </div>
                                        <p className={styles.clientProjectFooterP}>
                                            Funding: <span className={styles.clientProjectFooterspan}>{parseInt(job.budget) / 1e6} tATOM</span>
                                        </p>
                                        <p className={styles.clientProjectFooterP}>
                                            Status: <span className={styles.clientProjectFooterspan}>{job.status}</span>
                                        </p>
                                        {job.status === "Applied" && (
                                            <Button onClick={() => {
                                                setSelectedJobId(job.id);
                                                setAcceptProposalModalActive(true);
                                            }}>
                                                Review Proposal
                                            </Button>
                                        )}
                                        {job.status === "Submitted" && (
                                            <Button
                                                onClick={() => {
                                                    setSelectedJobId(job.id);
                                                    setApproveProjectModalActive(true);
                                                }}
                                            >
                                                Review Submission
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                    <div className={styles.clientAside}>
                        <section className={styles.clientNotifi}>
                            <h1 className={styles.clientNotifiH1}>Notification</h1>
                            <div className={styles.clientNotifidiv}>
                                <div className={styles.initialCircle}>{name.charAt(0).toUpperCase()}</div>
                                <div>
                                    <h2 className={styles.clientNotifiH2}>ATwork profile created succes...</h2>
                                </div>
                            </div>
                            {notifications.length === 0 ? (
                                <p></p>
                                // <p>No notifications yet.</p>
                            ) : (
                                notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => {
                                            if (notif.action === "viewProposal") {
                                                setSelectedJobId(notif.jobId);
                                                setAcceptProposalModalActive(true);
                                            } else if (notif.action === "viewSubmission") {
                                                setSelectedJobId(notif.jobId);
                                                setApproveProjectModalActive(true);
                                            }
                                        }}
                                        className={`${styles.clientNotifidiv} ${notif.action === "viewProposal" || notif.action === "viewSubmission" ? styles.clientNotifiProposal : ""}`}                                    >
                                        <div className={styles.initialCircle}>{name.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <h2 className={styles.clientNotifiH2}>{truncateText(notif.message, 30)}</h2>
                                            <p className={styles.clientNotifip}>
                                                {Math.floor((Date.now() - new Date(notif.timestamp).getTime()) / (1000 * 60 * 60))} hr
                                            </p>
                                        </div>
                                    </div>
                                ))
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
            {acceptProposalModalActive && <AcceptProposal setAcceptProposalModalActive={setAcceptProposalModalActive} jobId={selectedJobId} />}
            {approveProjectModalActive && <ApproveProject setApproveProjectModalActive={setApproveProjectModalActive} jobId={selectedJobId} />}
        </div>
    )
}