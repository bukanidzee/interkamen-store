import * as currentOrderReducers from '../redux_config/current_order';
import * as errorsReducers from '../redux_config/errors';
import * as loadingReducers from '../redux_config/loading';
import * as userReducers from '../redux_config/user';

const actionsCreators = {}

for (let reducers of [currentOrderReducers,
                      errorsReducers,
                      loadingReducers,
                      userReducers]) {
  for (let reducer in reducers) {
    if (reducer !== 'default') {
      actionsCreators[reducer] = reducers[reducer]
    }
  }
}

export default actionsCreators
