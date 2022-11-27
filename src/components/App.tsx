import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Global } from '@emotion/react';
import { Box, CircularProgress } from '@mui/material';
import { GlobalStyle } from '../theme';
import { ProtectedRoute, AuthRoute, AdminRoute } from './ProtectedRoute';
import { getCurrentUser } from '../redux/auth/authAPI';
import Layout from './Layout';
import Notification from '@components/Notification';

const createChunk = (componentName: string) => {
  return lazy(() =>
    import(`../pages/${componentName}`).then(module => ({
      default: module[componentName],
    })),
  );
};

const ExamplePage = createChunk('Example');
const StartPage = createChunk('Start');
const HomePage = createChunk('Home');
const UserProfilePage = createChunk('UserProfile');
const NotFoundPage = createChunk('NotFound');
const CreateCoursePage = createChunk('CreateCourse');
const CoursesPage = createChunk('Courses');
const CourseDetailsPage = createChunk('CourseDetails');
const ChapterPage = createChunk('Chapter');
const QuizzesPage = createChunk('Quizzes');
const QuizToChooseTheCorrectAnswerPage = createChunk(
  'QuizToChooseTheCorrectAnswer',
);
// const QuizPuzzlePage = createChunk('QuizPuzzle');
const QuizTranslateSentencesPage = createChunk('QuizTranslateSentences');

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  });

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={100} />
        </Box>
      }
    >
      <Global styles={GlobalStyle} />
      <Notification />

      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to="/start" />} />
        <Route
          path="/start"
          element={
            <AuthRoute>
              <StartPage />
            </AuthRoute>
          }
        />

        <Route path="/" element={<Layout />}>
          <Route
            path="home"
            element={<ProtectedRoute children={<HomePage />} />}
          />

          <Route
            path="user-profile"
            element={<ProtectedRoute children={<UserProfilePage />} />}
          />

          <Route
            path="courses"
            element={<ProtectedRoute children={<CoursesPage />} />}
          />

          <Route
            path="example"
            element={<ProtectedRoute children={<ExamplePage />} />}
          />

          {/* <Route
            path="test"
            element={
              <ProtectedRoute children={<QuizTranslateSentencesPage />} />
            }
          /> */}

          <Route
            path="courses/:courseName/:courseId"
            element={<ProtectedRoute children={<CourseDetailsPage />} />}
          />

          <Route
            path="courses/:courseName/:courseId/:moduleName/:moduleId/quizzes"
            element={<ProtectedRoute children={<QuizzesPage />} />}
          />

          <Route
            path="courses/:courseName/:courseId/:moduleName/:moduleId/quizzes/toChooseTheCorrectAnswer/:quizName/:quizId"
            element={
              <ProtectedRoute children={<QuizToChooseTheCorrectAnswerPage />} />
            }
          />

          <Route
            path="courses/:courseName/:courseId/:moduleName/:moduleId/quizzes/translateSentences/:quizName/:quizId"
            element={
              <ProtectedRoute children={<QuizTranslateSentencesPage />} />
            }
          />

          <Route
            path="courses/:courseName/:courseId/:chapterName/:chapterId"
            element={<ProtectedRoute children={<ChapterPage />} />}
          />

          <Route
            path="create-course"
            element={<AdminRoute children={<CreateCoursePage />} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
