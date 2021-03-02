/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import CourseContext from '../contexts/CourseContext';

import {
  StudyAreaHeader, Activities,
} from '../components';

export default function StudyArea() {
  const { id, chapterId, topicId } = useParams();
  const {
    activities,
    setCourseData,
    setProgram,
    program,
    setChapter,
    setTopic,
    setActivityIndex,
  } = useContext(CourseContext);

  function findTopicsActivities(courseProgram) {
    const c = courseProgram.find((cap) => cap.id == chapterId);
    setChapter(c);
    const t = c.topics.find((top) => top.id == topicId);
    setTopic(t);
  }
  useEffect(() => {
    axios.get(`/courses/${id}`)
      .then((response) => {
        setCourseData(response.data);
        setProgram(response.data.program);
        findTopicsActivities(response.data.program);
        setActivityIndex(0);
      })
      .catch((error) => {
        alert('Erro ao buscar o curso selecionado');
        console.log(error);
      });
  }, [topicId]);

  return (
    <MainPage>
      <StudyAreaHeader />
      <Activities activities={activities || []} />
    </MainPage>
  );
}

const MainPage = styled.main`
  width: 100%;
  min-height: calc(100vh + 100px);
  background-color: #2e2e2e;
`;
