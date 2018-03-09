import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import ProjectsScreen from "./ProjectsScreen";
class Projects extends Component {
  render() {
    return (
        <div className="col-lg-9 projects">
            <SearchBar/>
            <ProjectsScreen/>
        </div>
    );
  }
}

export default Projects;
