const MOVIES_COUNT_PER_STEP = 5;

const CLASS_OVERFLOW_HIDDEN = 'hide-overflow';

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const KeyCode = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const EXTRA_LIST = [
  'Top rated',
  'Most commented',
];

const sortExtraMovies = {
  'Top rated': (movies) => movies.slice().sort((a, b) => b.rating - a.rating).slice(0, 2),
  'Most commented': (movies) => movies.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, 2),
};

const UserActions = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  ALL: 'All movies',
  WATCH_LIST: 'Watch list',
  HISTORY: 'History',
  FAVORITE: 'Favorite',
  STATS: 'Stats',
};

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

const StatisticTime = {
  ALL_TIME: 'All time',
  TODAY: 'Today',
  WEEK: 'Week',
  MONTH: 'Month',
  YEAR: 'Year',
};

const ChartValues = {
  BAR_HEIGHT: 50,
  PLUGIN_TYPE: 'horizontalBar',
  BACKGROUND_COLOR: '#ffe800',
  HOVER_BACKGROUND: '#ffe800',
  ANCHOR: 'start',
  BAR_THICKNESS: 24,
  FONT_SIZE: 20,
  FONT_COLOR: '#ffffff',
  FONT_ANCHOR: 'start',
  FONT_ALIGN: 'start',
  FONT_OFFSET: 40,
  SCALES_FONT_COLOR: '#ffffff',
  SCALES_PADDING: 100,
  SCALES_FONT_SIZE: 20,
};

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export {
  SortType,
  KeyCode,
  UpdateType,
  UserActions,
  FilterType,
  StatisticTime,
  ChartValues,
  EXTRA_LIST,
  sortExtraMovies,
  MOVIES_COUNT_PER_STEP,
  Method,
  State,
  CLASS_OVERFLOW_HIDDEN
};
