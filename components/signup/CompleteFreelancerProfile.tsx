import { Button } from '@interchain-ui/react';
import NextLink from 'next/link';
import styles from "../../styles/completefreelancerprofile.module.css"
import freelancerCover from "../../assets/freelancercover.jpeg"
import SkillSelector from './SkillSelector';
import { useState } from 'react';
import { CHAIN_ID, CONTRACT_ADDRESS, RPC_ENDPOINT } from '@/config';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/stargate';

interface CompleteFreelancerProfileProps {
    setProfile: (value: string) => void;
}

export function CompleteFreelancerProfile({ setProfile }: CompleteFreelancerProfileProps) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [formSkillsData, setFormSkillsData] = useState({
        skills: [] as string[],
    });


    const handleSkillsChange = (skills: string[]) => {
        setFormSkillsData({ ...formSkillsData, skills });
    };

    const createFreelancerProfile = async () => {
        setLoading(true);
        setError("")

        // Get form data
        const firstName = (document.getElementById("first_name") as HTMLInputElement).value
        const lastName = (document.getElementById("last_name") as HTMLInputElement).value
        const bio = (document.getElementById("bio") as HTMLTextAreaElement).value
        const skills = formSkillsData.skills
        const social = (document.getElementById("social") as HTMLInputElement).value;
        const hourly_rate = (document.getElementById("hourly_rate") as HTMLTextAreaElement).value

        console.log("firstName:", firstName);
        console.log("lastName:", lastName);
        console.log("bio:", bio);
        console.log("Skills:", skills);
        console.log("social:", social);
        console.log("hourly_rate:", hourly_rate);
        

        // Validate form data
        if (!firstName || !lastName || !bio || !social || !hourly_rate || skills.length === 0) {
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
            const createFreelancerProfileMsg = {
                create_profile: {
                    profile_type: "Freelancer",
                    name: `${firstName} ${lastName}`,
                    bio: bio,
                    skills: ["skill1", "skill2", "skill3"],
                    hourly_rate: hourly_rate,
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
                createFreelancerProfileMsg,
                "auto"
            )

            console.log("Profile created successfully:", result);
            window.location.href = "/freelancer"; // Redirect to freelancer page
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
        <section className={styles.completefreelancerprofile}>
            <button className={styles.backbtn} onClick={() => setProfile("")}>← Back</button>
            <div className={styles.formwrapper}>
                <h1 className={styles.formh1}>Setup your Freelancer Profile</h1>
                <p className={styles.formp}>It takes less than a minute to start earning in global standards.</p>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formnames}>
                        <label className={styles.formlabel} htmlFor="first_name">
                            <p className={styles.formlabeltext}>First Name <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="text" name="first_name" id="first_name" required placeholder='John'/>
                        </label>
                        <label className={styles.formlabel} htmlFor="last_name">
                            <p className={styles.formlabeltext}>Last Name <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="text" name="last_name" id="last_name" required placeholder='Doe'/>
                        </label>
                    </div>
                    <div>
                        <label className={styles.formlabel} htmlFor="bio">
                            <p className={styles.formlabeltext}>Bio <span className={styles.required}>*</span></p>
                            <textarea className={`${styles.forminput} ${styles.formBio}`} name="bio" id="bio" placeholder='Looking for quality Gigs that matches my Skillset' required></textarea>
                        </label>
                    </div>
                    <div className={styles.formskills}>
                        <SkillSelector
                            value={formSkillsData.skills}
                            onSkillsChange={handleSkillsChange}
                        />
                    </div>
                    <div className={styles.social_hourly_rate}>
                        <label htmlFor="social" className={`${styles.formsocial} ${styles.formlabel}`}>
                            <p className={styles.formlabeltext}>Social <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="url" name="social" id="social" placeholder="🔗" required/>
                        </label>
                        <label className={`${styles.formlabel} ${styles.formlabelhourly_rate}`} htmlFor="hourly_rate">
                            <p className={styles.formlabeltext}>Hourly Rate in $<span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="number" name="hourly_rate" id="hourly_rate" required/>
                        </label>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <Button onClick={createFreelancerProfile} className={styles.formbtn} disabled={loading} rightIcon="arrowRightLine">
                        {loading ? "Creating..." : "Create Profile"}
                    </Button>
                </form>
            </div>
            <img className={styles.completefreelancerprofileimg} src={freelancerCover.src} alt="" />
        </section>
    )
}