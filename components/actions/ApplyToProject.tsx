import { Button } from "@interchain-ui/react";
import styles from "../../styles/applytoproject.module.css"

interface ApplyToProjectProps {
    setApplyToProjectModalActive: (value: boolean) => void;
}

export default function ApplyToProject({ setApplyToProjectModalActive }: ApplyToProjectProps) {

    const applyToProject = (e: any) => {
        e.preventDefault()
    }

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
                    <textarea name="message_to_client" className={styles.applytoprojectformmessage_to_client} id="message_to_client" placeholder="I like to be contacted through my email:" />
                </label>
                <Button onClick={applyToProject} className={styles.formbtn} rightIcon="arrowRightLine">Apply to Project</Button>
            </form>
        </section>
    )
}