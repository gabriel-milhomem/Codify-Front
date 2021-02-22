import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../services/api';
import { Header, Summary, StudyProgram } from '../components';
import CourseContext from '../contexts/CourseContext';

export default function Course() {
  const {
    courseData,
    setCourseData,
    setProgram,
    program,
  } = useContext(CourseContext);
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/courses/${id}`)
      .then((response) => {
        setCourseData(response.data);
        setProgram(response.data.program);
      })
      .catch((error) => {
        alert('Erro ao buscar o curso selecionado');
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <Container>
        {courseData.length !== 0
            && (
              <>
                <Details>
                  <h1>{courseData.course.title}</h1>
                  <p>{courseData.course.description}</p>
                  <Summary courseData={courseData} />
                </Details>
                <StudyProgram program={courseData.program} />
              </>
            )}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F9F9F9;
  margin-top: 100px;
`;

const Details = styled.div`
  height: 200px;
  background: linear-gradient(180deg, #EFDA4F 0%, rgba(239, 218, 79, 0.56) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35px;
  position: relative;
  h1 {
    color: #000;
    font-size: 35px;
    font-weight: 700;
  }
  p {
    color: #383838;
    font-size: 20px;
    font-weight: 400;
    margin-top: 10px;
  }
`;
