import { Button } from '@interchain-ui/react';
import styles from "../../styles/completefreelancerprofile.module.css"
import freelancerCover from "../../assets/freelancercover.webp"
import { useState } from 'react';

const skillsData = [
    { category: 'Dev Skills', skills: ['Backend', 'Blockchain', 'Mobile'] },
    { category: 'Frontend', skills: ['React', 'Svelte', 'Angular', 'Vue'] },
];

export function CompleteFreelancerProfile() {

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleSkill = (skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    return (
        <section className={styles.completefreelancerprofile}>
            <div className={styles.formwrapper}>
                <h1 className={styles.formh1}>Finish Signing up as a Freelancer</h1>
                <p className={styles.formp}>It takes less than a minute to start earning in global standards.</p>
                <form className={styles.form} action="#">
                    <div className={styles.formnames}>
                        <label className={styles.formlabel} htmlFor="first_name">
                            <p>First Name *</p>
                            <input className={styles.forminput} type="text" name="first_name" id="first_name" />
                        </label>
                        <label className={styles.formlabel} htmlFor="last_name">
                            <p>Last Name *</p>
                            <input className={styles.forminput} type="text" name="last_name" id="last_name" />
                        </label>
                    </div>
                    {/* <div className={styles.formskills}>
                        <label htmlFor="skills" className={styles.formlabel}>
                            <p>Your Skills *</p>
                            <input className={styles.forminput} type="text" name="skills" id="skills" />
                        </label>
                    </div> */}
                    <div className={styles.container}>
                        <label className={styles.label}>Your Skills <span className={styles.required}>*</span></label>
                        <div className={styles.inputBox} onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {selectedSkills.map((skill) => (
                                <span key={skill} className={styles.tag}>
                                    {skill} <button onClick={(e) => { e.stopPropagation(); toggleSkill(skill); }}>×</button>
                                </span>
                            ))}
                        </div>
                        {dropdownOpen && (
                            <div className={styles.dropdown}>
                                {skillsData.map((group) => (
                                    <div key={group.category}>
                                        <div className={styles.category}>{group.category}</div>
                                        {group.skills.map((skill) => (
                                            <div
                                                key={skill}
                                                className={styles.skill}
                                                onClick={() => toggleSkill(skill)}
                                            >
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <label htmlFor="social" className={`${styles.formsocial} ${styles.formlabel}`}>
                        <p>Social🔗</p>
                        <input className={styles.forminput} type="url" name="social" id="social" />
                    </label>
                    <Button className={styles.formbtn} rightIcon="arrowRightLine">Create Profile</Button>
                </form>
            </div>
            <img className={styles.completefreelancerprofileimg} src={freelancerCover.src} alt="" />
        </section>
    )
}