import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import Courses from './Courses';
import ManageCoursesPage from './Courses/ManageCoursesPage';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/course/:slug" component={ManageCoursesPage} />
        <Route exact path="/course" component={ManageCoursesPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
