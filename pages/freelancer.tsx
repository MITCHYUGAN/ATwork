import { Header } from "@/components/common/Header"
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { CHAIN_ID, CHAIN_NAME, CONTRACT_ADDRESS, RPC_ENDPOINT } from '@/config';
import checkmark from "../assets/checkmark.svg"
import styles from "../styles/freelancer.module.css"
import notificationimg from "../assets/notificationing.svg"
import activeprojectimg from "../assets/activeprojectimg.svg"
import rocket from "../assets/rocket.svg"
import { useEffect, useState } from "react";
import { Button } from "@interchain-ui/react";
import ApplyToProject from "@/components/actions/ApplyToProject";
import SubmitProject from "@/components/actions/SubmitProject";
import { db } from "@/lib/firebase"; // Import Firebase
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Firestore methods
import { truncateText } from "@/utils/truncate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// const [projects, setProjects] = useState<any[]>([]);

// const fetchProjects = async () => {
//     try {
//         const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);

//         // Query the contract for all jobs
//         const queryMsg = { list_jobs: { status: "Open", start_after: null, limit: 10 } };
//         const response = await client.queryContractSmart(CONTRACT_ADDRESS, queryMsg);

//         // Update state with the fetched jobs
//         setProjects(response.jobs);
//     } catch (err) {
//         console.error("Error fetching jobs:", err);
//     }
// }

// // Call fetchJobs when the component mounts
// useEffect(() => {
//     fetchProjects();
// }, []);


export default function Freelancer() {
    const { status } = useChain(CHAIN_NAME)
    const [applytoprojectmodalactive, setApplyToProjectModalActive] = useState(false)
    const [submitprojectmodalactive, setSubmitProjectModalActive] = useState(false)
    const [proposalAccepted, setProposalAccepted] = useState(true)
    const [name, setName] = useState("")
    const [jobs, setJobs] = useState<any[]>([]); // Store open jobs
    const [activeJobs, setActiveJobs] = useState<any[]>([]); // InProgress jobs
    const [notifications, setNotifications] = useState<any[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [freelancerAddress, setFreelancerAddress] = useState("");

    // Get freelancer's wallet address
    useEffect(() => {
        const getProfileNameAndAddress = async () => {
            try {
                if (!window.keplr) {
                    alert("Keplr Wallet not detected. Please install the Keplr extension.");
                    return;
                }
                const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
                const accounts = await offlineSigner.getAccounts();
                const address = accounts[0].address;
                setFreelancerAddress(address);

                // Query the contract to check if a profile exists
                const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
                const getProfileQuery = { get_profile: { address } };
                const profile = await client.queryContractSmart(CONTRACT_ADDRESS, getProfileQuery);
                setName(profile.profile.name)
                console.log("profile", profile);
                console.log("statename", name);

            } catch (err) {
                console.error("Error Getting Profile Name:", err);
            }
        };
        getProfileNameAndAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fetch open jobs from Firestore
    useEffect(() => {
        const q = query(collection(db, "jobs"), where("status", "==", "Open"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJobs(jobList);
        }, (error) => {
            console.error("Error fetching jobs:", error);
        });

        return () => unsubscribe(); // Clean up subscription
    }, []);

    // Fetch active (InProgress) jobs for this freelancer
    useEffect(() => {
        if (!freelancerAddress) return;
        const q = query(
            collection(db, "jobs"),
            where("status", "==", "InProgress"),
            where("freelancerAddress", "==", freelancerAddress)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setActiveJobs(jobList);
        }, (error) => {
            console.error("Error fetching active jobs:", error);
        });
        return () => unsubscribe();
    }, [freelancerAddress]);

    // Fetch freelancer's notifications
    useEffect(() => {
        if (!freelancerAddress) return;

        const notifsQuery = query(collection(db, "notifications"), where("recipientAddress", "==", freelancerAddress));
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
    }, [freelancerAddress]);

    const handleApplyClick = (jobId: string) => {
        setSelectedJobId(jobId);
        setApplyToProjectModalActive(true);
    };

    const handleSubmitClick = (jobId: string) => {
        setSelectedJobId(jobId);
        setSubmitProjectModalActive(true);
    };

    return (
        <div className={styles.freelancer}>
            <Header isConnectWallet={status === WalletStatus.Connected} />
            <main className={styles.freelancerPage}>
                {/* <h1>Hello Freelancer</h1> */}
                <section aria-label="Projects" className={styles.freelancerProjects}>
                    <div className={styles.freelancerProjectsSearch}>
                        <p>🔍</p>
                        <input className={styles.freelancerProjectsSearchInput} type="text" name="" id="" placeholder="Search for projects" />
                    </div>
                    {jobs.length === 0 ? (
                        <div className={styles.freelancerProject}>
                            <p>No open jobs available at the moment.</p>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className={styles.freelancerProject}>
                                <div>
                                    <span className={styles.freelancerProjectSpan}>
                                        Posted {Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60))} hours ago
                                    </span>
                                    <h1 className={styles.freelancerProjectH1}>{job.title}</h1>
                                </div>
                                <span className={styles.freelancerProjectSpan}>
                                    Budget: {parseInt(job.budget) / 1e6} tATOM - Est. Time: {Math.floor(job.deadline / 86400)} days
                                </span>
                                <p className={styles.freelancerProjectp}>{job.description}</p>
                                <div className={styles.freelancerProjectSkills}>
                                    {job.deliverables.map((skill: string, i: number) => (
                                        <span key={i} className={styles.freelancerProjectSkill}>{skill}</span>
                                    ))}
                                </div>
                                <div className={styles.freelancerProjectFooter}>
                                    <div className={styles.freelancerProjectFooterFunds}>
                                        <img src={checkmark.src} alt="" />
                                        <p className={styles.freelancerProjectFooterP}>Funds Verified</p>
                                    </div>
                                    <p className={styles.freelancerProjectFooterP}>
                                        Funding: <span className={styles.freelancerProjectFooterspan}>{parseInt(job.budget) / 1e6} tATOM</span>
                                    </p>
                                    <p className={styles.freelancerProjectFooterP}>
                                        Applicants: <span className={styles.freelancerProjectFooterspan}>0</span>
                                    </p>
                                    <Button onClick={() => {
                                        setSelectedJobId(job.id);
                                        setApplyToProjectModalActive(true);
                                    }}>
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}

                </section>
                <aside className={styles.freelancerAside}>
                    <section className={styles.freelancerNotifi}>
                        <h1 className={styles.freelancerNotifiH1}>Notification</h1>
                        <div className={styles.freelancerNotifidiv}>
                            <div className={styles.initialCircle}>{name.charAt(0).toUpperCase()}</div>
                            <div>
                                <h2 className={styles.freelancerNotifiH2}>ATwork profile created succes...</h2>
                                <p className={styles.freelancerNotifip}>2hr</p>
                            </div>
                        </div>
                        {notifications.length === 0 ? (
                            <p></p>
                        ) : (
                            notifications.map((notif) => (
                                <div key={notif.id} className={styles.freelancerNotifidiv}>
                                    <div className={styles.initialCircle}>{name.charAt(0).toUpperCase()}</div>
                                    <div>
                                        <h2 className={styles.freelancerNotifiH2}>{truncateText(notif.message, 30)}</h2>
                                        <p className={styles.freelancerNotifip}>
                                            {Math.floor((Date.now() - new Date(notif.timestamp).getTime()) / (1000 * 60 * 60))}hr
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                    <section className={styles.freelanceractiveproject}>
                        <h1 className={styles.freelanceractiveprojecth1}>Active Projects</h1>
                        {activeJobs.length === 0 ? (
                            <div className={styles.freelanceractiveprojectdiv}>
                                <img src={activeprojectimg.src} alt="" />
                                <p className={styles.freelanceractiveprojectp}>You don&apos;t have any active projects right now</p>
                            </div>
                        ) : (
                            activeJobs.map((job) => (
                                <div key={job.id} className={styles.freelanceractiveprojectitem}>
                                    <div className={styles.activeProjectHeader}>
                                        <div className={styles.initialCircle}>{job.title.charAt(0).toUpperCase()}</div>
                                        <div>
                                            <h2 className={styles.activeProjectTitle}>{job.title}</h2>
                                            <span className={styles.activeProjectBudget}>{parseInt(job.budget) / 1e6} tATOM</span>
                                        </div>
                                    </div>
                                    <div className={styles.activeProjectDetails}>
                                        <span className={styles.activeProjectDuration}>
                                            {Math.floor(job.deadline / 86400)}-{Math.floor(job.deadline / 43200)} weeks
                                        </span>
                                        <span className={styles.activeProjectStatus}>
                                            Now <span className={styles.statusDot}>•</span> Active
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() => handleSubmitClick(job.id)}
                                        rightIcon="arrowRightLine"
                                        className={styles.submitButton}
                                    >
                                        Submit Project
                                    </Button>
                                </div>
                            ))
                        )}
                    </section>
                    <div className={styles.freelancerGetStarted}>
                        <h1>Get started</h1>
                        <p>Begin your journey and connect with skilled professionals to accomplish your projects.</p>
                        <button className={styles.freelancerbtn}>Learn more ↗</button>
                        <img src={rocket.src} alt="" />
                    </div>
                </aside>
            </main>
            {applytoprojectmodalactive && <ApplyToProject setApplyToProjectModalActive={setApplyToProjectModalActive} jobId={selectedJobId} />}
            {submitprojectmodalactive && <SubmitProject setSubmitProjectModalActive={setSubmitProjectModalActive} jobId={selectedJobId} />}
        </div>
    )
}