import { Button } from "@interchain-ui/react"
import styles from "../../styles/acceptproposal.module.css"

interface AcceptProposalProps {
    setAcceptProposalModalActive: (value: boolean) => void
}

export default function AcceptProposal({ setAcceptProposalModalActive }: AcceptProposalProps) {
    return (
        <section className={styles.acceptproposal}>
            <button className={styles.closeacceptproposalModal} onClick={() => setAcceptProposalModalActive(false)}>
                ← close
            </button>
            <h1 className={styles.acceptproposalheader}>You have a proposal for the project you posted</h1>
            <div className={styles.acceptproposaltexts}>
                <h5>Here is a note for you :) 👇</h5>
                <p>
                    I&apos;m looking to write about Interchain UI next, I was wondering if there was a documentation for the styles.
                    Because I want to build a simple react app and style it using the tool.
                    that way it will be easier for Frontend(JS) Devs to understand and start implementing.
                    I&apos;m looking to write about Interchain UI next, I was wondering if there was a documentation for the styles.
                    Because I want to build a simple react app and style it using the tool.
                    that way it will be easier for Frontend(JS) Devs to understand and start implementing.
                </p>
            </div>
            <div className={styles.acceptproposalbuttons}>
                <Button>Decline</Button>
                <Button rightIcon="arrowRightLine">Accept Proposal</Button>
            </div>
        </section>
    )
}