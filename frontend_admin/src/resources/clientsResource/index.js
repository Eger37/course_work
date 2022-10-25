import PeopleIcon from '@material-ui/icons/People'

import {ClientList} from './List/List';
import {ClientsShow} from "./Show/Show";
import {ClientEdit} from "./Edit/Edit";


export const clientsResource = {
    list: ClientList,
    edit: ClientEdit,
    show: ClientsShow,
    icon: PeopleIcon,
}
