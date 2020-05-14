import './styles/reset.scss';
import './styles/base.scss';
import './styles/modal.scss';
import './styles/sidebar.scss';
import './styles/gallery.scss';

import { sendData, getData, createNav } from './js/app';
import { showNav, submitAnswer, menuActions} from './js/modal';
import { updateGallery } from './js/updateUI';

export {
    sendData,
    getData,
    createNav,
    showNav,
    submitAnswer,
    menuActions,
    updateGallery
}