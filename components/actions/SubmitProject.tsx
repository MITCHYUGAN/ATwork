import { Button } from "@interchain-ui/react"
import styles from "../../styles/submitproject.module.css"
import { useState } from "react";
import { CHAIN_ID } from "@/config";
import { db } from "@/lib/firebase";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";

interface SubmitProjectProps {
    setSubmitProjectModalActive: (value: boolean) => void
    jobId: string | null;
}

export default function SubmitProject({ setSubmitProjectModalActive, jobId }: SubmitProjectProps) {
    const [submission, setSubmission] = useState(
        `Hi! I'm excited to submit my work for your project. I've completed the full-stack development for the e-commerce platform, including the frontend with React and a secure backend with Node.js. The site is live and fully functional.\n\nYou can review it here: https://example.com. \n\nPlease let me know your feedback or if any adjustments are needed. \nReach me at adamsapple826@gmail.com`

    );

    const submitProject = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!submission) {
            alert("Please provide a submission.");
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

            // Reference to the job document
            const jobRef = doc(db, "jobs", jobId);
            const jobSnapshot = await (await import("firebase/firestore")).getDoc(jobRef);
            const jobData = jobSnapshot.data();
            if (!jobData) throw new Error("Job not found");

            // Verify freelancer is assigned to this job
            if (jobData.freelancerAddress !== freelancerAddress) {
                alert("You are not assigned to this job.");
                return;
            }

            // Update job with submission
            await updateDoc(jobRef, {
                status: "Submitted",
                submission,
                submittedAt: new Date().toISOString(),
            });

            // Notify the client
            await addDoc(collection(db, "notifications"), {
                recipientAddress: jobData.clientAddress,
                message: `Freelancer has submitted work for the job "${jobData.title}"`,
                jobId,
                action: "viewSubmission",
                timestamp: new Date().toISOString(),
                read: false,
            });

            console.log("Project submitted successfully:", jobId);
            alert("Project submitted successfully! Notification Sent to Client");
            setSubmitProjectModalActive(false);
        } catch (err) {
            console.error("Error submitting project:", err);
            alert("Failed to submit project. Please check the console for details.");
        }
    };

    return (
        <section className={styles.submitproject}>
            <button className={styles.closesubmitprojectModal} onClick={() => setSubmitProjectModalActive(false)}>
                ← close
            </button>
            <div className={styles.submitprojectheader}>
                <h1>Done working on the Project? Submit it 👇</h1>
                <p>Provide the information of what you did, and a link to check it out</p>
            </div>
            <form action="" className={styles.submitprojectform}>
                <label htmlFor="project_details" className={styles.submitprojectformlabel}>
                    <p className={styles.submitprojectformlabelp}>
                        Provide project Information to the client
                        <span className={styles.required}> *</span>
                    </p>
                    <textarea name="project_details" className={styles.submitprojectformproject_details} id="project_details" placeholder="e.g., Link to your work and description of what you did" value={submission} onChange={(e) => setSubmission(e.target.value)} />
                </label>
                <Button onClick={submitProject} className={styles.formbtn} rightIcon="arrowRightLine">Submit Project</Button>
            </form>
        </section>
    )
}