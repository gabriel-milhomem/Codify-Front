/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Course from './Course';

export default function UserCourses() {
  const courses = [{
    title: 'Javascript do zero!',
    subtitle: 'Aprenda Javascript do zero ao avançado, com muita prática!',
    image: 'https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-2.jpg',
    imageDescription: 'Picasso',
  },
  {
    title: 'Javascript do zero!',
    subtitle: 'Aprenda Javascript do zero ao avançado, com muita prática!',
    image: 'https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-2.jpg',
    imageDescription: 'Picasso',
  },
  {
    title: 'Javascript do zero!',
    subtitle: 'Aprenda Javascript do zero ao avançado, com muita prática!',
    image: 'https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-2.jpg',
    imageDescription: 'Picasso',
  },
  {
    title: 'Javascript do zero!',
    subtitle: 'Aprenda Javascript do zero ao avançado, com muita prática!',
    image: 'https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-2.jpg',
    imageDescription: 'Picasso',
  }];
  console.log(courses);
  return (
    <Container>
      {(courses.length)
        ? (
          <CourseContainer>
            {courses.map((c) => (
              <Course
                title={c.title}
                subtitle={c.subtitle}
                image={c.image}
                imageDescription={c.imageDescription}
              />
            ))}
          </CourseContainer>
        )
        : (
          <CourseContainer>
            <Title>Nao tem curso</Title>
          </CourseContainer>
        )}
    </Container>
  );
}

const Container = styled.div`
    background-color: var(--color-white);
    border-radius: 5px;
    width: 100%;
    margin: 0 auto;
`;

const CourseContainer = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 100vh;
`;
const Title = styled.div`
    width: 80%;
    margin: 50px;
    font-size: 3rem;
    color: var(--color-black);
    font-weight: normal;
`;
