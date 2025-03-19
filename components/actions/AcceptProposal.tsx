import { Button } from "@interchain-ui/react"
import styles from "../../styles/acceptproposal.module.css"
import { useEffect, useState } from "react";
import { CHAIN_ID } from "@/config";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";

interface AcceptProposalProps {
    setAcceptProposalModalActive: (value: boolean) => void;
    jobId: string | null;
}

export default function AcceptProposal({ setAcceptProposalModalActive, jobId }: AcceptProposalProps) {
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!jobId) {
            alert("No job selected. Please try again.");
            setAcceptProposalModalActive(false);
            return;
        }

        const fetchJob = async () => {
            try {
                const jobRef = doc(db, "jobs", jobId);
                const jobSnapshot = await getDoc(jobRef);
                if (jobSnapshot.exists()) {
                    setJob({ id: jobSnapshot.id, ...jobSnapshot.data() });
                } else {
                    throw new Error("Job not found");
                }
            } catch (err) {
                console.error("Error fetching job:", err);
                alert("Failed to load job details. Please try again.");
                setAcceptProposalModalActive(false);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();

    }, [jobId, setAcceptProposalModalActive])

    const acceptProposal = async (e: any) => {
        e.preventDefault();

        if (!jobId || !job) {
            alert("No job selected or job data not loaded.");
            return;
        }

        try {
            if (!window.keplr) {
                alert("Keplr Wallet not detected. Please install the Keplr extension.");
                return;
            }


            // Verify client wallet address matches job's clientAddress
            const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
            const accounts = await offlineSigner.getAccounts();
            const clientAddress = accounts[0].address;

            if (clientAddress !== job.clientAddress) {
                alert("You are not authorized to accept this proposal.");
                return;
            }

            // Update job status to "InProgress"
            const jobRef = doc(db, "jobs", jobId);
            await updateDoc(jobRef, {
                status: "InProgress",
                acceptedAt: new Date().toISOString(),
            });

            // Notify the freelancer
            await addDoc(collection(db, "notifications"), {
                recipientAddress: job.freelancerAddress,
                message: `Your proposal for the job "${job.title}" has been accepted`,
                jobId,
                action: "viewJob", // Could be used later to link to the job
                timestamp: new Date().toISOString(),
                read: false,
            });

            console.log("Proposal accepted successfully for job:", jobId);
            alert("Proposal accepted successfully! Notification Sent to Freelancer");
            setAcceptProposalModalActive(false);
        } catch (err) {
            console.error("Error accepting proposal:", err);
            alert("Failed to accept proposal. Please check the console for details.");
        }
    }

    if (loading) {
        return (
            <section className={styles.acceptproposal}>
                <p>Loading...</p>
            </section>
        );
    }

    if (!job) return null;

    return (
        <section className={styles.acceptproposal}>
        <button
            className={styles.closeacceptproposalModal}
            onClick={() => setAcceptProposalModalActive(false)}
        >
            ← close
        </button>
        <div className={styles.acceptproposalheader}>
            <h1>Review Proposal</h1>
            <p>Review the freelancer&apos;s proposal for &quot;{job.title}&quot;</p>
        </div>
        <div className={styles.acceptproposalcontent}>
            <h2>Proposal</h2>
            <p className={styles.proposaltext}>{job.proposal || "No proposal provided."}</p>
            <p><strong>Freelancer Address:</strong> {job.freelancerAddress}</p>
            <p><strong>Budget:</strong> {parseInt(job.budget) / 1e6} tATOM</p>
            <p><strong>Deadline:</strong> {Math.floor(job.deadline / 86400)} days</p>
        </div>
        <form className={styles.acceptproposalform}>
            <Button onClick={acceptProposal} className={styles.formbtn}>
                Accept Proposal
            </Button>
        </form>
    </section>
    )
}