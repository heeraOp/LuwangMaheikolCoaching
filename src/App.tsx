import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import TeacherLayout from './layouts/TeacherLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Notices from './pages/Notices'
import StudyMaterials from './pages/StudyMaterials'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Enquiry from './pages/Enquiry'
import VideoLectures from './pages/VideoLectures'
import ActivityLogs from './pages/ActivityLogs'
import TeacherLogin from './pages/TeacherLogin'
import TeacherDashboard from './pages/TeacherDashboard'
import ManageNotices from './pages/ManageNotices'
import ManageMaterials from './pages/ManageMaterials'
import ManageGallery from './pages/ManageGallery'
import StudentEnquiries from './pages/StudentEnquiries'
import ManageCourse from './pages/ManageCourse'
import ManageVideoLectures from './pages/ManageVideoLectures'
import CoachingInfo from './pages/CoachingInfo'

export default function App() {
  return <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/materials" element={<StudyMaterials />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/video-lectures" element={<VideoLectures />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/enquiry" element={<Enquiry />} />
      <Route path="/coaching-info" element={<Navigate to="/about" replace />} />
    </Route>
    <Route path="/teacher/login" element={<TeacherLogin />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<ManageCourse />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="materials" element={<ManageMaterials />} />
        <Route path="video-lectures" element={<ManageVideoLectures />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="enquiries" element={<StudentEnquiries />} />
        <Route path="activity-logs" element={<ActivityLogs />} />
        <Route path="coaching-info" element={<CoachingInfo />} />
      </Route>
    </Route>
  </Routes>
}
