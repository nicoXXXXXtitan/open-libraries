import { connect } from 'react-redux';

import ResultOwnersAfterSearchByTitle from 'src/components/HomeUser/PageHome/ResultOwnersAfterSearchByTitle';
import { openValidateModal } from 'src/store/actions';

// eslint-disable-next-line arrow-body-style
const mapStateToProps = (state) => {
  return {
    showResultOwnersAfterSearchByTitle: state.book.showResultOwnersAfterSearchByTitle,
    bookResultSearch: state.book.bookSearch,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openModalValidate: () => {
    dispatch(openValidateModal());
  },
});

const ResultOwnersAfterSearchByTitleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultOwnersAfterSearchByTitle);

export default ResultOwnersAfterSearchByTitleContainer;
