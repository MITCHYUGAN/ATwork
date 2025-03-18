import { Button } from "@interchain-ui/react"
import styles from "../../styles/approveproject.module.css"

interface ApproveProjectProps {
    setApproveProjectModalActive: (value: boolean) => void
}

export default function ApproveProject({ setApproveProjectModalActive }: ApproveProjectProps) {
    return (
        <section className={styles.approveProject}>
            <button className={styles.closeapproveProjectModal} onClick={() => setApproveProjectModalActive(false)}>
                ← close
            </button>
            <h1 className={styles.approveProjectheader}>Freelancer has made a submittion for your project </h1>
            <div className={styles.approveProjecttexts}>
                <h5>Details about the project :) 👇</h5>
                <p>
                    I&apos;m looking to write about Interchain UI next, I was wondering if there was a documentation for the styles.
                    Because I want to build a simple react app and style it using the tool.
                    that way it will be easier for Frontend(JS) Devs to understand and start implementing.
                    I&apos;m looking to write about Interchain UI next, I was wondering if there was a documentation for the styles.
                    Because I want to build a simple react app and style it using the tool.
                    that way it will be easier for Frontend(JS) Devs to understand and start implementing.
                </p>
            </div>
            <div className={styles.approveProjectbuttons}>
                <Button>Decline</Button>
                <Button rightIcon="arrowRightLine">Approve Project</Button>
            </div>
        </section>
    )
}