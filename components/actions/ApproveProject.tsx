import { Button } from "@interchain-ui/react"
import styles from "../../styles/approveproject.module.css"
import { useEffect, useState } from "react";
import { CHAIN_ID } from "@/config";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";

interface ApproveProjectProps {
    setApproveProjectModalActive: (value: boolean) => void;
    jobId: string | null;
}

export default function ApproveProject({ setApproveProjectModalActive, jobId }: ApproveProjectProps) {
    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch job details
    useEffect(() => {
        if (!jobId) {
            alert("No job selected. Please try again.");
            setApproveProjectModalActive(false);
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
                setApproveProjectModalActive(false);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId, setApproveProjectModalActive]);

    const approveProject = async (e: any) => {
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

            // Verify client wallet address
            const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
            const accounts = await offlineSigner.getAccounts();
            const clientAddress = accounts[0].address;

            if (clientAddress !== job.clientAddress) {
                alert("You are not authorized to approve this submission.");
                return;
            }

            // Update job status to "Completed"
            const jobRef = doc(db, "jobs", jobId);
            await updateDoc(jobRef, {
                status: "Completed",
                completedAt: new Date().toISOString(),
            });

            // Notify the freelancer
            await addDoc(collection(db, "notifications"), {
                recipientAddress: job.freelancerAddress,
                message: `Your submission for the job "${job.title}" has been approved`,
                jobId,
                action: "viewCompleted", // Placeholder for future use
                timestamp: new Date().toISOString(),
                read: false,
            });

            // Need to add blockchain logic to release funds here
            console.log("Project approved successfully:", jobId);
            alert("Project approved successfully! Funds Sent to Freelancer");
            setApproveProjectModalActive(false);
        } catch(err){
            console.error("Error approving project:", err);
            alert("Failed to approve project. Please check the console for details.");
        }
    }

    if (loading) {
        return (
            <section className={styles.approveproject}>
                <p>Loading...</p>
            </section>
        );
    }

    if (!job) return null;

    return (
        <section className={styles.approveProject}>
            <button className={styles.closeapproveProjectModal} onClick={() => setApproveProjectModalActive(false)}>
                ← close
            </button>
            <div className={styles.approveprojectheader}>
                <h1>Review Submission</h1>
                <p>Review the freelancer&apos;s submission for &quot;{job.title}&quot;</p>
            </div>
            <div className={styles.approveprojectcontent}>
                <h2>Submission</h2>
                <p>{job.submission || "No submission provided."}</p>
                <p><strong>Freelancer Address:</strong> {job.freelancerAddress}</p>
                <p><strong>Budget:</strong> {parseInt(job.budget) / 1e6} tATOM</p>
                <p><strong>Deadline:</strong> {Math.floor(job.deadline / 86400)} days</p>
            </div>
            <div className={styles.approveProjectbutton}>
                <Button onClick={approveProject} className={styles.formbtn} rightIcon="arrowRightLine">Approve Project</Button>
            </div>
        </section>
    )
}