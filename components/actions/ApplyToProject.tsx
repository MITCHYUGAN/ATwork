import { Button } from "@interchain-ui/react";
import styles from "../../styles/applytoproject.module.css"
import { useState } from "react";
import { CHAIN_ID } from "@/config";
import { GasPrice } from "@cosmjs/stargate";
import { db } from "@/lib/firebase"; // Import Firebase
import { doc, updateDoc, collection, addDoc } from "firebase/firestore"; // Firestore methods

interface ApplyToProjectProps {
    setApplyToProjectModalActive: (value: boolean) => void;
    jobId: string | null; // The ID of the job being applied to
}

export default function ApplyToProject({ setApplyToProjectModalActive, jobId }: ApplyToProjectProps) {

    const [proposal, setProposal] = useState(""); // Store the proposal message

    const applyToProject = async (e: any) => {
        e.preventDefault()

        if (!proposal) {
            alert("Please provide a proposal message.");
            return;
        }

        if (!jobId) {
            alert("No job selected. Please try again.");
            return;
        }

        try {
            if (!window.keplr) {
                alert("Keplr Wallet not detected. Please install the Keplr extension.");
                return;
            }

            // Get freelancer's wallet address
            const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
            const accounts = await offlineSigner.getAccounts();
            const freelancerAddress = accounts[0].address;

            // Reference to the job document in Firestore
            const jobRef = doc(db, "jobs", jobId);

            // Update job with freelancer's application
            await updateDoc(jobRef, {
                status: "Applied",
                freelancerAddress,
                proposal,
                appliedAt: new Date().toISOString(),
            });


            // Fetch the job to get clientAddress (alternatively, pass it as a prop if available)
            const jobSnapshot = await (await import("firebase/firestore")).getDoc(jobRef);
            const jobData = jobSnapshot.data();
            if (!jobData) throw new Error("Job not found");

            // Add notification for the client
            await addDoc(collection(db, "notifications"), {
                recipientAddress: jobData.clientAddress,
                message: `You have a proposal for the job "${jobData.title}"`,
                jobId,
                action: "viewProposal",
                timestamp: new Date().toISOString(),
                read: false,
            });

            console.log("Applied to job successfully:", jobId);
            alert("Applied to job successfully! Notification Sent to Client");
            setApplyToProjectModalActive(false);

        } catch (err) {
            console.error("Error applying to job:", err);
            alert("Failed to apply to job. Please check the console for details.");
        }
    }

    const placeholderText = `Hi! I'm excited to apply for your project. I have strong skills in full-stack development and a proven track record with e-commerce platforms. I'd love to discuss how I can deliver your vision.\n\nPlease reach me at my email: adamsapple826@gmail.com`;


    return (
        <section className={styles.applytoproject}>
            <button className={styles.closeapplytoprojectModal} onClick={() => setApplyToProjectModalActive(false)}>
                ← close
            </button>
            <div className={styles.applytoprojectheader}>
                <h1>Apply to project</h1>
                <p>Please share some details to the client including how you&apos;d prefer to be contacted.</p>
            </div>
            <form action="" className={styles.applytoprojectform}>
                <label htmlFor="message_to_client" className={styles.applytoprojectformlabel}>
                    <p className={styles.applytoprojectformlabelp}>
                        Message to Client
                        <span className={styles.required}> *</span>
                    </p>
                    <textarea name="message_to_client" className={styles.applytoprojectformmessage_to_client} id="message_to_client"
                        placeholder={placeholderText} value={proposal}
                        onChange={(e) => setProposal(e.target.value)} />
                </label>
                <Button onClick={applyToProject} className={styles.formbtn} rightIcon="arrowRightLine">Apply to Project</Button>
            </form>
        </section>
    )
}