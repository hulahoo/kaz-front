import * as React from "react";
import {ReactComponent as AssigmentInterview}  from './assigment-interview.svg';
import {ReactComponent as Courses} from './courses.svg';
import {ReactComponent as Help} from './help.svg';
import {ReactComponent as JobOffers} from './job-offers.svg';
import {ReactComponent as Leave} from './leave.svg';
import {ReactComponent as MyAppVacation} from './my-app-vacation.svg';
import {ReactComponent as MyCourses} from './my-courses.svg';
import {ReactComponent as MyKpi} from './my-kpi.svg';
import {ReactComponent as MyProfile} from './my-profile.svg';
import {ReactComponent as MyRating} from './my-rating.svg';
import {ReactComponent as MyTeam} from './my-team.svg';
import {ReactComponent as TeamKpi} from './team-kpi.svg';
import {ReactComponent as TeamRating} from './team-rating.svg';
import {ReactComponent as Main} from './main.svg';
import {CustomIconComponentProps} from "antd/es/icon";

export type SvgProps = React.SVGProps<SVGSVGElement>;

const iconsMap: Map<string, any> = new Map<string, any>();
iconsMap.set("assigment-interview", AssigmentInterview);
iconsMap.set("courses", Courses);
iconsMap.set("main", Main);
iconsMap.set("help", Help);
iconsMap.set("job-offers", JobOffers);
iconsMap.set("leave", Leave);
iconsMap.set("my-app-vacation", MyAppVacation);
iconsMap.set("my-courses", MyCourses);
iconsMap.set("my-kpi", MyKpi);
iconsMap.set("my-profile", MyProfile);
iconsMap.set("my-rating", MyRating);
iconsMap.set("my-team", MyTeam);
iconsMap.set("team-kpi", TeamKpi);
iconsMap.set("team-rating", TeamRating);


export default iconsMap;