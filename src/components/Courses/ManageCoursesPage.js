import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, saveCourse } from '../../store/actions/courseActions';
import { loadAuthors } from '../../store/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

const ManageCoursesPage = ({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  // eslint-disable-next-line no-unused-vars
  ...props
}) => {
  const [course, setCourse] = React.useState({ ...course });
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed' + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed' + error);
      });
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }
  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push('/courses');
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

ManageCoursesPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  // Any component loaded via <Router> gets history passed in our props
  // from React Router.;
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

// This lets us declare what actions to pass to our component on props.
// If we declare mapDispatchToProps as an object instead, each property will automatically
// be bound to dispatch. Handy!
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

// This func determines what state is passed to our component via props
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
