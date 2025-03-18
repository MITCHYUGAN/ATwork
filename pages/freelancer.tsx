import { Header } from "@/components/common/Header"
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/config';
import checkmark from "../assets/checkmark.svg"
import styles from "../styles/freelancer.module.css"
import notificationimg from "../assets/notificationing.svg"
import activeprojectimg from "../assets/activeprojectimg.svg"
import rocket from "../assets/rocket.svg"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { CHAIN_ID, CONTRACT_ADDRESS, RPC_ENDPOINT } from "@/config";
import { useEffect, useState } from "react";
import { Button } from "@interchain-ui/react";
import ApplyToProject from "@/components/actions/ApplyToProject";
import SubmitProject from "@/components/actions/SubmitProject";

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
                    {/* {projects.map((job, index) => (
                        <div key={index} className={styles.freelancerProject}>
                            <div>
                                <span className={styles.freelancerProjectSpan}>Posted {job.deadline} hours ago</span>
                                <h1 className={styles.freelancerProjectH1}>{job.title}</h1>
                            </div>
                            <span className={styles.freelancerProjectSpan}>Budget: {job.budget} ATOM</span>
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
                                <p className={styles.freelancerProjectFooterP}>Funding: <span className={styles.freelancerProjectFooterspan}>{job.budget} ATOM</span></p>
                                <p className={styles.freelancerProjectFooterP}>Applicants: <span className={styles.freelancerProjectFooterspan}>0</span></p>
                            </div>
                        </div>
                    ))} */}
                    <div className={styles.freelancerProject}>
                        <div>
                            <span className={styles.freelancerProjectSpan}>Posted 3 hours ago</span>
                            <h1 className={styles.freelancerProjectH1}>Web Designer - UIUX</h1>
                        </div>
                        <span className={styles.freelancerProjectSpan}>Hourly: 2.5 ATOM - Est. Time: 1 to 3 weeks </span>
                        <p className={styles.freelancerProjectp}>Our web designer is responsible for creating the visual layout and aesthetic of a website, including its overall design, user interface (UI), and user experience (UX), by utilizing graphic design principles in Figma, Illustrator and Photoshop and coding languages like HTML....</p>
                        <div className={styles.freelancerProjectSkills}>
                            <span className={styles.freelancerProjectSkill}>Web Design</span>
                            <span className={styles.freelancerProjectSkill}>UIUX Design</span>
                            <span className={styles.freelancerProjectSkill}>Prototyping</span>
                        </div>
                        <div className={styles.freelancerProjectFooter}>
                            <div className={styles.freelancerProjectFooterFunds}>
                                <img src={checkmark.src} alt="" />
                                <p className={styles.freelancerProjectFooterP}>Funds Verified</p>
                            </div>
                            <p className={styles.freelancerProjectFooterP}>Funding: <span className={styles.freelancerProjectFooterspan}>50.5 ATOM</span></p>
                            <p className={styles.freelancerProjectFooterP}>Applicants: <span className={styles.freelancerProjectFooterspan}>5 to 10</span></p>
                            <Button onClick={() => setApplyToProjectModalActive(true)}>Apply</Button>
                        </div>
                    </div>
                    <div className={styles.freelancerProject}>
                        <div>
                            <span className={styles.freelancerProjectSpan}>Posted 3 hours ago</span>
                            <h1 className={styles.freelancerProjectH1}>Web Designer - UIUX</h1>
                        </div>
                        <span className={styles.freelancerProjectSpan}>Hourly: 2.5 ATOM - Est. Time: 1 to 3 weeks </span>
                        <p className={styles.freelancerProjectp}>Our web designer is responsible for creating the visual layout and aesthetic of a website, including its overall design, user interface (UI), and user experience (UX), by utilizing graphic design principles in Figma, Illustrator and Photoshop and coding languages like HTML....</p>
                        <div className={styles.freelancerProjectSkills}>
                            <span className={styles.freelancerProjectSkill}>Web Design</span>
                            <span className={styles.freelancerProjectSkill}>UIUX Design</span>
                            <span className={styles.freelancerProjectSkill}>Prototyping</span>
                        </div>
                        <div className={styles.freelancerProjectFooter}>
                            <div className={styles.freelancerProjectFooterFunds}>
                                <img src={checkmark.src} alt="" />
                                <p className={styles.freelancerProjectFooterP}>Funds Verified</p>
                            </div>
                            <p className={styles.freelancerProjectFooterP}>Funding: <span className={styles.freelancerProjectFooterspan}>50.5 ATOM</span></p>
                            <p className={styles.freelancerProjectFooterP}>Applicants: <span className={styles.freelancerProjectFooterspan}>5 to 10</span></p>
                        </div>
                    </div>
                </section>
                <aside className={styles.freelancerAside}>
                    <section className={styles.freelancerNotifi}>
                        <h1 className={styles.freelancerNotifiH1}>Notification</h1>
                        <div className={styles.freelancerNotifidiv}>
                            <img src={notificationimg.src} alt="" />
                            <div>
                                <h2 className={styles.freelancerNotifiH2}>ATwork profile created succesfully</h2>
                                <p className={styles.freelancerNotifip}>2hr</p>
                            </div>
                        </div>
                        {proposalAccepted && (
                            <div className={styles.freelancerNotifidiv}>
                                <img src={notificationimg.src} alt="" />
                                <div>
                                    <h2 className={styles.freelancerNotifiH2}>Your proposal has been accepted</h2>
                                    <p className={styles.freelancerNotifip}>now</p>
                                </div>
                            </div>
                        )}
                    </section>
                    <section className={styles.freelanceractiveproject}>
                        <h1 className={styles.freelanceractiveprojecth1}>Active Projects</h1>
                        {proposalAccepted ? (
                            <div>
                                <p>Project Title (active)</p>
                                <Button onClick={() => setSubmitProjectModalActive(true)} rightIcon="arrowRightLine">Submit Project</Button>
                            </div>
                        ) : (
                            <div className={styles.freelanceractiveprojectdiv}>
                                <img src={activeprojectimg.src} alt="" />
                                <p className={styles.freelanceractiveprojectp}>You don’t have any active project right now</p>
                            </div>
                        )}
                    </section>
                    <div className={styles.clientGetStarted}>
                        <h1 className={styles.clientGetStartedH1}>Get started</h1>
                        <p className={styles.clientGetStartedP}>Begin your journey and connect with skilled professionals to accomplish your projects.</p>
                        <Button className={`${styles.clientbtn} ${styles.clientbtn2}`}>Learn more ↗</Button>
                        <img src={rocket.src} className={styles.clientRocket} alt="" />
                    </div>
                </aside>
            </main>
            {applytoprojectmodalactive && <ApplyToProject setApplyToProjectModalActive={setApplyToProjectModalActive} />}
            {submitprojectmodalactive && <SubmitProject setSubmitProjectModalActive={setSubmitProjectModalActive} />}
        </div>
    )
}