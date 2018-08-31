import { Project} from '../EntityClasses/Project';
import { Track} from '../EntityClasses/Track';
import {TaskStatus} from '../EntityClasses/TaskStatus';
import { TaskQuality} from '../EntityClasses/TaskQuality';
export class Data{
    TaskStatusList: TaskStatus[];
    TaskQualityList: TaskQuality[];
    Projects: Project[];   
}