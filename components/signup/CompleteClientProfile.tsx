import styles from "../../styles/completeclientprofile.module.css"
import { Button } from '@interchain-ui/react';
import clientCover from "../../assets/cover.jpeg"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { useEffect, useState } from "react";
import { CHAIN_ID, CONTRACT_ADDRESS, RPC_ENDPOINT } from "@/config";

declare global {
    interface Window extends KeplrWindow { }
}

interface CompleteClientProfileProps {
    setProfile: (value: string) => void;
}

export function CompleteClientProfile({ setProfile }: CompleteClientProfileProps) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const createClientProfile = async () => {
        setLoading(true);
        setError("")

        // Get form data
        const firstName = (document.getElementById("first_name") as HTMLInputElement).value
        const lastName = (document.getElementById("last_name") as HTMLInputElement).value
        const bio = (document.getElementById("bio") as HTMLTextAreaElement).value
        const social = (document.getElementById("social") as HTMLInputElement).value;

        // Validate form data
        if (!firstName || !lastName || !bio || !social) {
            setError("All fields are required.")
            setLoading(false)
            return;
        }

        if (!isValidUrl(social)) {
            setError("Please enter a valid social link.");
            setLoading(false);
            return;
        }

        try {

            if (!window.keplr) {
                alert("Keplr Wallet not detected. Please install the Keplr extension.")
                return;
            }

            // Get the connected wallet address
            const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
            const accounts = await offlineSigner.getAccounts();
            const address = accounts[0].address;

            // Create a CosmWasm client
            const client = await SigningCosmWasmClient.connectWithSigner(
                RPC_ENDPOINT,
                offlineSigner,
                { gasPrice: GasPrice.fromString("0.025untrn") }
            )

            // Prepare the CreateProfile message
            const createClientProfileMsg = {
                create_profile: {
                    profile_type: "Client",
                    name: `${firstName} ${lastName}`,
                    bio: bio,
                    skills: [],
                    hourly_rate: "0",
                    social_links: [
                        {
                            platform: "X",
                            url: social,
                        }
                    ],
                }
            }

            // Execute the transaction
            const result = await client.execute(
                address, // Sender address
                CONTRACT_ADDRESS,
                createClientProfileMsg,
                "auto"
            )

            console.log("Profile created successfully:", result);
            window.location.href = "/client"; // Redirect to client page
        } catch (err) {
            console.error("Error creating profile:", err);
            setError("Failed to create profile. Please try again.");
        } finally {
            setLoading(false)
        }
    }

    // Check if URL is valid
    const isValidUrl = (url: string) => {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    return (
        <section className={styles.completeclientprofile}>
            <button className={styles.backbtn} onClick={() => setProfile("")}>
                ← Back
            </button>
            <div className={styles.formwrapper}>
                <h1 className={styles.formh1}>Setup your Client Profile</h1>
                <p className={styles.formp}>Get qualified freelancers to work on your project right away</p>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formnames}>
                        <label className={styles.formlabel} htmlFor="first_name">
                            <p className={styles.formlabeltext}>
                                First Name <span className={styles.required}>*</span>
                            </p>
                            <input className={styles.forminput} type="text" name="first_name" id="first_name" required placeholder="John"/>
                        </label>
                        <label className={styles.formlabel} htmlFor="last_name">
                            <p className={styles.formlabeltext}>
                                Last Name <span className={styles.required}>*</span>
                            </p>
                            <input className={styles.forminput} type="text" name="last_name" id="last_name" required placeholder="Doe"/>
                        </label>
                    </div>
                    <div>
                        <label className={styles.formlabel} htmlFor="bio">
                            <p className={styles.formlabeltext}>
                                Bio<span className={styles.required}>*</span>
                            </p>
                            <textarea className={`${styles.forminput} ${styles.formBio}`} name="bio" id="bio" placeholder='Looking for qualified Freelancers to work on my Projects' required></textarea>
                        </label>
                    </div>
                    <label htmlFor="social" className={`${styles.formsocial} ${styles.formlabel}`}>
                        <p className={styles.formlabeltext}>
                            Social <span className={styles.required}>*</span>
                        </p>
                        <input className={styles.forminput} type="url" name="social" id="social" placeholder="🔗" required />
                    </label>
                    {error && <p className={styles.error}>{error}</p>}
                    <Button onClick={createClientProfile} className={styles.formbtn} disabled={loading} rightIcon="arrowRightLine">
                        {loading ? "Creating..." : "Create Profile"}
                    </Button>
                </form>
            </div>
            <img className={styles.completeclientprofileimg} src={clientCover.src} alt="" />
        </section>
    );
}