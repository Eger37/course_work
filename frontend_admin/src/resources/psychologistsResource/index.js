import PeopleIcon from '@material-ui/icons/People'

import {PsychologistCreate} from './Create/Create';
import {PsychologistEdit} from './Edit/Edit';
import {PsychologistList} from './List/List';


export const psychologistsResource = {
    list: PsychologistList,
    edit: PsychologistEdit,
    create: PsychologistCreate,
    icon: PeopleIcon,
}
