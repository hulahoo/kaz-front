import React, {Component} from 'react';
import Section from "../../hoc/Section";
import Page from "../../hoc/PageContentHoc";



class SectionListContainer extends Component {
  render() {
    return (
      <div className="section-list-container">
        <Section>1</Section>
        <Section>2</Section>
        <Section>3</Section>
        <Section>4</Section>
        <Section>5</Section>
      </div>
    );
  }
}

export default SectionListContainer;