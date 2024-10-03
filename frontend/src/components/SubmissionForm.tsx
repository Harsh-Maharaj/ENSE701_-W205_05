import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Forms.module.scss";

export default function SubmissionForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", JSON.stringify(data)); // Handle form submission
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" className={styles.formItem} />

      <input {...register("authors")} placeholder="Authors" className={styles.formItem} />
      
      <input {...register("source")} placeholder="Source" className={styles.formItem} />

      <div className={styles.inlineGroup}>
        <input {...register("pubyear")} placeholder="Publication Year" className={`${styles.formItem} ${styles.inlineItem}`} />
        <input {...register("doi")} placeholder="DOI" className={`${styles.formItem} ${styles.inlineItem}`} />
      </div>

      <select {...register("linked_discussion")} className={styles.formItem}>
        <option value="">Select SE practice...</option>
        <option value="TDD">TDD</option>
        <option value="Mob Programming">Mob Programming</option>
      </select>
      
      <input type="submit" className={styles.buttonItem} />
    </form>
  );
}
