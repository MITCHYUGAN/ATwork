import { Button } from "@interchain-ui/react"
import styles from "../../styles/submitproposal.module.css"

interface SubmitProjectProps {
    setSubmitProjectModalActive: (value: boolean) => void
}

export default function SubmitProject({ setSubmitProjectModalActive }: SubmitProjectProps) {

    const submitProject = (e: any) => {
        e.preventdefault()
    }

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
                    <textarea name="project_details" className={styles.submitprojectformproject_details} id="project_details" placeholder="I like to be contacted through my email: " />
                </label>
                <Button onClick={submitProject} className={styles.formbtn} rightIcon="arrowRightLine">Submit Project</Button>
            </form>
        </section>
    )
}