import { Button } from "@interchain-ui/react"
import styles from "../../styles/notifications.module.css"

interface NotificationsProps {
    setNotificationModalActive: (value: boolean) => void
    // notificationtype: string
    // notificationheadingtext: string
    // notificationmessage
}

export default function Notifications({ setNotificationModalActive }: NotificationsProps) {
    return (
        <section className={styles.notifications}>
            <button className={styles.closenotificationsModal} onClick={() => setNotificationModalActive(false)}>
                ← close
            </button>
            <h1 className={styles.notificationsheader}>You have a proposal for the project you posted</h1>
            <div className={styles.notificationstexts}>
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
            <div className={styles.notificationsbuttons}>
                <Button>Decline</Button>
                <Button rightIcon="arrowRightLine">Accept Proposal</Button>
            </div>
        </section>
    )
}