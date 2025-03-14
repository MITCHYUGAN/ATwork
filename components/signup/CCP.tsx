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