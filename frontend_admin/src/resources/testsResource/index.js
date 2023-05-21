import AssignmentIcon from '@material-ui/icons/Assignment'

import {TestsList} from './List/List';
import {TestEdit} from "./Edit/Edit";
import {TestShow} from "./Show/Show";
import {TestCreate} from "./Create/Create";


export const testResource = {
    list: TestsList,
    edit: TestEdit,
    create: TestCreate,
    show: TestShow,
    icon: AssignmentIcon,
}
