import {EnrollmentStatus} from "../../../cuba/enums/enums";
import {ReactComponent as SvgFinishedCourse} from "../../../resources/icons/check-circle-regular.svg";
import {ReactComponent as ClockSvg} from "../../../resources/icons/clock-regular.svg";

export default class CardIconFactory {
  static getIcon = (status: EnrollmentStatus) => {
    console.log(status);
    switch (status) {
      case EnrollmentStatus.COMPLETED: {
        return SvgFinishedCourse
      }
      case EnrollmentStatus.APPROVED: {
        return ClockSvg
      }
      default: {
        return null;
      }
    }
  }
}