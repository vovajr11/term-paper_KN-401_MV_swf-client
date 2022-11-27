import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (credentials: object, { rejectWithValue }) => {
    try {
      const res = await axios.post('/courses', credentials);

      return res.data.course;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createModule = createAsyncThunk(
  'course/createModule',
  async (credentials: any, { rejectWithValue }) => {
    try {
      const res = await axios.post('/modules', credentials);

      return { courseId: credentials.courseId, resData: res.data.module };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createChapter = createAsyncThunk(
  'course/createChapter',
  async (credentials: any, { rejectWithValue }) => {
    try {
      const res = await axios.post('/chapters', credentials);

      return { moduleId: credentials.moduleId, resData: res.data.chapter };
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getDetailsOfAllCourses = createAsyncThunk(
  'course/getDetailsOfAllCourses',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/courses/courses-details');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCourseForAdmin = createAsyncThunk(
  'course/getCourseForAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/courses/courses-details-admin');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

interface ISwitchVisibilityCourse {
  id: string;
  isVisible: boolean | undefined;
}

export const switchVisibilityCourse = createAsyncThunk(
  'course/switchVisibilityCourse',
  async (
    { id, isVisible }: ISwitchVisibilityCourse,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const res = await axios.patch(`/courses/switch-visibility-course/${id}`, {
        isVisible,
      });
      dispatch(getDetailsOfAllCourses());

      return res.data;
    } catch (error: any) {
      console.log(error, 'err');

      return rejectWithValue(error.response.data);
    }
  },
);
