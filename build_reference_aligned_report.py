import os
import sys

sys.path.insert(0, os.path.abspath('.'))

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

PAGE_WIDTH, PAGE_HEIGHT = A4

class ReferenceReportCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_decorations(self, total_pages):
        # Suppress headers on Cover Page and Certificate Page (Pages 1 & 2)
        if self._pageNumber in [1, 2]:
            return

        self.saveState()
        self.setFont("Helvetica", 8.5)
        self.setFillColor(colors.HexColor("#555555"))

        # Running Header
        self.drawString(54, PAGE_HEIGHT - 32, "School of Computing Science and Artificial Intelligence (SCAI)")
        self.drawRightString(PAGE_WIDTH - 54, PAGE_HEIGHT - 32, "DSN2098 - Project Exhibition - I")
        self.setStrokeColor(colors.HexColor("#dddddd"))
        self.setLineWidth(0.6)
        self.line(54, PAGE_HEIGHT - 36, PAGE_WIDTH - 54, PAGE_HEIGHT - 36)

        # Running Footer
        self.line(54, 38, PAGE_WIDTH - 54, 38)
        self.drawString(54, 26, "Smart Medical Record Management System (MedVault)")
        self.drawRightString(PAGE_WIDTH - 54, 26, f"Page {self._pageNumber} of {total_pages}")
        self.restoreState()


def build_pdf():
    pdf_filename = "MedVault_Project_Report.pdf"

    # Margins: 54 pt (0.75 in)
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=46,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()

    # Typography matching the reference PDF (Clean, modern Arial/Helvetica & Times Roman)
    title_univ = ParagraphStyle(
        'UnivHeader',
        fontName='Helvetica-Bold',
        fontSize=12.5,
        leading=16,
        alignment=1,
        textColor=colors.HexColor('#0D2B3E'),
        spaceAfter=15
    )

    course_badge = ParagraphStyle(
        'CourseBadge',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        alignment=1,
        textColor=colors.HexColor('#3F51B5'), # Purple/Indigo like reference
        spaceAfter=8
    )

    proj_title_main = ParagraphStyle(
        'ProjTitleMain',
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=22,
        alignment=1,
        textColor=colors.HexColor('#D32F2F'), # Red accent like reference
        spaceAfter=5
    )

    proj_title_sub = ParagraphStyle(
        'ProjTitleSub',
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        alignment=1,
        textColor=colors.HexColor('#555555'),
        spaceAfter=12
    )

    domain_badge = ParagraphStyle(
        'DomainBadge',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        alignment=1,
        textColor=colors.HexColor('#222222'),
        spaceAfter=30
    )

    sec_head_red = ParagraphStyle(
        'SecHeadRed',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        alignment=1,
        textColor=colors.HexColor('#D32F2F'),
        spaceBefore=12,
        spaceAfter=10,
        keepWithNext=True
    )

    sub_head_dark = ParagraphStyle(
        'SubHeadDark',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#111111'),
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    sub_sub_dark = ParagraphStyle(
        'SubSubDark',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#333333'),
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    p_body = ParagraphStyle(
        'PBody',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14.5,
        textColor=colors.HexColor('#222222'),
        spaceAfter=7,
        alignment=4 # Justified
    )

    p_bullet = ParagraphStyle(
        'PBullet',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#222222'),
        leftIndent=15,
        spaceAfter=4,
        alignment=4
    )

    caption_center = ParagraphStyle(
        'CapCenter',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        alignment=1,
        textColor=colors.HexColor('#444444'),
        spaceBefore=5,
        spaceAfter=10
    )

    th_style = ParagraphStyle(
        'THStyle',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.white,
        alignment=1
    )

    td_style = ParagraphStyle(
        'TDStyle',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#222222')
    )

    td_center = ParagraphStyle(
        'TDCenter',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#222222'),
        alignment=1
    )

    code_block = ParagraphStyle(
        'CodeBlock',
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#111111')
    )

    story = []

    # =========================================================================
    # PAGE 1: TITLE / COVER PAGE (Matching reference layout exactly)
    # =========================================================================
    story.append(Spacer(1, 10))
    if os.path.exists("vit_seal.png"):
        story.append(Image("vit_seal.png", width=120, height=126))
    else:
        story.append(Spacer(1, 70))
    
    story.append(Spacer(1, 18))
    story.append(Paragraph("School of Computing Science and Artificial Intelligence", title_univ))
    story.append(Spacer(1, 10))
    story.append(Paragraph("DSN2098 - Project Exhibition – I", course_badge))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Smart Medical Record Management System", proj_title_main))
    story.append(Paragraph("A Structured Framework for Data Quality, Integrity, and Privacy in Electronic Health Records (MedVault)", proj_title_sub))
    story.append(Paragraph("Domain: Web Development and Cloud in Health Informatics", domain_badge))
    story.append(Spacer(1, 15))

    # Two column submission table (Submitted To vs Submitted By)
    sub_table_data = [
        [
            Paragraph("<b>Submitted To:</b>", ParagraphStyle('ST', fontName='Helvetica-Bold', fontSize=10.5, leading=14)),
            Paragraph("<b>Submitted by:</b>", ParagraphStyle('SB', fontName='Helvetica-Bold', fontSize=10.5, leading=14))
        ],
        [
            Paragraph(
                "Supervisor: <b>Dr. A. Sirajudeen</b><br/>"
                "Reviewer 1: <b>Dr. Trapti Sharma</b><br/>"
                "Reviewer 2: <b>Dr. Jyoti Chouhan</b><br/>"
                "Program Chair: <b>Dr. Abha Trivedi</b><br/><br/>"
                "<i>Department of Health Informatics<br/>"
                "School of Computing Science & AI<br/>"
                "VIT Bhopal University</i>",
                ParagraphStyle('ST_body', fontName='Helvetica', fontSize=9, leading=13.5)
            ),
            Paragraph(
                "1. <b>Ayushman Patri</b> - 25BHI10109<br/>"
                "2. <b>Kirti Priya</b> - 25BHI10117<br/>"
                "3. <b>Ramtej Vissamsetti</b> - 25BHI10034<br/>"
                "4. <b>Ashutosh Mohanty</b> - 25BHI10129<br/>"
                "5. <b>Krishna Raj Kumar</b> - 25BHI10130<br/><br/>"
                "<i>B.Tech CSE (Health Informatics)<br/>"
                "Batch 2025 | Academic Year 2026-27</i>",
                ParagraphStyle('SB_body', fontName='Helvetica', fontSize=9.5, leading=14)
            )
        ]
    ]
    sub_table = Table(sub_table_data, colWidths=[230, 250])
    sub_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(sub_table)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: BONAFIDE CERTIFICATE & APPROVAL SHEET
    # =========================================================================
    story.append(Spacer(1, 15))
    story.append(Paragraph("VIT BHOPAL UNIVERSITY, KOTHRIKALAN, SEHORE<br/>MADHYA PRADESH – 466114", ParagraphStyle('CertUni', fontName='Helvetica-Bold', fontSize=12, leading=16, alignment=1, textColor=colors.HexColor('#0D2B3E'))))
    story.append(Spacer(1, 10))
    story.append(Paragraph("BONAFIDE CERTIFICATE & APPROVAL SHEET", ParagraphStyle('CertHead', fontName='Helvetica-Bold', fontSize=15, leading=19, alignment=1, textColor=colors.HexColor('#D92D20'))))
    story.append(Spacer(1, 14))

    cert_text = (
        "Certified that this project report titled <b>“SMART MEDICAL RECORD MANAGEMENT SYSTEM (MEDVAULT)”</b> "
        "is the bonafide work of the following candidates:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;1. <b>AYUSHMAN PATRI</b> (Register No: <b>25BHI10109</b>)<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;2. <b>KIRTI PRIYA</b> (Register No: <b>25BHI10117</b>)<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;3. <b>RAMTEJ VISSAMSETTI</b> (Register No: <b>25BHI10034</b>)<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;4. <b>ASHUTOSH MOHANTY</b> (Register No: <b>25BHI10129</b>)<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;5. <b>KRISHNA RAJ KUMAR</b> (Register No: <b>25BHI10130</b>)<br/>"
        "who carried out the project work under my supervision for the course <b>DSN2098: Project Exhibition-I</b> in the domain "
        "of <b>Web development and Cloud</b> during the academic year 2026–27. Certified further that to the best of our knowledge "
        "the work reported at this time does not form part of any other project/research work based on which a degree or award was conferred on "
        "an earlier occasion on these or any other candidates."
    )
    story.append(Paragraph(cert_text, ParagraphStyle('CertBody', fontName='Helvetica', fontSize=10, leading=15, alignment=4)))
    story.append(Spacer(1, 35))

    sig_cell_l = ParagraphStyle('SigCellL', fontName='Helvetica', fontSize=8.5, leading=12.5, alignment=0)
    sig_cell_r = ParagraphStyle('SigCellR', fontName='Helvetica', fontSize=8.5, leading=12.5, alignment=2)
    sig_data = [
        [
            Paragraph("<b>PROJECT SUPERVISOR</b><br/><br/><br/><br/>___________________________<br/><b>Dr. A. Sirajudeen</b><br/>School of Computing Science & AI<br/>VIT Bhopal University", sig_cell_l),
            Paragraph("<b>PROGRAM CHAIR</b><br/><br/><br/><br/>___________________________<br/><b>Dr. Abha Trivedi</b><br/>School of Computing Science & AI<br/>VIT Bhopal University", sig_cell_r)
        ],
        [
            Paragraph("<br/><br/><b>INTERNAL REVIEWER 1</b><br/><br/><br/><br/>___________________________<br/><b>Dr. Trapti Sharma</b><br/>School of Computing Science & AI<br/>VIT Bhopal University", sig_cell_l),
            Paragraph("<br/><br/><b>INTERNAL REVIEWER 2</b><br/><br/><br/><br/>___________________________<br/><b>Dr. Jyoti Chouhan</b><br/>School of Computing Science & AI<br/>VIT Bhopal University", sig_cell_r)
        ]
    ]
    sig_table = Table(sig_data, colWidths=[240, 240])
    sig_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(sig_table)
    story.append(PageBreak())

    # =========================================================================
    # PAGES 2 & 3: INDEX / TABLE OF CONTENTS (Matching reference structure)
    # =========================================================================
    story.append(Paragraph("Index / Table of Contents", ParagraphStyle('TOCHead', fontName='Helvetica-Bold', fontSize=16, leading=20, alignment=1, textColor=colors.HexColor('#0D2B3E'), spaceAfter=14)))
    
    toc_entries = [
        ("Preliminary", ["Bonafide Certificate & Approval Sheet", "Faculty Review Panel"]),
        ("I. Project Overview", ["1.1 Abstract", "1.2 Acknowledgement"]),
        ("II. Introduction", ["2.1 Background and Motivation", "2.2 Problem Statement", "2.3 Objectives of the Project", "2.4 Scope of the Work"]),
        ("III. Literature Review", ["3.1 Clinical Guidelines in Laboratory Hematology", "3.2 Existing ML Models in Healthcare Prediction", "3.3 Electronic Health Record Integrity & Tamper-Evident Logging", "3.4 Limitations of Current Approaches"]),
        ("IV. Existing Work and Limitations", ["4.1 Prior Research Tools", "4.2 Gaps Identified (Plausibility, DBA Tampering, Privacy)", "4.3 How MedVault Addresses These Gaps"]),
        ("V. Software and Hardware Requirements", ["5.1 Hardware Requirements", "5.2 Software Stack (Language, Frameworks, Libraries, Cloud)"]),
        ("VI. Proposed Work and Methodology", ["6.1 Data Sources and Features (5,074 Clinical Dataset)", "6.2 Preprocessing & Validation Steps (DQA & Wintrobe Ratio)", "6.3 Model Training and Selection", "6.4 Workflow Pipeline (Input → DQA → Ledger → DP Triage → Live UI)"]),
        ("VII. Novelty of the Project", ["7.1 Physiological Plausibility Metric (PPM)", "7.2 High-Throughput Cryptographic Ledger (Merkle-DAG + HMAC)", "7.3 Calibrated Differentially Private Clinical Triage", "7.4 Single-Port Dual-Serving Cloud Architecture"]),
        ("VIII. System Architecture", ["8.1 Overall System Architecture Diagram", "8.2 Data Flow Diagram (DFD)"]),
        ("IX. Module Workflow Explanation", ["9.1 Frontend UI / Web Orchestrator (React 18 + Vite)", "9.2 Backend Server & REST API (server.js on Express)", "9.3 Diagnostics & Intelligence Layer (diagnostics.js)", "9.4 Data Management & In-Memory Store (database.js)"]),
        ("X. Implementation and Coding", ["10.1 Dataset Preparation & Processing Notebook", "10.2 Clinical Triage Model Training", "10.3 Backend API Server Code", "10.4 Code Standards & Best Practices"]),
        ("XI. Snapshots of the Project", ["11.1 Home / Hero Portal Page", "11.2 AI Clinical Diagnostic Analyzer Modal"]),
        ("XII. Testing", ["12.1 Unit Testing of Endpoints & Functions", "12.2 Model Evaluation (Accuracy, Precision, Recall, F1, AUC)", "12.3 Validation Tests (Boundary Limits, Mock Fallbacks)", "12.4 Cryptographic Latency & Audit Proof Tests", "12.5 Live Portal UI & System Integration Test Execution", "12.6 AI Clinical Diagnostic Analyzer Boundary Test Execution"]),
        ("XIII. Results and Discussion", ["13.1 Clinical Triage Model Performance", "13.2 Cryptographic Ledger Latency & Throughput", "13.3 Comparative Results (Baseline vs Ensemble vs MedVault)", "13.4 Differential Privacy & Membership Inference Tradeoff", "13.5 Insights and Interpretations"]),
        ("XIV. Conclusion", ["14.1 Summary of Achievements", "14.2 Impact on Healthcare Accessibility and Data Trust", "14.3 Limitations of the Current System", "Final Note", "References (IEEE / Springer Format)"])
    ]

    for roman_sec, subsections in toc_entries:
        story.append(Paragraph(f"<b>{roman_sec}</b>", ParagraphStyle('TOC_Main', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=colors.HexColor('#0D2B3E'), spaceBefore=4, spaceAfter=2)))
        for sub in subsections:
            story.append(Paragraph(f"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{sub}", ParagraphStyle('TOC_Sub', fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor('#333333'))))
    
    story.append(PageBreak())

    # =========================================================================
    # SECTION I: PROJECT OVERVIEW (1.1 Abstract & 1.2 Acknowledgement)
    # =========================================================================
    story.append(Paragraph("I. Project Overview", sec_head_red))
    story.append(Paragraph("1.1 Abstract", sub_head_dark))
    
    abs_p1 = (
        "Modern Electronic Health Record (EHR) infrastructures are essential for clinical workflows, epidemiology, "
        "and automated clinical triage. However, operational hospital environments suffer from three fundamental vulnerabilities: "
        "(1) systemic data quality degradation from transcription errors, out-of-range sensor readings, and incomplete profiles; "
        "(2) vulnerability to covert database tampering and insider attacks lacking immutable non-repudiation; and "
        "(3) severe patient privacy risks through membership inference attacks and unauthorized record exfiltration."
    )
    abs_p2 = (
        "<b>MedVault</b> is our comprehensive attempt to resolve this triad through a unified, multi-tiered software architecture. "
        "The system integrates: (i) an algorithmic Data Quality Assurance (DQA) pipeline featuring a formal Physiological Plausibility Metric (PPM) "
        "that enforces univariate survival boundaries and bivariate conservation laws (Wintrobe invariants: HCT ≈ 3 × HGB); (ii) a high-throughput "
        "tamper-evident cryptographic ledger using balanced binary Merkle trees and Keyed-Hash Message Authentication Code (HMAC-SHA256) "
        "epoch chaining to guarantee non-repudiation and sub-millisecond audit proofs; and (iii) a standardized clinical triage classification "
        "engine protected by bounded (ε, δ)-Differential Privacy using the calibrated Laplace mechanism, combined with deterministic emergency "
        "red-flag overrides for acute hematological conditions (e.g., severe thrombocytopenia)."
    )
    abs_p3 = (
        "The framework was empirically benchmarked on a real-world multi-center clinical dataset of <b>5,074 patient complete blood count (CBC) records</b> "
        "(2,046 In-Patient admissions, 3,028 Out-Patient routine cases) across ten physiological biomarkers. MedVault achieves a triage classification "
        "accuracy of <b>85.8%</b> and an Area Under the ROC Curve (AUC-ROC) of <b>0.892</b>, outperforming standard Random Forest (85.1%), "
        "Multilayer Perceptron (84.7%), and Support Vector Machines (83.4%). Under calibrated differential privacy (ε = 1.0), the model retains "
        "84.6% accuracy while reducing Membership Inference Attack vulnerability from 78.6% to 53.8% (near random chance). Cryptographic audit verification "
        "incurs only 0.13 ms per transaction (>2,500 TPS), confirming that MedVault delivers enterprise-grade data quality, auditability, and privacy "
        "without introducing latency bottlenecks into mission-critical clinical environments."
    )
    story.append(Paragraph(abs_p1, p_body))
    story.append(Paragraph(abs_p2, p_body))
    story.append(Paragraph(abs_p3, p_body))
    story.append(Spacer(1, 10))

    story.append(Paragraph("1.2 Acknowledgement", sub_head_dark))
    ack_text = (
        "First and foremost, we would like to thank the Lord Almighty for His presence, wisdom, and immense blessings throughout our project work.<br/><br/>"
        "We wish to express our heartfelt gratitude to the <b>Program Chair, Dr. Abha Trivedi</b>, and the faculty leadership of the "
        "School of Computing Science Engineering and Artificial Intelligence (SCAI), VIT Bhopal University, for their continuous support, "
        "encouragement, and visionary guidance in facilitating this academic inquiry.<br/><br/>"
        "We would like to express our deepest appreciation to our project supervisor, <b>Dr. A. Sirajudeen</b>, for continually mentoring, reviewing our architectural designs, "
        "and actively participating in our progress, giving critical insights that elevated this work from a conceptual prototype to a production-grade platform.<br/><br/>"
        "We also extend our sincere gratitude to our esteemed project reviewers, <b>Dr. Trapti Sharma</b> (Reviewer 1) and <b>Dr. Jyoti Chouhan</b> (Reviewer 2), "
        "for their constructive critiques, architectural guidance, and rigorous evaluation during our milestone presentations.<br/><br/>"
        "We extend our sincere thanks to all the technical, lab, and teaching staff of VIT Bhopal University who supported us throughout development, "
        "as well as our parents and families whose unwavering patience and encouragement made this project possible."
    )
    story.append(Paragraph(ack_text, p_body))
    story.append(PageBreak())

    # =========================================================================
    # SECTION II: INTRODUCTION (Matching pages 6 to 11 of reference)
    # =========================================================================
    story.append(Paragraph("II. Introduction", sec_head_red))
    story.append(Paragraph("2.1 Background and Motivation", sub_head_dark))
    
    p_intro_bg = (
        "Healthcare delivery across the globe is experiencing an unprecedented transformation driven by digital health records, "
        "decentralized clinical laboratories, and artificial intelligence. Digital record-keeping promises to streamline patient handoffs, "
        "reduce medical errors, and provide continuous longitudinal histories. The World Health Organization (WHO) and international medical bodies "
        "have underscored that timely detection of physiological anomalies and structured data sharing are pivotal to reducing preventable inpatient mortality.<br/><br/>"
        "However, clinical monitoring in operational hospitals requires interpreting complex, heterogeneous laboratory signals. Complete Blood Count (CBC) panels "
        "are among the most frequently ordered diagnostic investigations in acute medicine. Clinicians must simultaneously assess hematocrit (packed red cell volume), "
        "hemoglobin levels, white blood cell counts, and platelet counts to determine whether a patient requires immediate hospital admission (In-Patient Care) "
        "or can be safely managed with routine outpatient follow-up (Out-Patient Care).<br/><br/>"
        "Existing clinical systems are severely fragmented: hospital information systems record laboratory numbers without validating physiological conservation laws; "
        "traditional relational databases are vulnerable to silent tampering by insiders; and predictive triage algorithms deployed without privacy defenses "
        "risk leaking confidential patient profiles. This motivated the development of <b>MedVault</b>: an integrated, auditable, and privacy-preserving platform "
        "that converts clinical blood counts into trustworthy, actionable triage intelligence."
    )
    story.append(Paragraph(p_intro_bg, p_body))

    story.append(Paragraph("2.2 Problem Statement", sub_head_dark))
    story.append(Paragraph("<b>Single-sentence problem statement:</b>", p_body))
    story.append(Paragraph(
        "<i>There is no accessible, integrated, and verifiable healthcare data management system that simultaneously enforces biological data quality, "
        "tamper-evident cryptographic auditability, and provable differential privacy for acute clinical triage in operational environments.</i>",
        ParagraphStyle('ProbStmt', fontName='Helvetica-Oblique', fontSize=10, leading=14, textColor=colors.HexColor('#0D2B3E'), leftIndent=15, spaceAfter=8)
    ))

    story.append(Paragraph("<b>Detailed problem points:</b>", p_body))
    story.append(Paragraph("• <b>Data Quality Degradation:</b> Upstream transcription errors, sensor drift, and missing biomarker values propagate into clinical workflows, inducing algorithmic hallucination and catastrophic misdiagnoses.", p_bullet))
    story.append(Paragraph("• <b>Covert Database Tampering:</b> Relational database systems (RDBMS) administered centrally allow privileged database administrators (DBAs) or intruders to silently alter diagnostic history without leaving immutable cryptographic proof.", p_bullet))
    story.append(Paragraph("• <b>High Blockchain Overhead:</b> Proposed blockchain solutions (e.g. Ethereum, Hyperledger) suffer from crippling latency (15–300 TPS), high gas fees, and violate GDPR Article 17 ('Right to Erasure').", p_bullet))
    story.append(Paragraph("• <b>Inferential Privacy Leaks:</b> Clinical triage calculators leak sensitive patient attributes through membership inference attacks (MIA) when queried by untrusted third-party researchers.", p_bullet))
    story.append(Paragraph("• <b>Operational Fragility:</b> Prototype healthcare ML systems collapse when model artifacts are missing or inputs fall outside expected statistical ranges.", p_bullet))
    
    story.append(Paragraph("<b>What must be solved:</b> Provide a resilient, evidence-linked, dual-serving solution that (1) validates physiological plausibility before storage, (2) builds lightweight Merkle hash chains for tamper-evidence, (3) executes (ε, δ)-differentially private triage, and (4) runs live on modest cloud infrastructure with graceful fallback behavior.", p_body))

    story.append(Paragraph("2.3 Objectives of the Project", sub_head_dark))
    story.append(Paragraph("<b>Primary Objectives (Core Deliverables):</b>", p_body))
    story.append(Paragraph("1. <b>Develop a Three-Tier Architecture:</b> Decouple clinical data quality assurance, cryptographic ledger sealing, and AI risk prediction into an integrated pipeline.", p_bullet))
    story.append(Paragraph("2. <b>Build a Clinical Data Quality Assurance Engine:</b> Implement the Physiological Plausibility Metric (PPM) to reject contaminated records using biological conservation laws (Wintrobe invariants: HCT ≈ 3 × HGB).", p_bullet))
    story.append(Paragraph("3. <b>Construct a High-Throughput Cryptographic Ledger:</b> Implement binary Merkle trees and HMAC-SHA256 epoch chaining delivering O(log N) verification in < 1.84 ms.", p_bullet))
    story.append(Paragraph("4. <b>Deliver an Interactive Fullstack Web Portal:</b> Build a responsive frontend in React 18, Vite, and Tailwind CSS v4, connected to an Express.js backend and deployed live on Render.", p_bullet))
    
    story.append(Paragraph("<b>Secondary Objectives (Value-Add Capabilities):</b>", p_body))
    story.append(Paragraph("5. <b>Explainability & Clinician Guidance:</b> Provide human-readable medical reasoning, risk factor breakdowns, and actionable doctor recommendations for each triage decision.", p_bullet))
    story.append(Paragraph("6. <b>Emergency Red-Flag Traps:</b> Deterministic rule-based triggers for life-threatening emergencies (e.g. Platelets < 50k, WBC > 14k, Hemoglobin < 8 g/dL).", p_bullet))
    story.append(Paragraph("7. <b>Differential Privacy Bounds:</b> Perturb risk scores via calibrated Laplace noise (ε = 1.0) to suppress membership inference vulnerability to ~53%.", p_bullet))
    story.append(Paragraph("8. <b>Resilient Mock Fallbacks:</b> Implement rule-based heuristics that ensure continuous demoability even if serialized model files are missing.", p_bullet))

    story.append(Paragraph("<b>Quantitative / Success Criteria:</b>", p_body))
    story.append(Paragraph("• Clinical triage classification accuracy ≥ 85.0% and AUC-ROC ≥ 0.88 on the 5,074 patient cohort.", p_bullet))
    story.append(Paragraph("• Cryptographic ingestion and verification latency < 2.0 ms per record (> 2,500 TPS).", p_bullet))
    story.append(Paragraph("• Functional fullstack web portal live on cloud infrastructure accessible via public HTTPS URL.", p_bullet))

    story.append(Paragraph("2.4 Scope of the Work", sub_head_dark))
    story.append(Paragraph("<b>In-scope (what MedVault implements in this project):</b>", p_body))
    story.append(Paragraph("• Ingestion, validation, and analysis of 5,074 clinical complete blood count patient records.", p_bullet))
    story.append(Paragraph("• Training and evaluation of baseline and ensemble models: Logistic Regression, Random Forest, SVM, and MLP.", p_bullet))
    story.append(Paragraph("• Interactive web application with Home Portal, Live Patient Records Explorer, and AI Clinical Diagnostic Analyzer Modal.", p_bullet))
    story.append(Paragraph("• Automated cloud deployment blueprint (`render.yaml`, `Dockerfile`, `Procfile`) on Render Web Services.", p_bullet))
    story.append(Paragraph("• Unit testing, boundary testing, synthetic corruption resilience testing, and benchmark logging.", p_bullet))

    story.append(Paragraph("<b>Out of scope (explicit exclusions for this phase):</b>", p_body))
    story.append(Paragraph("• Direct physical hardware interfacing with bedside hematology analyzers (uses standard JSON/FHIR batch feeds).", p_bullet))
    story.append(Paragraph("• Clinical certification as an FDA/CE-marked diagnostic medical device (educational and research prototype).", p_bullet))
    story.append(Paragraph("• Real-time hospital paging hardware integration (contact and appointment booking APIs are software-backed).", p_bullet))

    story.append(Paragraph("<b>Assumptions & Constraints:</b> Input parameters conform to standardized hematological units (% for HCT, g/dL for HGB, k/µL for platelets/WBC). Models are evaluated on curated clinical data; prospective validation in live hospital ICUs is planned for future work.", p_body))
    story.append(Paragraph("<b>Ethical Note and Usage Disclaimer:</b> MedVault is an assistive educational and research system. All outputs include a clinical disclaimer stating that algorithmic triage does not replace professional physician judgment.", p_body))
    story.append(PageBreak())

    # =========================================================================
    # SECTION III: LITERATURE REVIEW
    # =========================================================================
    story.append(Paragraph("III. Literature Review", sec_head_red))
    story.append(Paragraph("3.1 Clinical Guidelines in Laboratory Hematology", sub_head_dark))
    story.append(Paragraph(
        "Clinical laboratory hematology is governed by strict international quality standards established by the Clinical and Laboratory Standards Institute (CLSI) "
        "and the World Health Organization (WHO). Complete blood counts represent the first-line screening for infection, hematologic malignancy, anemia, and bleeding diatheses. "
        "A critical principle in laboratory medicine is <i>biological plausibility</i>: healthy and pathological human blood follows rigorous physiological bounds. "
        "Specifically, Wintrobe's classic indices link packed red cell volume (hematocrit) and hemoglobin concentration (HCT ≈ 3 × HGB). When laboratory analyzers experience "
        "dilution errors or transcription errors, this ratio fractures. MedVault operationalizes this clinical literature by embedding Wintrobe invariants directly into automated DQA.",
        p_body
    ))

    story.append(Paragraph("3.2 Existing ML Models in Healthcare Prediction", sub_head_dark))
    story.append(Paragraph(
        "Machine learning models have achieved remarkable success in predicting clinical risk from structured tabular EHR data. Baseline classifiers such as Logistic Regression "
        "and K-Nearest Neighbors (KNN) offer high interpretability but struggle with non-linear clinical boundaries. Ensemble techniques—notably Random Forests (Breiman, 2001) "
        "and Gradient Boosted Decision Trees (Friedman, 2001)—consistently outperform traditional methods on tabular clinical datasets by handling correlated features and missing values. "
        "Recent literature published in <i>Lancet Digital Health</i> and <i>Nature Medicine</i> highlights that ensemble models trained on hematological markers can predict acute "
        "inpatient admission with high sensitivity, provided robust preprocessing and outlier handling are enforced.",
        p_body
    ))

    story.append(Paragraph("3.3 Electronic Health Record Integrity & Tamper-Evident Logging", sub_head_dark))
    story.append(Paragraph(
        "Ensuring data integrity in digital health systems has historically relied on database access logs and relational audit tables. However, Crosby and Wallach (2009) "
        "demonstrated that mutable database logs offer zero protection against privileged insiders who can rewrite historical records. While blockchain-based healthcare frameworks "
        "(e.g., FHIRChain by Zhang et al., 2018) proposed smart contracts for access provenance, empirical studies show that blockchain consensus mechanisms introduce "
        "crippling latency and excessive transaction fees. Merkle trees (Merkle, 1987) combined with cryptographic hash chaining provide a proven mathematical alternative: "
        "they guarantee forward-secure tamper-evidence and logarithmic verification proofs without consensus overhead.",
        p_body
    ))

    story.append(Paragraph("3.4 Limitations of Current Approaches", sub_head_dark))
    story.append(Paragraph(
        "Despite technological progress, current clinical record systems exhibit four critical flaws:<br/>"
        "1. <b>Siloed Architecture:</b> Quality verification, cryptographic storage, and predictive inference are developed as disconnected tools.<br/>"
        "2. <b>Static Schema Checks:</b> SQL `CHECK` constraints verify only column types, ignoring multivariate biological consistency.<br/>"
        "3. <b>Black-Box Predictions:</b> Commercial triage calculators output opaque risk percentages without medical reasoning or clinical citations.<br/>"
        "4. <b>Unbounded Privacy Vulnerability:</b> Open APIs exposing trained models are vulnerable to Membership Inference Attacks (MIA), revealing whether an individual patient's record was used in training.",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION IV: EXISTING WORK AND LIMITATIONS
    # =========================================================================
    story.append(Paragraph("IV. Existing Work and Limitations", sec_head_red))
    story.append(Paragraph("4.1 Prior Research Tools", sub_head_dark))
    story.append(Paragraph(
        "Several academic and commercial systems have explored digital health records and predictive triage. Hospital EHR vendors (Epic, Cerner) provide centralized clinical "
        "document repositories with role-based access control (RBAC). In academic literature, early risk stratification systems (e.g., APACHE-II, SOFA scoring) utilized rule-based "
        "point systems based on vital signs. More recently, deep learning EHR frameworks (Rajkomar et al., 2018) achieved strong predictive accuracy across hospital readmissions. "
        "However, these systems remain tightly coupled to monolithic enterprise hospital infrastructure, making them inaccessible to smaller clinics and research testbeds.",
        p_body
    ))

    story.append(Paragraph("4.2 Gaps Identified", sub_head_dark))
    story.append(Paragraph(
        "Through empirical review of existing tools, five critical gaps were identified:<br/>"
        "• <b>Absence of Automated Physiological Plausibility Filtering:</b> Erroneous entries (e.g. negative platelet counts, impossible hemoglobin levels) are committed into ledgers.<br/>"
        "• <b>Vulnerability to Retrospective DBA Modification:</b> Internal database admins can alter historical lab results without invalidating an immutable proof.<br/>"
        "• <b>High Blockchain Friction:</b> Existing decentralized health networks suffer from high latency (>15 seconds per block) and high gas costs.<br/>"
        "• <b>Lack of Differential Privacy in Triage:</b> Model endpoints leak individual training record membership when queried repeatedly.<br/>"
        "• <b>Operational Fragility in Demos:</b> Systems crash if pickled model files are corrupt or offline.",
        p_body
    ))

    story.append(Paragraph("4.3 How MedVault Addresses These Gaps", sub_head_dark))
    story.append(Paragraph(
        "MedVault directly bridges these gaps through four architectural innovations:<br/>"
        "1. <b>Physiological Plausibility Metric (PPM):</b> An algorithmic filter that evaluates multivariate invariants before persistence.<br/>"
        "2. <b>Lightweight Cryptographic Ledger:</b> In-memory binary Merkle trees and HMAC forward-secure chaining delivering >2,500 TPS with sub-2ms verification.<br/>"
        "3. <b>Calibrated Differentially Private Triage:</b> Laplace noise injection bounded to sensitivity Δf / ε, suppressing membership inference to near random chance.<br/>"
        "4. <b>Unified Dual-Serving Cloud Deployment:</b> Express.js backend serving both React frontend assets and REST APIs on a single port with zero CORS friction.",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION V: SOFTWARE AND HARDWARE REQUIREMENTS
    # =========================================================================
    story.append(Paragraph("V. Software and Hardware Requirements", sec_head_red))
    story.append(Paragraph("5.1 Hardware Requirements", sub_head_dark))
    story.append(Paragraph(
        "MedVault is engineered to be lightweight, eliminating the need for expensive multi-GPU clusters or specialized server hardware:<br/>"
        "• <b>Processor:</b> 2.0 GHz Dual-Core x86-64 / Apple Silicon (M1/M2/M3) or higher.<br/>"
        "• <b>RAM:</b> Minimum 4 GB system memory (8 GB recommended for simultaneous fullstack dev).<br/>"
        "• <b>Storage:</b> Minimum 500 MB free disk space for Node.js modules, patient dataset, and build artifacts.<br/>"
        "• <b>Display:</b> 1280 × 720 minimum screen resolution (responsive on mobile, tablet, and desktop).<br/>"
        "• <b>Connectivity:</b> Standard internet access for cloud deployment and API communication.",
        p_body
    ))

    story.append(Paragraph("5.2 Software Stack (Language, Frameworks, Libraries)", sub_head_dark))
    story.append(Paragraph(
        "The MedVault technology stack is partitioned into specialized, production-grade layers:<br/>"
        "• <b>Runtime Environment:</b> Node.js LTS (v20+ / v24+) with ES Module (`type: module`) support.<br/>"
        "• <b>Backend Framework:</b> Express.js v5 (HTTP routing, CORS, body parsing, and static SPA serving).<br/>"
        "• <b>Frontend Framework:</b> React 18, TypeScript 5, Vite 6 (ultra-fast build and HMR).<br/>"
        "• <b>Styling & Components:</b> Tailwind CSS v4, Lucide React Icons, Radix UI accessible primitives, custom Glassmorphism theme.<br/>"
        "• <b>Machine Learning & Data Handling:</b> Python 3.11+, scikit-learn, pandas, numpy, matplotlib.<br/>"
        "• <b>Cryptographic Primitives:</b> Native Node.js `crypto` module (FIPS 180-4 SHA-256 and FIPS 198-1 HMAC).<br/>"
        "• <b>Reporting:</b> ReportLab PDF Generation Library (Python).<br/>"
        "• <b>Cloud Hosting:</b> Render Web Services (`render.yaml`, Alpine Linux Docker container).",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION VI: PROPOSED WORK AND METHODOLOGY
    # =========================================================================
    story.append(Paragraph("VI. Proposed Work and Methodology", sec_head_red))
    story.append(Paragraph("6.1 Data Sources and Features", sub_head_dark))
    story.append(Paragraph(
        "MedVault is calibrated and validated on a standardized multi-center clinical hematology dataset aggregating <b>5,074 patient laboratory records</b>. "
        "The target clinical task is binary risk stratification: classifying patients requiring hospital admission (labeled as 'in-care', N = 2,046, 40.3%) "
        "versus routine outpatient management (labeled as 'out-care', N = 3,028, 59.7%).<br/><br/>"
        "Each patient record captures ten physiological biomarkers:<br/>"
        "1. <b>Haematocrit (HCT):</b> Packed cell volume (%) [Mean: 38.28% ± 5.97%]<br/>"
        "2. <b>Haemoglobins (HGB):</b> Hemoglobin concentration (g/dL) [Mean: 12.74 ± 2.08 g/dL]<br/>"
        "3. <b>Erythrocyte (RBC):</b> Red blood cell count (10^6 / µL) [Mean: 4.47 ± 0.66]<br/>"
        "4. <b>Leucocyte (WBC):</b> White blood cell count (10^3 / µL) [Mean: 8.72 ± 4.99]<br/>"
        "5. <b>Thrombocyte (PLT):</b> Platelet count (10^3 / µL) [Mean: 257.55 ± 112.18]<br/>"
        "6. <b>Mean Corpuscular Volume (MCV):</b> Average red cell size (fL) [Mean: 85.61 ± 6.96]<br/>"
        "7. <b>Mean Corpuscular Hemoglobin (MCH):</b> Average hemoglobin per RBC (pg) [Mean: 28.23 ± 2.67]<br/>"
        "8. <b>MCH Concentration (MCHC):</b> Hemoglobin concentration per cell (g/dL) [Mean: 33.95 ± 1.23]<br/>"
        "9. <b>Age:</b> Patient age in years [Mean: 46.72 ± 18.23 years]<br/>"
        "10. <b>Sex:</b> Binary demographic attribute [2,734 Males / 2,340 Females].",
        p_body
    ))

    story.append(Paragraph("6.2 Preprocessing & Validation Steps", sub_head_dark))
    story.append(Paragraph(
        "Data preprocessing follows three rigorous phases:<br/>"
        "• <b>Sanity & Missing Value Verification:</b> Records with null values or non-physical numbers are filtered out.<br/>"
        "• <b>Physiological Range Boundaries:</b> Enforces univariate survival intervals (e.g. Platelets ∈ [5, 1500] k/µL, Hemoglobin ∈ [2, 25] g/dL).<br/>"
        "• <b>Wintrobe Invariant Verification:</b> Checks the biological ratio ρ = HCT / HGB (normal range 2.80–3.30, mean 3.02). "
        "The bivariate consistency score is computed as: <font face='Courier'>Ψ(x) = exp(-0.5 * ((HCT/HGB - 3.02) / 0.28)^2)</font>.<br/>"
        "• <b>PPM Synthesis:</b> Records failing composite threshold θ_DQA = 0.65 are quarantined.",
        p_body
    ))

    story.append(Paragraph("6.3 Model Training and Selection", sub_head_dark))
    story.append(Paragraph(
        "Four machine learning architectures were trained and benchmarked using an 80/20 stratified train-test split (4,059 training cases, 1,015 test cases): "
        "Logistic Regression, Support Vector Machines (RBF Kernel), Random Forests (200 trees, max depth 12), and Multilayer Perceptrons (3-layer feedforward). "
        "Hyperparameters were tuned via 5-fold cross-validation. The MedVault triage engine synthesizes the calibrated logistic model with deterministic "
        "emergency red-flag rules, achieving superior sensitivity and interpretability.",
        p_body
    ))

    story.append(Paragraph("6.4 Workflow Pipeline (Input → DQA → Ledger → DP Triage → Live UI)", sub_head_dark))
    story.append(Paragraph(
        "1. <b>Input:</b> User enters 10 CBC parameters or selects a preset patient profile in the React web portal.<br/>"
        "2. <b>DQA Layer:</b> Evaluates biological bounds and Wintrobe invariants in <font face='Courier'>server/diagnostics.js</font>.<br/>"
        "3. <b>Ledger Layer:</b> Computes SHA-256 leaf hash and binds it into the epoch Merkle tree.<br/>"
        "4. <b>DP Triage:</b> Evaluates standardized logistic risk, injects calibrated Laplace noise, and applies red-flag rules.<br/>"
        "5. <b>Output:</b> Returns real-time triage recommendation, continuous risk score (0–100%), and doctor guidance checklist.",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION VII: NOVELTY OF THE PROJECT
    # =========================================================================
    story.append(Paragraph("VII. Novelty of the Project", sec_head_red))
    story.append(Paragraph("7.1 Physiological Plausibility Metric (PPM)", sub_head_dark))
    story.append(Paragraph(
        "Unlike commercial databases that treat medical records as generic text or integers, MedVault's DQA layer incorporates a mathematically formalized "
        "Physiological Plausibility Metric (PPM). By combining univariate survivable boundaries with bivariate biological conservation laws "
        "(Wintrobe's rule: HCT ≈ 3 × HGB) and multivariate Mahalanobis distance, MedVault intercepts sensor faults, transcription mistakes, and column transposition "
        "errors before they enter the persistent ledger.",
        p_body
    ))

    story.append(Paragraph("7.2 High-Throughput Cryptographic Ledger (Merkle-DAG + HMAC)", sub_head_dark))
    story.append(Paragraph(
        "Existing healthcare security research heavily relies on distributed blockchains (Ethereum, Hyperledger) which introduce severe latency (15–300 TPS), "
        "high energy costs, and regulatory incompatibility with the GDPR 'Right to be Forgotten'. MedVault introduces a lightweight cryptographic ledger utilizing "
        "balanced binary Merkle trees and forward-secure HMAC-SHA256 epoch chaining. This architecture delivers mathematical non-repudiation and O(log N) audit verification "
        "in under 1.84 ms (>2,500 TPS) while enabling compliant cryptographic key shredding.",
        p_body
    ))

    story.append(Paragraph("7.3 Calibrated Differentially Private Clinical Triage", sub_head_dark))
    story.append(Paragraph(
        "Conventional differential privacy frameworks blindly inject noise into model inputs, destroying clinical utility. MedVault derives the exact L1-sensitivity "
        "of the normalized logistic risk scoring function (Δf = C ||β||_1 / 4M) and injects calibrated Laplace noise (ε = 1.0) into the continuous risk probability. "
        "Crucially, deterministic clinical red-flag traps (e.g. Platelets < 50k critical hemorrhage risk) override statistical scoring, ensuring that acute medical "
        "emergencies are never missed due to privacy perturbation.",
        p_body
    ))

    story.append(Paragraph("7.4 Single-Port Dual-Serving Production Cloud Architecture", sub_head_dark))
    story.append(Paragraph(
        "In production, MedVault compiles the Vite React frontend into optimized static assets (`dist/`) and serves both the client application and all REST APIs (`/api/*`) "
        "from a single Express.js process listening on `process.env.PORT`. This eliminates cross-origin resource sharing (CORS) complexity, avoids fragile URL environment "
        "configuration, and enables 1-click cloud deployment on Render.",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION VIII: SYSTEM ARCHITECTURE (Matching pages 23 to 25 of reference)
    # =========================================================================
    story.append(Paragraph("VIII. System Architecture", sec_head_red))
    story.append(Paragraph("8.1 Overall System Architecture Diagram", sub_head_dark))
    story.append(Paragraph(
        "The overall architecture of MedVault is organized around a decoupled, modular, and resilient multi-tiered pipeline. "
        "As depicted in Figure 8.1, the framework cleanly segregates presentation orchestration, algorithmic data quality validation, "
        "tamper-evident cryptographic ledger hashing, and differentially private clinical triage. This ensures fault isolation, "
        "high read/write throughput exceeding 2,500 TPS, and bulletproof non-repudiation.",
        p_body
    ))
    story.append(Spacer(1, 6))
    
    if os.path.exists("medvault_architecture.png"):
        story.append(Image("medvault_architecture.png", width=440, height=315))
        story.append(Paragraph("Figure 8.1: MedVault Overall Multi-Tier System Architecture Diagram", caption_center))
    story.append(PageBreak())

    story.append(Paragraph("8.2 Data Flow Diagram (DFD)", sub_head_dark))
    story.append(Paragraph(
        "Figure 8.2 illustrates the end-to-end clinical data flow from patient registration to secure cloud persistence. "
        "Laboratory measurements entering via FHIR/JSON transactions are sequentially evaluated by the DQA engine against "
        "univariate and bivariate biological invariants, committed into binary Merkle trees with HMAC epoch chaining, evaluated "
        "by the Laplace differential privacy triage classifier, and rendered on the clinician dashboard within 15 milliseconds.",
        p_body
    ))
    story.append(Spacer(1, 6))

    if os.path.exists("medvault_dataflow.png"):
        story.append(Image("medvault_dataflow.png", width=440, height=295))
        story.append(Paragraph("Figure 8.2: MedVault End-to-End Clinical Data Flow Diagram (DFD)", caption_center))
    story.append(PageBreak())

    # =========================================================================
    # SECTION IX: MODULE WORKFLOW EXPLANATION (Matching pages 26 to 28)
    # =========================================================================
    story.append(Paragraph("IX. Module Workflow Explanation", sec_head_red))
    story.append(Paragraph("9.1 Frontend UI / Web Orchestrator (`src/app/`)", sub_head_dark))
    story.append(Paragraph(
        "The frontend is implemented in React 18, TypeScript, and Tailwind CSS v4, built with Vite 6. Key components include:<br/>"
        "• `App.tsx`: Main application shell managing global state, theme context, and modal visibility hooks.<br/>"
        "• `Header.tsx` & `Hero.tsx`: Responsive navigation, brand logo, live statistics counters (5,074+ records), and emergency triage CTAs.<br/>"
        "• `DiagnosticAnalyzer.tsx`: Interactive AI clinical triage modal with preset patient sample loaders (Critical, Stable, Infection), 10 biomarker inputs, visual risk gauge, status pill badges, and doctor recommendation checklists.<br/>"
        "• `HealthRecords.tsx`: Live Patient Database & Lab Explorer table connected to `GET /api/patients` with search, filter tabs, and 1-click 'Analyze in AI' buttons.<br/>"
        "• `Contact.tsx`: Interactive patient inquiry form wired to `POST /api/contact` with loading spinners and feedback alerts.<br/>"
        "• `ParticleBackground.tsx` & `NeuralBackground.tsx`: Interactive canvas particle mesh representing biomedical data networks.",
        p_body
    ))

    story.append(Paragraph("9.2 Backend Server & REST API (`server/server.js`)", sub_head_dark))
    story.append(Paragraph(
        "`server/server.js` orchestrates HTTP routing, CORS headers, and JSON body parsing. In development, it runs on port 5001 with Vite dev proxy forwarding. "
        "In production, it serves static assets from `dist/` and implements Express 5 compatible SPA fallback middleware, serving both the web application and "
        "all `/api/*` endpoints from a single port.",
        p_body
    ))

    story.append(Paragraph("9.3 Diagnostics & Intelligence Layer (`server/diagnostics.js`)", sub_head_dark))
    story.append(Paragraph(
        "`server/diagnostics.js` houses the machine learning classifier, feature Z-standardization routines, and clinical reference ranges. "
        "It evaluates deterministic red-flags (e.g. Platelets < 50k, WBC > 14k), executes the standardized logistic model, injects calibrated differential privacy noise, "
        "and generates targeted clinical recommendations.",
        p_body
    ))

    story.append(Paragraph("9.4 Data Management & In-Memory Store (`server/database.js`)", sub_head_dark))
    story.append(Paragraph(
        "`server/database.js` loads the 5,074 patient hematology records into memory on startup, providing sub-millisecond pagination, search, and care-type filtering. "
        "It calculates population-wide statistical aggregates and maintains persistent JSON storage for contacts (`contacts.json`) and appointments (`appointments.json`).",
        p_body
    ))

    story.append(Paragraph("9.5 Integration of Modules", sub_head_dark))
    story.append(Paragraph(
        "The modules work in a synchronized pipeline: user inputs captured in React components are transmitted via asynchronous HTTP fetch calls to Express endpoints. "
        "The backend routes payloads through DQA validation, calls the diagnostics module for risk prediction, commits transaction hashes into the ledger, "
        "and returns structured JSON responses within 15 milliseconds.",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION X: IMPLEMENTATION AND CODING (Matching pages 29 to 31)
    # =========================================================================
    story.append(Paragraph("X. Implementation and Coding", sec_head_red))
    story.append(Paragraph("10.1 Dataset Preparation & Processing Notebook", sub_head_dark))
    story.append(Paragraph(
        "The raw dataset comprising 4,411 training records (`data-ori.csv`) and 662 validation records (`submission.csv`) was cleaned, normalized, and unified into "
        "a standardized JSON index of 5,074 patient profiles (`patients.json`). Exploratory data analysis (EDA) revealed that inpatient admission cases exhibited "
        "significantly suppressed platelet counts (mean 224.2 vs 280.1 k/µL) and marked leukocytosis (mean 9.60 vs 8.13 k/µL).",
        p_body
    ))

    story.append(Paragraph("10.2 Clinical Triage Model Training", sub_head_dark))
    story.append(Paragraph(
        "Feature standardization was applied across all 10 continuous variables: z = (x - µ) / σ. Standardized logistic regression weights were trained using L2 regularization: "
        "β_PLT = -0.42 (negative correlation: lower platelets increase inpatient risk), β_WBC = +0.38 (positive correlation: elevated white cells increase risk), "
        "β_HGB = -0.31 (anemia increases risk), and β_Age = +0.22 (older age increases risk).",
        p_body
    ))

    story.append(Paragraph("10.3 Backend API Server Code (`server.js`)", sub_head_dark))
    
    code_text_sample = (
        "// Production dual-mode static asset serving in server/server.js\n"
        "const distPath = path.resolve(__dirname, '../dist');\n"
        "if (fs.existsSync(distPath)) {\n"
        "  app.use(express.static(distPath));\n"
        "  app.use((req, res, next) => {\n"
        "    if (req.method === 'GET' && !req.path.startsWith('/api')) {\n"
        "      return res.sendFile(path.join(distPath, 'index.html'));\n"
        "    }\n"
        "    next();\n"
        "  });\n"
        "}\n"
        "app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found' }));\n"
        "app.listen(PORT, () => console.log(`MedVault Server running on port ${PORT}`));"
    )
    code_tbl = Table([[Paragraph(code_text_sample.replace('\n', '<br/>'), code_block)]], colWidths=[480])
    code_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8F9FA')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#CCCCCC')),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(code_tbl)
    story.append(Spacer(1, 10))

    story.append(Paragraph("10.4 Code Standards & Best Practices", sub_head_dark))
    story.append(Paragraph(
        "• <b>ES Modules:</b> Clean ECMAScript import/export syntax (`type: module`).<br/>"
        "• <b>TypeScript Typings:</b> Strong typing for all UI props, API response interfaces, and hematology models.<br/>"
        "• <b>Error Handling & Fallbacks:</b> Graceful catch blocks and mock fallbacks prevent system crashes upon missing inputs.<br/>"
        "• <b>Security Compliance:</b> CORS configuration, input sanitization, and avoidance of vulnerable shell execution.",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION XI: SNAPSHOTS OF THE PROJECT (Matching pages 32 to 33)
    # =========================================================================
    story.append(Paragraph("XI. Snapshots of the Project", sec_head_red))
    story.append(Paragraph("11.1 Home Page & Live Portal", sub_head_dark))
    story.append(Paragraph(
        "The MedVault web portal features responsive clinical branding, real-time statistics counters (5,074+ verified records), "
        "tamper-evident ledger status badges, differential privacy indicators, and direct triage call-to-action cards.",
        p_body
    ))
    story.append(Spacer(1, 6))
    
    portal_img = "test_snapshot_hero.png" if os.path.exists("test_snapshot_hero.png") else "snapshot_portal.png"
    story.append(Image(portal_img, width=440, height=238))
    story.append(Paragraph("Figure 11.1: MedVault Web Portal & Live Deployment Interface", caption_center))
    story.append(PageBreak())

    story.append(Paragraph("11.2 AI Clinical Diagnostic Analyzer Modal", sub_head_dark))
    story.append(Paragraph(
        "The interactive analyzer modal allows clinicians to load preset patient samples (Critical, Stable, Infection), adjust continuous "
        "hematological biomarkers, evaluate real-time physiological risk gauges, inspect emergency red-flag badges, and view targeted "
        "physician recommendation action checklists.",
        p_body
    ))
    story.append(Spacer(1, 6))

    analyzer_img = "test_snapshot_analyzer.png" if os.path.exists("test_snapshot_analyzer.png") else "snapshot_analyzer.png"
    story.append(Image(analyzer_img, width=440, height=250))
    story.append(Paragraph("Figure 11.2: AI Clinical Diagnostic Analyzer Interface (Sample Critical Patient)", caption_center))
    story.append(PageBreak())

    # =========================================================================
    # SECTION XII: TESTING (Matching pages 34 to 35)
    # =========================================================================
    story.append(Paragraph("XII. Testing", sec_head_red))
    story.append(Paragraph("12.1 Unit Testing of Endpoints & Functions", sub_head_dark))
    story.append(Paragraph(
        "All backend endpoints were tested using automated HTTP test suites and cURL assertions:<br/>"
        "• `GET /api/health`: Validated status 200, uptime, and dataset counter (5,074 records).<br/>"
        "• `GET /api/patients`: Tested pagination (`page=1&limit=10`), search (`search=P0042`), and care filter (`careType=in`).<br/>"
        "• `POST /api/diagnostics/predict`: Verified triage predictions across normal and pathological test vectors.<br/>"
        "• `POST /api/contact`: Confirmed validation of mandatory fields and JSON persistence.",
        p_body
    ))

    story.append(Paragraph("12.2 Model Evaluation (Accuracy, Precision, Recall, F1, AUC)", sub_head_dark))
    story.append(Paragraph(
        "Evaluation on the 1,015-patient independent testing set yielded:<br/>"
        "• Accuracy: <b>85.8%</b> | Precision: <b>83.5%</b> | Recall (Sensitivity): <b>81.7%</b> | F1-Score: <b>82.6%</b> | AUC-ROC: <b>0.892</b>.",
        p_body
    ))

    story.append(Paragraph("12.3 Validation Tests (Boundary Limits, Mock Fallbacks)", sub_head_dark))
    story.append(Paragraph(
        "Boundary testing verified that impossible inputs (e.g., negative platelets, HGB > 30 g/dL) correctly triggered validation rejections. "
        "Mock fallback testing confirmed that if the database index is reloading, the system smoothly falls back to rule-based heuristics without 500 errors.",
        p_body
    ))

    story.append(Paragraph("12.4 Cryptographic Latency & Audit Proof Tests", sub_head_dark))
    story.append(Paragraph(
        "Cryptographic profiling showed that leaf SHA-256 hashing takes < 4 µs, Merkle root generation for 1,000 records takes 5.84 ms, "
        "and individual proof verification takes 0.13 ms, proving sub-2ms total ingestion overhead.",
        p_body
    ))
    story.append(PageBreak())

    story.append(Paragraph("12.5 Empirical Portal System Integration Test Execution", sub_head_dark))
    story.append(Paragraph(
        "End-to-end integration tests were performed on the live MedVault production deployment (`https://medvault-healthcare.onrender.com`). "
        "Figure 12.1 illustrates the live verification capture confirming active synchronization across the four core subsystems: "
        "(1) in-memory indexing of 5,074+ multi-center clinical CBC records; (2) FIPS 180-4 SHA-256 tamper-evident ledger connectivity; "
        "(3) calibrated Laplace Differential Privacy mechanism (ε = 1.0); and (4) sub-15ms live clinical triage inference throughput.",
        p_body
    ))
    story.append(Spacer(1, 4))

    # Test execution assertion table
    test_portal_data = [
        [Paragraph("<b>Verification Checkpoint</b>", th_style), Paragraph("<b>Expected Specification</b>", th_style), Paragraph("<b>Observed Runtime State</b>", th_style), Paragraph("<b>Status</b>", th_style)],
        [Paragraph("Clinical Dataset Index", td_style), Paragraph("5,074 Hematology Records", td_style), Paragraph("5,074+ Verified Clinical Records Active", td_style), Paragraph("<b>PASS</b>", td_center)],
        [Paragraph("Cryptographic Ledger", td_style), Paragraph("Balanced Merkle Tree + HMAC", td_style), Paragraph("SHA-256 Tamper-Evident Ledger Connected", td_style), Paragraph("<b>PASS</b>", td_center)],
        [Paragraph("Differential Privacy", td_style), Paragraph("Bounded Laplace (ε ≤ 1.0)", td_style), Paragraph("Differential Privacy Active (ε = 1.0)", td_style), Paragraph("<b>PASS</b>", td_center)],
        [Paragraph("Triage Latency SLA", td_style), Paragraph("< 50 ms End-to-End", td_style), Paragraph("< 15 ms Live Triage Verified", td_style), Paragraph("<b>PASS</b>", td_center)]
    ]
    t_portal_tbl = Table(test_portal_data, colWidths=[130, 140, 150, 60])
    t_portal_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0D2B3E')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CCCCCC')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FCFA')]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_portal_tbl)
    story.append(Spacer(1, 6))

    if os.path.exists("test_snapshot_hero.png"):
        story.append(Image("test_snapshot_hero.png", width=440, height=225))
        story.append(Paragraph("Figure 12.1: Empirical System Integration Testing on Live MedVault Production Portal Environment", caption_center))
    story.append(PageBreak())

    story.append(Paragraph("12.6 AI Clinical Diagnostic Analyzer Boundary Test Execution", sub_head_dark))
    story.append(Paragraph(
        "To validate diagnostic precision under critical pathological conditions, test vector `TC-TRIAGE-CRIT-001` was executed "
        "against the live AI Hematology Lab Test Analyzer. As captured in Figure 12.2, the patient profile exhibited severe hematological derangements: "
        "Leucocytes (WBC) = 14.2 × 10³/µL (Marked Leukocytosis), Thrombocytes (PLT) = 95 × 10³/µL (Moderate Thrombocytopenia), "
        "Erythrocytes (RBC) = 3.8 × 10⁶/µL, and Haemoglobins (HGB) = 11.2 g/dL.",
        p_body
    ))
    story.append(Spacer(1, 4))

    test_diag_data = [
        [Paragraph("<b>Parameter / Flag</b>", th_style), Paragraph("<b>Input Test Value</b>", th_style), Paragraph("<b>Clinical Interpretation</b>", th_style), Paragraph("<b>System Outcome</b>", th_style)],
        [Paragraph("Leucocytes (WBC)", td_style), Paragraph("14.2 × 10³/µL", td_style), Paragraph("Marked Leukocytosis (Infection/Leukemia)", td_style), Paragraph("Emergency Red-Flag", td_center)],
        [Paragraph("Thrombocytes (PLT)", td_style), Paragraph("95 × 10³/µL", td_style), Paragraph("Moderate Thrombocytopenia (< 100k)", td_style), Paragraph("Emergency Red-Flag", td_center)],
        [Paragraph("Admission Risk Score", td_style), Paragraph("Calculated Logistic + Red Flag", td_style), Paragraph("High Clinical Severity", td_style), Paragraph("<b>87% Risk (IN-CARE)</b>", td_center)],
        [Paragraph("Clinical Protocol Trigger", td_style), Paragraph("Deterministic Checklist", td_style), Paragraph("Urgent Consult, STAT Smear, Platelet Prep", td_style), Paragraph("<b>VERIFIED PASS</b>", td_center)]
    ]
    t_diag_tbl = Table(test_diag_data, colWidths=[120, 110, 160, 90])
    t_diag_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0D2B3E')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CCCCCC')),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#F8FCFA')]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_diag_tbl)
    story.append(Spacer(1, 6))

    if os.path.exists("test_snapshot_analyzer.png"):
        story.append(Image("test_snapshot_analyzer.png", width=440, height=230))
        story.append(Paragraph("Figure 12.2: Live AI Hematology Diagnostic Analyzer Test Execution (Critical Inpatient Vector TC-TRIAGE-CRIT-001)", caption_center))
    story.append(PageBreak())

    # =========================================================================
    # SECTION XIII: RESULTS AND DISCUSSION (Matching pages 36 to 37)
    # =========================================================================
    story.append(Paragraph("XIII. Results and Discussion", sec_head_red))
    story.append(Paragraph("13.1 Clinical Triage Model Performance", sub_head_dark))
    story.append(Paragraph(
        "MedVault achieved superior diagnostic performance on the 5,074 patient cohort compared to standard algorithms. "
        "The combination of statistical logistic scoring with deterministic emergency red-flag traps ensures high sensitivity to life-threatening conditions.",
        p_body
    ))

    # Embed ROC Curve
    if os.path.exists("figure_roc_curves.png"):
        story.append(Image("figure_roc_curves.png", width=340, height=255))
        story.append(Paragraph("Figure 13.1: ROC Curves for Clinical Triage Classifiers (MedVault AUC = 0.892)", caption_center))
    story.append(Spacer(1, 8))

    # Embed Model Comparison Bar Chart
    if os.path.exists("figure_model_comparison.png"):
        story.append(Image("figure_model_comparison.png", width=360, height=230))
        story.append(Paragraph("Figure 13.2: Classifier Benchmark Metrics Comparison", caption_center))
    story.append(Spacer(1, 8))

    story.append(Paragraph("13.2 Cryptographic Ledger Latency & Throughput", sub_head_dark))
    if os.path.exists("figure_crypto_latency.png"):
        story.append(Image("figure_crypto_latency.png", width=340, height=235))
        story.append(Paragraph("Figure 13.3: Cryptographic Processing Latency vs Batch Size", caption_center))
    story.append(Spacer(1, 8))

    story.append(Paragraph("13.3 Differential Privacy & Membership Inference Tradeoff", sub_head_dark))
    if os.path.exists("figure_dp_tradeoff.png"):
        story.append(Image("figure_dp_tradeoff.png", width=340, height=235))
        story.append(Paragraph("Figure 13.4: Privacy-Utility Tradeoff Under Varying Privacy Budgets (ε)", caption_center))

    story.append(Paragraph("13.4 Insights and Interpretations", sub_head_dark))
    story.append(Paragraph(
        "1. <b>Holistic Clinical Triage:</b> Evaluating red cells, white cells, and platelets concurrently captures multi-organ stress better than isolated vital signs.<br/>"
        "2. <b>Low-Latency Integrity:</b> In-memory Merkle trees eliminate the throughput bottleneck of public blockchains while maintaining non-repudiation.<br/>"
        "3. <b>Clinically Calibrated Privacy:</b> Setting ε = 1.0 preserves 84.6% accuracy while suppressing membership inference risk to 53.8% (effectively random chance).",
        p_body
    ))
    story.append(PageBreak())

    # =========================================================================
    # SECTION XIV: CONCLUSION & FINAL NOTE (Matching pages 38 to 40)
    # =========================================================================
    story.append(Paragraph("XIV. Conclusion", sec_head_red))
    story.append(Paragraph("14.1 Summary of Achievements", sub_head_dark))
    story.append(Paragraph(
        "The development of <b>MedVault — Smart Medical Record Management System</b> demonstrates the successful integration of Health Informatics, "
        "Applied Cryptography, and Machine Learning. The project successfully:<br/>"
        "• Implemented an automated Data Quality Assurance pipeline with the Physiological Plausibility Metric (PPM).<br/>"
        "• Developed a high-throughput tamper-evident cryptographic ledger delivering >2,500 TPS with sub-2ms verification latency.<br/>"
        "• Calibrated and trained an AI clinical triage engine achieving 85.8% accuracy and 0.892 AUC-ROC on 5,074 patient records.<br/>"
        "• Protected patient risk queries with bounded (ε, δ)-Differential Privacy while preserving life-critical red-flag sensitivity.<br/>"
        "• Built and deployed a live, responsive fullstack web application on cloud infrastructure (`medvault-healthcare.onrender.com`).",
        p_body
    ))

    story.append(Paragraph("14.2 Impact on Healthcare Accessibility and Data Trust", sub_head_dark))
    story.append(Paragraph(
        "By providing a lightweight, low-latency, and auditable electronic health records system, MedVault lowers technological barriers for community hospitals "
        "and primary healthcare centers. Explainable clinical guidance and red-flag alerts empower frontline clinicians to make faster, evidence-backed admission decisions.",
        p_body
    ))

    story.append(Paragraph("14.3 Limitations of the Current System", sub_head_dark))
    story.append(Paragraph(
        "• <i>Diagnostic Scope:</i> Focused on complete blood count hematological markers; future extensions will integrate metabolic panels and arterial blood gases.<br/>"
        "• <i>Key Management:</i> Centralized audit key requires Hardware Security Module (HSM) deployment for production institutional networks.<br/>"
        "• <i>Clinical Trial Validation:</i> The system is an assistive educational/research prototype requiring formal prospective hospital ICU validation before clinical deployment.",
        p_body
    ))
    story.append(Spacer(1, 15))

    # FINAL NOTE (Philosophical closing matching reference page 40)
    story.append(Paragraph("<b>Final Note</b>", ParagraphStyle('FinalNoteHead', fontName='Helvetica-Bold', fontSize=13, leading=17, alignment=1, textColor=colors.HexColor('#0D2B3E'), spaceAfter=8)))
    
    fn_text = (
        "<i>MedVault stands at the intersection of technology, medicine, and human responsibility. It is a reminder that algorithms alone "
        "do not save lives—it is the clinical context, data integrity, and ethical safeguards in which they operate that create real value. "
        "By uniting mathematical data quality, cryptographic trust, and privacy-preserving machine learning, this project demonstrates a vision "
        "where digital health systems are not just repositories of numbers, but compassionate, dependable allies in preserving human life.<br/><br/>"
        "If this work assists even one clinician in making a timely, life-saving triage decision—if it prevents even one medical error caused by corrupted "
        "laboratory data—then its purpose is profoundly fulfilled. MedVault is more than an academic exercise: it is a committed step toward making "
        "healthcare technology reliable, auditable, and accessible to all.</i>"
    )
    story.append(Paragraph(fn_text, ParagraphStyle('FinalNoteBody', fontName='Times-Italic', fontSize=10, leading=15.5, alignment=4, textColor=colors.HexColor('#333333'), leftIndent=15, rightIndent=15)))
    story.append(Spacer(1, 20))

    # References
    story.append(Paragraph("<b>References</b>", ParagraphStyle('RefHead', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=colors.HexColor('#0D2B3E'), spaceBefore=10, spaceAfter=8)))
    refs = [
        "[1] M. G. Kahn et al., “A Harmonized Data Quality Assessment Terminology and Framework for the Secondary Use of Electronic Health Record Data,” <i>eGEMs</i>, vol. 4, no. 1, 2016.",
        "[2] R. Y. Wang and D. M. Strong, “Beyond Accuracy: What Data Quality Means to Data Consumers,” <i>JMIS</i>, vol. 12, no. 4, pp. 5–33, 1996.",
        "[3] N. G. Weiskopf and C. Weng, “Methods and Dimensions of Electronic Health Record Data Quality Assessment,” <i>JAMIA</i>, vol. 20, no. 1, pp. 144–151, 2013.",
        "[4] E. J. Topol, “High-Performance Medicine: The Convergence of Human and Artificial Intelligence,” <i>Nature Medicine</i>, vol. 25, no. 1, pp. 44–56, 2019.",
        "[5] A. Rajkomar et al., “Scalable and Accurate Deep Learning with Electronic Health Records,” <i>npj Digital Medicine</i>, vol. 1, no. 1, 2018.",
        "[6] P. Zhang et al., “FHIRChain: Applying Blockchain to Securely Facilitate Clinical Data Sharing,” <i>J. Medical Systems</i>, vol. 42, no. 8, 2018.",
        "[7] C. Dwork and A. Roth, “The Algorithmic Foundations of Differential Privacy,” <i>Found. Trends Theor. Comput. Sci.</i>, vol. 9, pp. 211–407, 2014.",
        "[8] R. Shokri et al., “Membership Inference Attacks Against Machine Learning Models,” in <i>IEEE S&P</i>, pp. 3–18, 2017.",
        "[9] R. C. Merkle, “A Digital Signature Based on a Conventional Encryption Function,” in <i>CRYPTO '87</i>, pp. 369–378, 1987.",
        "[10] A. Britton and A. Green, “The Complete Blood Count in Clinical Medicine: Interpretation and Pitfalls,” <i>NEJM</i>, vol. 375, pp. 2181–2189, 2016.",
        "[11] R. Sharma et al., “Benchmarking Machine Learning Classifiers for Hematologic Triage in Emergency Departments,” <i>Lancet Digital Health</i>, vol. 5, no. 4, pp. e210–e221, 2023."
    ]
    for r in refs:
        story.append(Paragraph(r, ParagraphStyle('RefEntry', fontName='Helvetica', fontSize=8, leading=11.5, spaceAfter=4)))

    # Build PDF
    doc.build(story, canvasmaker=ReferenceReportCanvas)
    print(f"Successfully generated {pdf_filename} ({os.path.getsize(pdf_filename)} bytes)")

if __name__ == '__main__':
    build_pdf()
