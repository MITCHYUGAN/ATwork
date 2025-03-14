import styles from "../../styles/completeclientprofile.module.css"
import { Button } from '@interchain-ui/react';
import NextLink from 'next/link';
import clientCover from "../../assets/cover.jpeg"

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
    interface Window extends KeplrWindow { }
}

interface CompleteClientProfileProps {
    setProfile: (value: string) => void;
}

// Neutron testnet configuration
const CONTRACT_ADDRESS = "neutron1z5uupxh3x80hnmw35n7mh07gnsn264wldd3gyfh0g2cnmzqvhv2q8jv888";
const CHAIN_ID = "pion-1";
const RPC_ENDPOINT = "https://rpc-palvus.pion-1.ntrn.tech";

async function createClientProfile() {

    const createClientProfileMsg = {
        create_profile: {
            profile_type: "Client",
            name: "Dan Mitch",
            bio: "Looking for Freelanceers",
            skills: [],
            hourly_rate: "",
            social_links: [
                {
                    platform: "X",
                    url: "https://x.com/CryptGiki",
                }
            ],
        }
    }

    if (!window.keplr) {
        alert("Keplr Wallet not detected. Please install the Keplr extension.");
        return;
    }

    // Get offline signer from Keplr
    const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);

    // Create a CosmWasm client
    const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString("0.025untrn") }
    );

    // Execute the transaction
    const result = await client.execute(
        "neutron1qzzmq3sa7es9j2ye24k3uc9mqagw0u5zq3ex2w",
        "neutron1z5uupxh3x80hnmw35n7mh07gnsn264wldd3gyfh0g2cnmzqvhv2q8jv888",
        createClientProfileMsg,
        "auto",
    )

    console.log("Profile created successfully:", result);
}

export function CompleteClientProfile({ setProfile }: CompleteClientProfileProps) {

    return (
        <section className={styles.completeclientprofile}>
            <button className={styles.backbtn} onClick={() => setProfile("")}>← Back</button>
            <div className={styles.formwrapper}>
                <h1 className={styles.formh1}>Setup your Client Profile</h1>
                <p className={styles.formp}>Get qualified freelancers to work on your project right away</p>
                <form className={styles.form} action="#">
                    <div className={styles.formnames}>
                        <label className={styles.formlabel} htmlFor="first_name">
                            <p className={styles.formlabeltext}>First Name <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="text" name="first_name" id="first_name" />
                        </label>
                        <label className={styles.formlabel} htmlFor="last_name">
                            <p className={styles.formlabeltext}>Last Name <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="text" name="last_name" id="last_name" />
                        </label>
                    </div>
                    <div>
                        <label className={styles.formlabel} htmlFor="bio">
                            <p>Bio</p>
                            <textarea className={`${styles.forminput} ${styles.formBio}`} name="bio" id="bio"></textarea>
                        </label>
                    </div>
                    <label htmlFor="social" className={`${styles.formsocial} ${styles.formlabel}`}>
                        <p className={styles.formlabeltext}>Social <span className={styles.required}>*</span></p>
                        <input className={styles.forminput} type="url" name="social" id="social" value="🔗" />
                    </label>
                    <NextLink href="client">
                        <Button onClick={createClientProfile} className={styles.formbtn} rightIcon="arrowRightLine">Create Profile</Button>
                    </NextLink>
                </form>
            </div>
            <img className={styles.completeclientprofileimg} src={clientCover.src} alt="" />
        </section>
    )
}




// const { address, getSigningCosmWasmClient } = useChain(CHAIN_NAME);

//     // Check if a profile already exists for the connected wallet address
//     useEffect(() => {
//         console.log("Address:", address);
//         console.log("isConnectWallet:", isConnectWallet)
//         const checkProfile = async () => {
//             if (!isConnectWallet || !address) return;

//             try {
//                 // Query the contract to check if a profile exists
//                 const client = await SigningCosmWasmClient.connect(RPC_ENDPOINT);
//                 const queryMsg = { get_profile: { address } };
//                 const profile = await client.queryContractSmart(CONTRACT_ADDRESS, queryMsg);
//                 console.log("Profile Query Response:", profile); // Add this line

//                 if (profile) {
//                     // Redirect to the appropriate page based on profile type
//                     if (profile.profile_type === "Client") {
//                         window.location.href = "/client";
//                     } else if (profile.profile_type === "Freelancer") {
//                         window.location.href = "/freelancer";
//                     }
//                 }
//             } catch (err: any) {
//                 if (err.message.includes("not found")) {
//                     // No profile exists for this address
//                     console.log("No profile found for this address.");
//                 } else {
//                     console.error("Error checking profile:", err);
//                 }
//             }
//         };

//         checkProfile();
//     }, [isConnectWallet, address]);





// Post Project
import { Button } from "@interchain-ui/react"
import styles from "../../styles/postproject.module.css"
import { useState } from "react"

interface PostProjectProps {
    setPostProjectModalActive: (value: boolean) => void
}

export default function PostProject({ setPostProjectModalActive }: PostProjectProps) {
    const [formContent, setFormContent] = useState("title")
    const [num, setNum] = useState(1)
    const [spantext, setSpanText] = useState("Begin ")
    const [formH1text, setFormH1text] = useState("with a compelling title")
    const [formPtext, setFormPtext] = useState("A strong title grabs attention and ensures your project post resonates with the right candidates. Since it’s the first thing they’ll notice, make it impactful!")

    return (
        <section className={styles.postproject}>
            <div className={styles.postprojectheader}>
                <button className={styles.closepostprojectModal} onClick={() => setPostProjectModalActive(false)}>← close</button>
                <p className={styles.postprojectheaderprogress}>{num}/5</p>
                <h1 className={styles.postprojectheaderh1}><span className={styles.postprojectheaderh1Span}>{spantext}</span>{formH1text}</h1>
                <p className={styles.postprojectheaderP}>{formPtext}</p>
            </div>
            <form action="" className={styles.postprojectForm}>
                {formContent === "title" ? (
                    <div className={styles.postprojectFormTitle}>
                        <label htmlFor="title" className={styles.postprojectFormLabel}>
                            <p className={styles.postprojectFormLabelP}>Project Title</p>
                            <input className={styles.postprojectFormLabelInput} type="text" name="title" id="title" placeholder="Write a title for your job" />
                        </label>
                        <div className={styles.postprojectFormTitleExample}>
                            <p>Example of titles</p>
                            <ul>
                                <li>Creative Graphic Designer Wanted for Ad Campaign Design</li>
                                <li>Full-Stack Developer Wanted for E-Commerce Platform Development</li>
                                <li>SEO Specialist Needed to Optimize Website and Boost Rankings</li>
                                <li>Copywriter Needed for Email Marketing Campaigns</li>
                            </ul>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setFormContent("description_skills")
                                setNum(2)
                                setSpanText("Great! ")
                                setFormH1text("Now, provide a detailed project description. And skills required")
                                setFormPtext("Provide a clear and detailed description of your project, including goals, tasks and required skills. This helps freelancers understand your needs and apply confidently.")
                            }} className={styles.formbtn} rightIcon="arrowRightLine">Next</Button>
                        </div>
                    </div>
                ) : formContent === "description_skills" ? (

                    <div>
                        <label htmlFor="description">
                            <p>Description</p>
                            <textarea name="description" id="description"></textarea>
                        </label>
                        <label htmlFor="">
                            <p>Skills Required</p>
                            <input type="text" name="" id="" />
                        </label>

                        <div>
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setFormContent("title")
                                setNum(1)
                                setSpanText("Begin ")
                                setFormH1text("with a compelling title")
                                setFormPtext("A strong title grabs attention and ensures your project post resonates with the right candidates. Since it’s the first thing they’ll notice, make it impactful!")
                            }} className={styles.formbtn}>← Back</Button>

                            <Button onClick={(e) => {
                                e.preventDefault()
                                setFormContent("budget_timeline")
                            }} className={styles.formbtn} rightIcon="arrowRightLine">Next</Button>
                        </div>
                    </div>
                ) : <>Something</>}
            </form>
        </section>
    )
}

// .postproject {
//     position: absolute;
//     background-color: white;
//     width: 60%;
//     min-height: 90vh;
//     box-shadow: 1px 1px 0px 1000px rgba(0, 0, 0, 0.542);
//     z-index: 10;
//     top: 30px;
//     border: 1px solid #E4E4E7;
//     border-radius: 14px;
//     background-color: #F4F4F5;
//     margin-bottom: 100px;
//     display: flex;
//     flex-direction: column;
//     gap: 30px;
//     align-items: flex-start;
//     padding: 50px;


//     .closepostprojectModal {
//         position: absolute;
//         top: 30px;
//         border: none;
//         outline: none;
//         border-radius: 4px;
//         background: none;
//         color: #2684FF;
//         cursor: pointer;
//         padding: 0;
//         font-size: 15px;
//         font-weight: 600;
//         font-family: "Poppins", serif;
//     }

//     .postprojectheader {
//         display: flex;
//         flex-direction: column;
//         margin-top: 50px;
//         gap: 10px;

//         .postprojectheaderprogress {
//             color: #7E8082;
//             font-weight: 700;
//             font-size: 16px;
//         }

//         .postprojectheaderh1 {
//             font-size: 24px;
//             color: #18181B;
//             font-weight: 600;
//         }

//         .postprojectheaderh1Span{
//             color: #7E8082;
//         }

//         .postprojectheaderP {
//             font-size: 16px;
//             font-weight: 400;
//             color: #7E8082;
//             width: 90%;
//         }
//     }

//     .postprojectForm {
//         background-color: white;
//         width: 100%;
//         padding: 20px;
//         border-radius: 14px;

//         .postprojectFormTitle {
//             display: flex;
//             flex-direction: column;
//             gap: 30px;

//             .postprojectFormLabel {
//                 width: 80%;
//                 display: flex;
//                 flex-direction: column;
//                 gap: 10px;

//                 .postprojectFormLabelP {
//                     font-size: 16px;
//                     font-weight: 600;
//                     color: #545756;
//                 }

//                 .postprojectFormLabelInput {
//                     width: 100%;
//                     border: 1px solid #BEBEBE;
//                     padding: 10px 16px;
//                     font-family: "Poppins", serif;
//                     background: none;
//                     font-size: 16px;
//                     border-radius: 7px;
//                 }
//             }

//             .postprojectFormTitleExample {
//                 color: #7E8082;
//                 font-size: 16px;
//                 display: flex;
//                 flex-direction: column;

//                 .formbtn {
//                     padding: 0px 18px;
//                     background-color: #1A73E8;
//                     font-family: "Poppins", serif;
//                     align-self: flex-end;
//                 }
//             }
//         }
//     }
// }