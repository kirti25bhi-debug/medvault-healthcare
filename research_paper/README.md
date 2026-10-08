# MedVault IEEE Research Paper: Overleaf & LaTeX Guide

This folder contains the complete academic research paper formatted in official **IEEE style** (`IEEEtran` 2-column format):

**Title**: *A Structured Framework for Data Quality, Integrity, and Privacy in Electronic Health Records: The MedVault Architecture*  
**Author**: Kirti Priya, Department of Computer Science and Engineering, Vellore Institute of Technology, Bhopal  
**Target Length**: 6–7 pages of core research + 2 pages of references (51 peer-reviewed citations)

---

## 📁 Files Included

- `main.tex`: Full IEEEtran LaTeX source document with complete sections, mathematical formulations, algorithms, and benchmark tables.
- `references.bib`: Authoritative BibTeX database with 51 peer-reviewed references (IEEE, ACM, JAMIA, Lancet Digital Health, Nature Medicine).
- `medvault_ieee_research_paper.zip`: Pre-packaged archive ready for 1-click import into Overleaf.

---

## 🚀 How to Open and Compile in Overleaf (1-Click)

1. Go to **[overleaf.com](https://www.overleaf.com)** and log in (or create a free account).
2. Click **New Project** (top left green button) > **Upload Project**.
3. Drag and drop `medvault_ieee_research_paper.zip` (located in this directory), or upload `main.tex` and `references.bib`.
4. Overleaf will automatically open the project!
5. Click **Recompile** (or press `Ctrl + Enter` / `Cmd + Enter`).
6. Your 8–9 page camera-ready IEEE PDF will render with equations, algorithm boxes, comparative tables, and 2 pages of references!

### Recommended Overleaf Compiler Settings:
- **Compiler**: `pdfLaTeX` (Default)
- **TeX Live Version**: `2024` or `2023` (Latest)
- **Main document**: `main.tex`

---

## 📊 Summary of Research Paper Sections

1. **Section I: Introduction** — Clinical motivation, HITECH / 21st Century Cures Act context, 3 core failure modes of modern EHRs, and key contributions.
2. **Section II: Related Work & Theoretical Foundations** — Survey of Kahn et al. / Wang-Strong data quality models, cryptographic audit logs (Crosby-Wallach, Merkle), healthcare blockchains, and differential privacy.
3. **Section III: Threat Model & Security Formulations** — Adversary classes ($\mathcal{A}_{\text{tamper}}$, $\mathcal{A}_{\text{privacy}}$, $\mathcal{A}_{\text{corrupt}}$) and 5 formal security goals.
4. **Section IV: The MedVault Architecture** — Three-tier framework design (DQA Ingestion, Cryptographic Ledger, Differentially Private AI Triage).
5. **Section V: Mathematical Modeling & Algorithms** — Formal definition of Physiological Plausibility Metric (PPM), Merkle root generation with domain separation bytes, $L_1$-sensitivity derivation, and Laplace mechanism for $\epsilon$-DP. Includes **Algorithm 1** (EHR Ingestion & Merkle-Chaining) and **Algorithm 2** (Privacy-Preserving Clinical Triage).
6. **Section VI: Empirical Evaluation & Results** — Experimental analysis on the **5,074 clinical hematology patient dataset**:
   - *Table I*: Complete blood count parameter distributions and reference ranges across In-Care ($N=2046$) vs Out-Care ($N=3028$).
   - *Table II*: Classifier benchmark against SVM, Random Forest, and MLP (MedVault achieves 85.8% accuracy and 0.892 AUC-ROC).
   - *Table III*: Cryptographic verification latency (<1.84ms per record, >2500 TPS).
   - *Table IV*: Differential privacy privacy-utility tradeoff ($\epsilon = 1.0$ maintains 84.6% accuracy while reducing membership inference risk to 53.8%).
   - *Ablation*: Resilience against 10%–30% synthetic data corruption (preserving 97.4% triage consistency).
7. **Section VII: Security, Privacy, and Regulatory Analysis** — Cryptographic unforgeability proof under the Random Oracle Model; compliance analysis with HIPAA Security Rule and GDPR Art. 9/32.
8. **Section VIII: Limitations & Future Work** — Multi-center federated learning and edge acceleration.
9. **Section IX: Conclusion & Acknowledgments**.
10. **References** — ~2 full pages of IEEE-formatted references (51 citations).
