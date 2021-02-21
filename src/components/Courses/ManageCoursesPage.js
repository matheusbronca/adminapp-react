import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, saveCourse } from '../../store/actions/courseActions';
import { loadAuthors } from '../../store/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

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
  const [course, setCourse] = React.useState({ ...props.course });
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = React.useState({});
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert('Loading courses failed' + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert('Loading authors failed' + error);
      });
    }
  }, [props.course]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required';
    if (!authorId) errors.author = 'Author is required';
    if (!category) errors.category = 'Category is required';

    setErrors(errors);

    // Form is valid if the erros object still has no properties;
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if(!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course saved.');
        history.push('/courses');
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

// OwnProps: This lets us access the componet's props. We can use this to read the URL
// data injected on props by React Router.
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
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
