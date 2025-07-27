#!/bin/bash

# Branch Protection Setup Script
# This script helps set up branch protection rules and CI/CD configuration

set -e

echo "🛡️  Setting up Branch Protection & CI/CD System"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository. Please run this script from your project root."
    exit 1
fi

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    print_warning "GitHub CLI (gh) is not installed. Please install it to use this script."
    print_info "Installation: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated with GitHub
if ! gh auth status &> /dev/null; then
    print_error "Not authenticated with GitHub. Please run 'gh auth login' first."
    exit 1
fi

# Get repository information
REPO_OWNER=$(gh repo view --json owner --jq .owner.login)
REPO_NAME=$(gh repo view --json name --jq .name)
FULL_REPO="$REPO_OWNER/$REPO_NAME"

print_info "Repository: $FULL_REPO"

# Function to set up branch protection
setup_branch_protection() {
    local branch=$1
    print_info "Setting up protection for branch: $branch"
    
    # Check if branch exists
    if ! git show-ref --verify --quiet refs/remotes/origin/$branch; then
        print_warning "Branch $branch doesn't exist remotely. Creating it..."
        git checkout -b $branch
        git push -u origin $branch
    fi
    
    # Set up branch protection rules
    gh api repos/$FULL_REPO/branches/$branch/protection \
        --method PUT \
        --field required_status_checks='{"strict":true,"contexts":["Code Quality & Linting","Build & Test","Security Audit"]}' \
        --field enforce_admins=true \
        --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"require_last_push_approval":true}' \
        --field restrictions=null \
        --field allow_force_pushes=false \
        --field allow_deletions=false \
        --field block_creations=false \
        --field required_conversation_resolution=true \
        --field lock_branch=false \
        --field allow_fork_syncing=true
    
    print_status "Branch protection set up for $branch"
}

# Function to create required branches
create_branches() {
    print_info "Creating required branches..."
    
    local branches=("main" "develop" "staging")
    
    for branch in "${branches[@]}"; do
        if ! git show-ref --verify --quiet refs/remotes/origin/$branch; then
            print_info "Creating branch: $branch"
            git checkout -b $branch
            git push -u origin $branch
        else
            print_info "Branch $branch already exists"
        fi
    done
    
    # Switch back to main
    git checkout main
}

# Function to update CODEOWNERS
update_codeowners() {
    print_info "Updating CODEOWNERS file..."
    
    # Get current user
    CURRENT_USER=$(gh api user --jq .login)
    
    # Create CODEOWNERS content
    cat > .github/CODEOWNERS << EOF
# Global code owners
* @$CURRENT_USER

# Critical files that require senior developer review
/.github/ @$CURRENT_USER
/package.json @$CURRENT_USER
/tsconfig.json @$CURRENT_USER
/eslint.config.mjs @$CURRENT_USER
/.prettierrc @$CURRENT_USER

# Wallet integration files (critical for security)
/hooks/use-wallet.ts @$CURRENT_USER
/components/wallet/ @$CURRENT_USER
/app/api/ @$CURRENT_USER

# Core components
/components/sheet/ @$CURRENT_USER
/components/ui/ @$CURRENT_USER

# Configuration and documentation
/README.md @$CURRENT_USER
/DEVELOPMENT.md @$CURRENT_USER
/PRE_COMMIT_SETUP.md @$CURRENT_USER
/CI_CD_GUIDE.md @$CURRENT_USER

# CI/CD workflows
/.github/workflows/ @$CURRENT_USER

# Type definitions
/types/ @$CURRENT_USER

# Utility functions
/lib/ @$CURRENT_USER
EOF
    
    print_status "CODEOWNERS file updated with current user: @$CURRENT_USER"
}

# Function to enable GitHub Actions
enable_actions() {
    print_info "Enabling GitHub Actions..."
    
    # Enable actions for the repository
    gh api repos/$FULL_REPO --method PATCH --field allow_auto_merge=true --field delete_branch_on_merge=true
    
    print_status "GitHub Actions enabled"
}

# Function to create issue templates
create_issue_templates() {
    print_info "Creating issue templates..."
    
    mkdir -p .github/ISSUE_TEMPLATE
    
    # Bug report template
    cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: ['bug']
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Browser: [e.g. Chrome, Safari, Firefox]
 - Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
EOF

    # Feature request template
    cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: ['enhancement']
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
EOF

    print_status "Issue templates created"
}

# Function to create pull request template
create_pr_template() {
    print_info "Creating pull request template..."
    
    cat > .github/pull_request_template.md << 'EOF'
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Additional Notes
Any additional information or context.
EOF

    print_status "Pull request template created"
}

# Main execution
main() {
    print_info "Starting branch protection setup..."
    
    # Create required branches
    create_branches
    
    # Set up branch protection for each branch
    setup_branch_protection "main"
    setup_branch_protection "develop"
    setup_branch_protection "staging"
    
    # Update CODEOWNERS
    update_codeowners
    
    # Enable GitHub Actions
    enable_actions
    
    # Create templates
    create_issue_templates
    create_pr_template
    
    print_status "Branch protection setup complete!"
    echo ""
    print_info "Next steps:"
    echo "1. Review and update .github/CODEOWNERS with your team members"
    echo "2. Configure notification endpoints in CI/CD workflows"
    echo "3. Test the system by creating a pull request"
    echo "4. Review the CI_CD_GUIDE.md for detailed information"
    echo ""
    print_warning "Remember: The CI/CD system will now enforce code quality on all protected branches!"
}

# Run main function
main "$@" 
