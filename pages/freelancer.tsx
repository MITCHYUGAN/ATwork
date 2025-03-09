import { Header } from "@/components/common/Header"
import { WalletStatus } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react';
import { CHAIN_NAME } from '@/config';
import checkmark from "../assets/checkmark.svg"
import styles from "../styles/freelancer.module.css"
import notificationimg from "../assets/notificationing.svg"
import activeprojectimg from "../assets/activeprojectimg.svg"
import rocket from "../assets/rocket.svg"


export default function freelancer() {
    const { status } = useChain(CHAIN_NAME)

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
                                <h2 className={styles.freelancerNotifiH2}>ATwork profile created succes...</h2>
                                <p>now</p>
                            </div>
                        </div>
                    </section>
                    <section className={styles.freelancerNotifi}>
                        <h1 className={styles.freelancerNotifiH1}>Active Projects</h1>
                        <div>
                            <img src={activeprojectimg.src} alt="" />
                            <p>You don’t have any active project right now</p>
                        </div>
                    </section>
                    <div>
                        <h1>Get started</h1>
                        <p>Start your journey now and connect with clients to bring their projects to life.</p>
                        <button>Learn more</button>
                        <img src={rocket.src} alt="" />
                    </div>
                </aside>
            </main>
        </div>
    )
}