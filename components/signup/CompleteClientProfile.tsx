import styles from "../../styles/completeclientprofile.module.css"
import { Button } from '@interchain-ui/react';
import NextLink from 'next/link';
import clientCover from "../../assets/cover.jpeg"

interface CompleteClientProfileProps {
    setProfile: (value: string) => void;
}

export function CompleteClientProfile({ setProfile }: CompleteClientProfileProps) {
    return (
        <section className={styles.completeclientprofile}>
            <button className={styles.backbtn} onClick={() => setProfile("")}>← Back</button>
            <div className={styles.formwrapper}>
                <h1 className={styles.formh1}>Setup your Client Profile</h1>
                <p className={styles.formp}>Get qualified freelancers to work on your project right away</p>
                <form className={styles.form} action="#">
                    <div className={styles.formnames}>
                        <label className={styles.formlabel} htmlFor="first_name">
                            <p className={styles.formlabeltext}>First Name <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="text" name="first_name" id="first_name" />
                        </label>
                        <label className={styles.formlabel} htmlFor="last_name">
                            <p className={styles.formlabeltext}>Last Name <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="text" name="last_name" id="last_name" />
                        </label>
                    </div>
                    <div>
                        <label className={styles.formlabel} htmlFor="bio">
                            <p>Bio</p>
                            <textarea className={`${styles.forminput} ${styles.formBio}`} name="bio" id="bio"></textarea>
                        </label>
                    </div>
                    <label htmlFor="social" className={`${styles.formsocial} ${styles.formlabel}`}>
                        <p className={styles.formlabeltext}>Social <span className={styles.required}>*</span></p>
                        <input className={styles.forminput} type="url" name="social" id="social" value="🔗" />
                    </label>
                    <NextLink href="client">
                        <Button className={styles.formbtn} rightIcon="arrowRightLine">Create Profile</Button>
                    </NextLink>
                </form>
            </div>
            <img className={styles.completeclientprofileimg} src={clientCover.src} alt="" />
        </section>
    )
}