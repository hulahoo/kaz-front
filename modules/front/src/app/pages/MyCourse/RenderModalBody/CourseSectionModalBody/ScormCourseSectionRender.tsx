import React from 'react';
import {CourseSection} from "../../../../../cuba/entities/base/tsadv$CourseSection";
import AbstractRenderModalBody from "../AbstractRenderModalBody";
import ScormIntegrationApi, {SUSPEND_DATA} from "../ScormIntegrationApi/ScormIntegrationApi";
import {CourseSectionAttempt} from "../../../../../cuba/entities/base/tsadv$CourseSectionAttempt";
import {restServices} from "../../../../../cuba/services";
import Notification from "../../../../util/Notification/Notification";
import {injectIntl, WrappedComponentProps} from "react-intl";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Spin} from "antd";
import {getCubaREST} from "@cuba-platform/react";
import {ScormSuspendData} from "../../../../../cuba/entities/base/tsadv_ScormSuspendData";

type ScormCourseSectionRenderProps = {
  courseSection: CourseSection
  enrollmentId: string
  onFinishSection: () => Promise<CourseSectionAttempt>
  setLoadingFinishCourseSection: (value: boolean) => void
  finishedCourseSection: (courseSectionId: string, success: boolean) => void
}

@observer
class ScormCourseSectionRender extends AbstractRenderModalBody<ScormCourseSectionRenderProps & WrappedComponentProps> {

  @observable
  loaded: boolean = false;

  scormIntegrationApi = new ScormIntegrationApi();

  getModalBody = () => {
    let scormUrl: string | undefined = this.props.courseSection.sectionObject!.content!.url!;
    if (!this.loaded) {
      scormUrl = undefined;
    }
    console.log(this.loaded);
    return <Spin spinning={!this.loaded}>
      <div className="course-section-modal-body">
        <iframe width="100%" height="100%" src={scormUrl}/>
      </div>
    </Spin>;
  };

  onFinishSection = () => {
    this.props.finishedCourseSection(this.props.courseSection.id, this.scormIntegrationApi.isSucceedFinishedScorm());
    this.props.selectNextSection!();
  };

  componentWillUnmount(): void {
    this.scormIntegrationApi.destroy();
  }

  componentDidMount() {
    super.componentDidMount();

    this.setIsDisabledFinishSectionBtn(this.props.courseSection.courseSectionAttempts!.filter(a => a.success).length === 0);

    this.initScormSuspendData();

    this.scormIntegrationApi.onScormTestFinish = (score, maxScore, minScore, success) => {
      this.props.setLoadingFinishCourseSection(true);

      restServices.courseService.createTestScormAttempt({
        enrollmentId: this.props.enrollmentId,
        courseSectionId: this.props.courseSection.id,
        score: score,
        maxScore: maxScore,
        minScore: minScore,
        success: success
      }).then(() => {
        if (success) {
          this.setIsDisabledFinishSectionBtn(!success);
        }
        this.props.setLoadingFinishCourseSection(false);
      }).catch(reason => {
        Notification.error({
          message: this.props.intl.formatMessage({id: "courseSection.createAttempt.error"})
        });
        this.props.setLoadingFinishCourseSection(false);
      });
    };

    this.scormIntegrationApi.onScormDefaultFinish = (inputData, success) => {
      this.props.setLoadingFinishCourseSection(true);

      restServices.courseService.createScormAttempt({
        enrollmentId: this.props.enrollmentId,
        courseSectionId: this.props.courseSection.id,
        inputData: inputData,
        success: success
      }).then(() => {
        if (success) {
          this.setIsDisabledFinishSectionBtn(!success);
        }
        this.props.setLoadingFinishCourseSection(false);
      }).catch(() => {
        Notification.error({
          message: this.props.intl.formatMessage({id: "courseSection.createAttempt.error"})
        });
        this.props.setLoadingFinishCourseSection(false);
      });
    };
  }

  initScormSuspendData = async (): Promise<void> => {
    let scormSuspendDataId: string;
    const searchedScormSuspendData = await getCubaREST()!.searchEntities<ScormSuspendData>(ScormSuspendData.NAME, {
      conditions: [{
        property: "enrollment.id",
        operator: "=",
        value: this.props.enrollmentId
      }, {
        property: "courseSection.id",
        operator: "=",
        value: this.props.courseSection.id
      }]
    }, {
      view: "_local"
    });
    if (searchedScormSuspendData.length === 0) {
      const newScormSuspendData = await getCubaREST()!.commitEntity<ScormSuspendData>(ScormSuspendData.NAME, {
        courseSection: {
          id: this.props.courseSection.id
        },
        enrollment: {
          id: this.props.enrollmentId
        }
      });
      scormSuspendDataId = newScormSuspendData.id;
    } else {
      scormSuspendDataId = searchedScormSuspendData[0].id;
      this.scormIntegrationApi.initApiData({
        'cmi.suspend_data': searchedScormSuspendData[0].suspendData
      });
    }
    this.loaded = true;
    this.scormIntegrationApi.onPropertySetValue = (property, value) => {
      if (property === SUSPEND_DATA) {
        getCubaREST()!.commitEntity<ScormSuspendData>(ScormSuspendData.NAME, {
          id: scormSuspendDataId,
          suspendData: value
        })
      }
    }
  }
}

export default injectIntl(ScormCourseSectionRender);