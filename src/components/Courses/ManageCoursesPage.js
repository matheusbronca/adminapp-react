import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../store/actions/courseActions';
import { loadAuthors } from '../../store/actions/authorActions';

const ManageCoursesPage = ({ courses, authors, loadAuthors, loadCourses }) => {
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

  return (
    <>
      <h2>Manage Courses</h2>
    </>
  );
};

ManageCoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

// This lets us declare what actios to pass to our component on props.
// If we declare mapDispatchToProps as an object instead, each property will automatically
// be bound to dispatch. Handy!
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
};

// This func determines what state is passed to our component via props
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
