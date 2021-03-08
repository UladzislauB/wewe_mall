import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectSignInError = createSelector(
  [selectUser],
  (user) => user.signInError
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);