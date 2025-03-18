import React from "react";
import Select, { MultiValue } from "react-select";
import styles from "../../styles/skillselector.module.css";

interface SkillOption {
  label: string;
  value: string;
  category: string;
}

interface SkillSelectorProps {
  value: string[];
  onSkillsChange: (skills: string[]) => void;
}

const skillOptions: SkillOption[] = [
  { label: "Backend", value: "backend", category: "Dev Skills" },
  { label: "Blockchain", value: "blockchain", category: "Dev Skills" },
  { label: "Mobile", value: "mobile", category: "Dev Skills" },
  { label: "React", value: "react", category: "Frontend" },
  { label: "Svelte", value: "svelte", category: "Frontend" },
  { label: "Angular", value: "angular", category: "Frontend" },
  { label: "Vue", value: "vue", category: "Frontend" },
  { label: "Javascript", value: "javascript", category: "Frontend" },
  { label: "CSS", value: "css", category: "Frontend" },
];

const groupedOptions = [
  {
    label: "Dev Skills",
    options: skillOptions.filter((skill) => skill.category === "Dev Skills"),
  },
  {
    label: "Frontend",
    options: skillOptions.filter((skill) => skill.category === "Frontend"),
  },
];

const SkillSelector: React.FC<SkillSelectorProps> = ({ value, onSkillsChange }) => {
  const selectedSkills = skillOptions.filter((skill) => value.includes(skill.value));

  const handleChange = (selected: MultiValue<SkillOption>) => {
    const skills = selected.map((skill) => skill.value);
    onSkillsChange(skills);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Your Skills <span className={styles.required}>*</span>
      </label>
      <p className={styles.description}>
        Get notified of new listings based on your skills
      </p>

      <Select
        isMulti
        options={groupedOptions}
        className={styles.select}
        classNamePrefix="select"
        onChange={handleChange}
        value={selectedSkills}
      />
    </div>
  );
};

export default SkillSelector;