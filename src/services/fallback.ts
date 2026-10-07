import type { AppData } from './api'

export const fallbackData: AppData = {
  institute: {
    name: 'Luwang Maheikol',
    shortName: 'LM',
    eyebrow: 'Science & Mathematics Coaching',
    tagline: 'Focused guidance. Quality study material. Better preparation.',
    location: 'Moirang Okshongbung, near the waiting shed',
    phone: '8132827573',
    email: 'salamguneshwar@gmail.com',
    timings: ['5:00 AM – 7:00 AM', '3:00 PM – 5:00 PM'],
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
    highlights: [
      { title: 'Affordable fees', text: 'Accessible coaching designed for consistent academic support.' },
      { title: 'Quality study notes', text: 'Printed study notes and revision material for regular practice.' },
      { title: 'Audio-visual classes', text: 'Projector-supported learning for clearer concepts and demonstrations.' },
      { title: 'Flexible batches', text: 'Morning and afternoon timings to fit students’ routines.' },
    ],
  },
  courses: [
    { id: 'demo-c11', title: 'Class 11 Science Foundation', audience: 'Class 11', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'], schedule: '3:00 PM – 5:00 PM', duration: 'Academic session', fee: 'Contact for fee', description: 'Concept-first preparation across core science subjects with structured notes and guided practice.', featured: true, status: 'ACTIVE' },
    { id: 'demo-c12', title: 'Class 12 Science Preparation', audience: 'Class 12', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics'], schedule: '5:00 AM – 7:00 AM', duration: 'Academic session', fee: 'Contact for fee', description: 'Focused board-exam preparation with revision, problem solving and regular study support.', status: 'ACTIVE' },
    { id: 'demo-c910', title: 'Science Support Batch', audience: 'Classes 9–10', subjects: ['Science', 'Mathematics'], schedule: '5:00 AM – 7:00 AM', duration: 'Academic session', fee: 'Contact for fee', description: 'Build strong fundamentals in science and mathematics before higher secondary studies.', status: 'ACTIVE' },
  ],
  notices: [
    { id: 'demo-n1', title: 'New batch enquiries are open', date: new Date().toISOString().slice(0, 10), category: 'Admissions', content: 'Students and parents can contact the centre for batch timing and fee details.', status: 'ACTIVE' },
    { id: 'demo-n2', title: 'Printed study notes available', date: new Date().toISOString().slice(0, 10), category: 'Study Material', content: 'Quality printed notes are part of the coaching support system.', status: 'ACTIVE' },
  ],
  materials: [
    { id: 'demo-m1', title: 'Physics — Motion & Laws', subject: 'Physics', className: 'Class 11', type: 'Notes', size: 'Demo', date: new Date().toISOString().slice(0, 10), description: 'A preview record. Real files appear automatically when the teacher publishes them.', status: 'ACTIVE' },
    { id: 'demo-m2', title: 'Chemistry — Basic Concepts', subject: 'Chemistry', className: 'Class 11', type: 'PDF', size: 'Demo', date: new Date().toISOString().slice(0, 10), description: 'A preview record for the study materials section.', status: 'ACTIVE' },
  ],
  gallery: [
    { id: 'demo-g1', title: 'Interactive classroom', category: 'Classroom', description: 'Projector-supported classroom learning.', tone: 'blue', status: 'ACTIVE' },
    { id: 'demo-g2', title: 'Study material corner', category: 'Resources', description: 'Printed notes and revision resources.', tone: 'gold', status: 'ACTIVE' },
    { id: 'demo-g3', title: 'Focused learning', category: 'Students', description: 'A calm environment for regular study.', tone: 'teal', status: 'ACTIVE' },
  ],
  videoLectures: [
    { id: 'demo-v1', title: 'Introduction to Motion', subject: 'Physics', className: 'Class 11', duration: '24 min', date: new Date().toISOString().slice(0, 10), description: 'Demo lecture card. Replace or add lectures from the teacher portal.', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', status: 'ACTIVE' },
    { id: 'demo-v2', title: 'Basic Concepts of Chemistry', subject: 'Chemistry', className: 'Class 11', duration: '31 min', date: new Date().toISOString().slice(0, 10), description: 'Demo lecture card for the public layout.', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', status: 'ACTIVE' },
  ],
}
