import _uniqueId from 'lodash/uniqueId';
import eventManager from './eventManager';
import { ACTION, TYPE, POSITION } from './constants';

const DEFAULT_OPTIONS = {
  type: TYPE.PRIMARY,
  position: POSITION.TOP_RIGHT,
  duration: 4500,
  autoClose: true,
};

const toast = (content, options) => {
  eventManager.emit(ACTION.SHOW, content, {
    ...DEFAULT_OPTIONS,
    ...options,
    id: _uniqueId('toast_'),
  });
};

toast.TYPE = TYPE;
toast.POSITION = POSITION;

export default toast;
