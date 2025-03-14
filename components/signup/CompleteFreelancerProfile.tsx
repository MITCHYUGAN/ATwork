import { Button } from '@interchain-ui/react';
import NextLink from 'next/link';
import styles from "../../styles/completefreelancerprofile.module.css"
import freelancerCover from "../../assets/freelancercover.jpeg"
import SkillSelector from './SkillSelector';

interface CompleteFreelancerProfileProps {
    setProfile: (value: string) => void;
}

export function CompleteFreelancerProfile({ setProfile }: CompleteFreelancerProfileProps) {


    return (
        <section className={styles.completefreelancerprofile}>
            <button className={styles.backbtn} onClick={() => setProfile("")}>← Back</button>
            <div className={styles.formwrapper}>
                <h1 className={styles.formh1}>Setup your Freelancer Profile</h1>
                <p className={styles.formp}>It takes less than a minute to start earning in global standards.</p>
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
                    <div className={styles.formskills}>
                        <SkillSelector />
                    </div>
                    <div className={styles.social_hourly_rate}>
                        <label htmlFor="social" className={`${styles.formsocial} ${styles.formlabel}`}>
                            <p className={styles.formlabeltext}>Social <span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="url" name="social" id="social" value="🔗" />
                        </label>
                        <label className={`${styles.formlabel} ${styles.formlabelhourly_rate}`} htmlFor="hourly_rate">
                            <p className={styles.formlabeltext}>Hourly Rate in $<span className={styles.required}>*</span></p>
                            <input className={styles.forminput} type="number" name="hourly_rate" id="hourly_rate" />
                        </label>
                    </div>
                    <NextLink href="freelancer">
                        <Button className={styles.formbtn} rightIcon="arrowRightLine">Create Profile</Button>
                    </NextLink>
                </form>
            </div>
            <img className={styles.completefreelancerprofileimg} src={freelancerCover.src} alt="" />
        </section>
    )
}