import type { Certification } from '../types'
import { certificatePath } from '../lib/certificates'

export const certifications: Certification[] = [
  {
    id: 'aws-services-overview',
    title: 'AWS Services Overview for IT Professionals',
    issuer: 'Amazon Web Services',
    year: '2024',
    date: '2024',
    category: 'Cloud Computing',
    summary:
      'Foundational overview of core AWS services, architecture patterns, and how IT teams adopt cloud infrastructure for scalable workloads.',
    skills: ['EC2', 'S3', 'IAM', 'VPC', 'CloudWatch'],
    pdf: certificatePath('AWS Services Overview for IT Professionals.pdf'),
  },
  {
    id: 'hands-on-aws',
    title: 'Hands-on with AWS for IT Professionals',
    issuer: 'Amazon Web Services',
    year: '2024',
    date: '2024',
    category: 'Cloud Computing',
    summary:
      'Practical labs covering provisioning, networking, storage, and operational best practices on AWS for production IT environments.',
    skills: ['AWS Console', 'Networking', 'Storage', 'Security'],
    pdf: certificatePath('Hands-on with AWS for IT Professionals.pdf'),
  },
  {
    id: 'data-analytics-aws',
    title: 'Getting Started with Data Analytics on AWS',
    issuer: 'Amazon Web Services',
    year: '2024',
    date: '2024',
    category: 'Data & Analytics',
    summary:
      'Introduction to analytics pipelines on AWS—including data ingestion, processing, visualization, and cost-aware architecture decisions.',
    skills: ['Athena', 'Glue', 'QuickSight', 'S3 Data Lakes'],
    pdf: certificatePath('Getting Started with Data Analytics on AWS.pdf'),
  },
  {
    id: 'intro-devops',
    title: 'Introduction to DevOps',
    issuer: 'Professional Development',
    year: '2024',
    date: '2024',
    category: 'DevOps',
    summary:
      'Covers CI/CD fundamentals, collaboration between dev and ops, automation, and culture practices for shipping software reliably.',
    skills: ['CI/CD', 'Automation', 'Agile', 'Infrastructure as Code'],
    pdf: certificatePath('Introduction to DevOps.pdf'),
  },
  {
    id: 'cyber-security',
    title: 'Hack Proof: Mastering Cyber Security Essentials',
    issuer: 'Cybersecurity Training',
    year: '2024',
    date: '2024',
    category: 'Security',
    summary:
      'Essential security principles including threat modeling, hardening systems, secure coding awareness, and incident response basics.',
    skills: ['Threat Modeling', 'Network Security', 'OWASP', 'Risk Assessment'],
    pdf: certificatePath('Hack Proof Mastering Cyber Security Essentials.pdf'),
  },
  {
    id: 'digital-divide',
    title: 'Bridging the Digital Divide',
    issuer: 'Digital Literacy Program',
    year: '2024',
    date: '2024',
    category: 'Community & Education',
    summary:
      'Focuses on expanding digital access, literacy, and inclusion—equipping communities with tools and knowledge for the modern economy.',
    skills: ['Digital Literacy', 'Community Outreach', 'ICT Fundamentals'],
    pdf: certificatePath('Bridging the  Digital Divide.pdf'), // double space preserved to match public/certificates/ filename
  },
  {
    id: 'oneccs-connected',
    title: 'OneCCS Connected Minds',
    issuer: 'OneCCS',
    year: '2024',
    date: '2024',
    category: 'Leadership & Collaboration',
    summary:
      'Program emphasizing connected learning, collaboration across teams, and building mindset for innovation in technical environments.',
    skills: ['Collaboration', 'Leadership', 'Innovation'],
    pdf: certificatePath('OneCCS Connected Minds.pdf'),
  },
]
