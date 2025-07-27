# Boundless

Boundless is a decentralized crowdfunding and grants platform built on the Stellar blockchain that empowers creators, innovators, and communities to launch and fund projects in a transparent and secure manner. Leveraging Soroban smart contracts, the platform facilitates milestone-based fund releases with built-in escrow mechanisms, ensuring that funds are only released when specific project milestones are met and independently verified. This approach minimizes risks for backers and provides creators with the financial support they need to drive innovation forward.

## Key Features

- **Decentralized crowdfunding and grant management** on the Stellar blockchain
- **Milestone-based fund distribution** using escrow and smart contracts
- **Secure and transparent community voting and feedback systems**
- **Flexible user roles** including campaign creators, grant applicants, managers, and admins
- **Integrated authentication** with email, social login, and KYC verification
- **Comprehensive backend support** with RESTful API endpoints and robust security measures
- **Automated contract deployment and upgrade processes** using CI/CD pipelines

## Technical Details

- **Smart Contracts:** Rust (Soroban SDK)
- **Frontend:** TypeScript, Next.js, Tailwind CSS, Zustand
- **Backend:** Node.js, RESTful APIs, Prisma ORM, PostgreSQL
- **Blockchain Integration:** Stellar SDK, Soroban smart contracts
- **DevOps:** GitHub Actions, Vercel, Docker

## User Flow

```mermaid
flowchart TD
    A["Step 1 - Visit Boundless Platform"] --> B1["Step 2 - Sign Up and KYC Verification"]
    B1 --> B2["Step 3 - Choose Role: Crowdfund Creator, Grant Applicant, Grant Creator or Admin"]
    B2 -- Crowdfund Creator --> CF1["Submit Project Idea for Validation"]
    CF1 --> CF2["Public Feedback and Voting"]
    CF2 --> CF3{"Does Idea Meet Threshold?"}
    CF3 -- No --> CFX["Rejected – Back to Editing or Archive"]
    CF3 -- Yes --> CF4["Create Campaign with Milestones and Funding Goal"]
    CF4 --> CF5["Campaign Goes Live with Deadline"]
    CF5 --> CF6["Users Back Project – Funds Held in Escrow"]
    CF6 --> CF7{"Goal Met by Deadline?"}
    CF7 -- No --> CF8["Refund All Backers"]
    CF7 -- Yes --> CF9["Project Execution Starts"]
    CF9 --> CF10["Submit Milestone Proof"]
    CF10 --> CF11["Admin or DAO Reviews Milestone"]
    CF11 --> CF12{"Was Milestone Approved?"}
    CF12 -- No --> CF13["Send Back for Revision or Cancel Project"]
    CF12 -- Yes --> CF14["Release Funds for Milestone"]
    CF14 --> CF9 & Z["Project Completed"]
    B2 -- Grant Applicant --> G1["Submit Proposal for Grant"]
    G1 --> G2["Community and Admin Review"]
    G2 --> G3{"Approved for Grant?"}
    G3 -- No --> GX["Rejected – Back to Edit or Archive"]
    G3 -- Yes --> G4["Grant Creator Reviews and Edits Milestones"]
    G4 --> G5["Final Approval and Escrow Lock"]
    G5 --> G6["Project Execution Starts"]
    G6 --> G7["Submit Milestone Proof"]
    G7 --> G8["Admin or DAO Reviews"]
    G8 --> G9{"Milestone Approved?"}
    G9 -- No --> G10["Revise or Pause Grant"]
    G9 -- Yes --> G11["Release Funds for Milestone"]
    G11 --> G6 & Z
    B2 -- Grant Creator --> GR1["Create Grant Program"]
    GR1 --> GR2["Define Rules and Milestones"]
    GR2 --> GR3["Launch Grant for Applications"]
    GR3 --> GR4["Review Submitted Proposals"]
    GR4 --> GR5{"Approve Any?"}
    GR5 -- No --> GRX["Close Grant or Extend Deadline"]
    GR5 -- Yes --> GR6["Approve and Escrow Funds"]
    GR6 --> GR7["Monitor Progress"]
    GR7 --> GR8["Approve or Reject Milestones"]
    B2 -- Admin --> AD1["Admin Dashboard Access"]
    AD1 --> AD2["Manage KYC Submissions"] & AD3["Oversee Campaigns and Grants"]
    AD3 --> AD4["Review Flagged Projects or Milestones"]
    AD4 --> AD5{"Valid Issue Found?"}
    AD5 -- Yes --> AD6["Pause or Cancel Project, Initiate Refund"]
    AD5 -- No --> AD7["Approve and Allow Continuation"]
    GR8 --> Z
    AD6 --> Z
    AD7 --> Z
    H1["Organizer Creates Hackathon Grant"] --> H2["Set Deadline, Rules, Prize Pool"]
    H2 --> H3["Hackathon Goes Live"]
    H3 --> H4["Participants Apply or Join"]
    H4 --> H5["Build + Submit Final Project"]
    H5 --> H6["Judging Panel + Public Voting"]
    H6 --> H7["Select Winners"]
    H7 --> H8["Disburse Prizes via Soroban"]
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Docker (for local blockchain and database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/boundlessfi/boundless-frontend.git
   cd boundless-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in required values.

4. **Run local development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Run tests:**
   ```bash
   npm test
   # or
   yarn test
   ```

6. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Contributing

Contributions are welcome! Please open issues and submit pull requests for new features, bug fixes, or improvements. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements

- Stellar Development Foundation
- Soroban SDK
- Next.js, Tailwind CSS, Zustand
- MongoDB
- Docker, Vercel, GitHub Actions
